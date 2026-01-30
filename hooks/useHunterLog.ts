import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MonsterKind, RankType, Result } from "../assets/data/types";
import { UserContext } from "../context/UserContext";
import { database } from "../service/firebase";
import {
  addLocalHunterLogEntry,
  deleteLocalHunterLogEntry,
  updateLocalHunterLogEntry,
} from "../util/redux/LocalDataSlice";
import { RootState } from "../util/redux/store";

export type HunterLogEntry = {
  id: string;
  monster: MonsterKind;
  rank: RankType;
  carts: number;
  timestamp: number;
  result?: Result;
};

const converter = {
  toFirestore: (data: Omit<HunterLogEntry, `id`>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return {
      id: snap.id,
      ...snap.data(),
    } as HunterLogEntry;
  },
};

const getCollection = (userId: string, entry?: string) => {
  if (entry) return collection(database, `user/${userId}/log/${entry}`).withConverter(converter);
  else return collection(database, `user/${userId}/log`).withConverter(converter);
};
const getDocument = (userId: string, entry: string) => {
  return doc(database, `user/${userId}/log/${entry}`).withConverter(converter);
};

export const useHunterLog = () => {
  const { user, isGuest } = useContext(UserContext);
  const dispatch = useDispatch();
  const localLogs = useSelector((state: RootState) => state.localData.logs);

  const [logs, setLogs] = useState<HunterLogEntry[]>([]);
  const [order, setOrder] = useState<`asc` | `desc`>(`asc`);

  const addLogEntry = useCallback(
    (item: Omit<HunterLogEntry, `id` | `timestamp`>) => {
      if (isGuest) {
        dispatch(addLocalHunterLogEntry(item));
      } else {
        if (!user) return;
        addDoc(getCollection(user.uid), {
          ...item,
          timestamp: Date.now(),
        });
      }
    },
    [user, isGuest, dispatch]
  );

  const updateLogEntry = useCallback(
    (entryId: string, entry: HunterLogEntry) => {
      if (isGuest) {
        dispatch(updateLocalHunterLogEntry({ id: entryId, entry }));
      } else {
        if (!user) return;
        const entryRef = getDocument(user.uid, entryId);
        updateDoc(entryRef, entry);
      }
    },
    [user, isGuest, dispatch]
  );

  const deleteLogEntry = useCallback(
    async (entryId: string) => {
      if (isGuest) {
        dispatch(deleteLocalHunterLogEntry(entryId));
      } else {
        if (!user) return;
        await deleteDoc(getDocument(user.uid, entryId));
      }
    },
    [user, isGuest, dispatch]
  );

  const sortedLocalLogs = useMemo(() => {
    return [...localLogs].sort((a, b) => {
      return order === "asc" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
    });
  }, [localLogs, order]);

  useLayoutEffect(() => {
    if (isGuest) {
      setLogs(sortedLocalLogs);
      return;
    }

    if (!user) {
      setLogs([]);
      return;
    }
    const logRef = collection(database, `user/${user.uid}/log`).withConverter(converter);
    const queryInventory = query(logRef, orderBy(`timestamp`, order));
    const unsubscribe = onSnapshot(queryInventory, (snapshot) => {
      const data = snapshot.docs.map((doc) => converter.fromFirestore(doc));
      setLogs(data);
    });
    return unsubscribe;
  }, [user, order, isGuest, sortedLocalLogs]);

  return {
    logs,
    setOrder,
    addLogEntry,
    updateLogEntry,
    deleteLogEntry,
  };
};

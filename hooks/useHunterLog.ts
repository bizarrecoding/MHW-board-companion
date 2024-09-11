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
import { useCallback, useContext, useLayoutEffect, useState } from "react";

import { MonsterKind, RankType, Result } from "../assets/data/types";
import { UserContext } from "../context/UserContext";
import { database } from "../service/firebase";

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
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState<HunterLogEntry[]>([]);
  const [order, setOrder] = useState<`asc` | `desc`>(`asc`);

  const addLogEntry = useCallback(
    (item: Omit<HunterLogEntry, `id` | `timestamp`>) => {
      if (!user) return;
      addDoc(getCollection(user.uid), {
        ...item,
        timestamp: Date.now(),
      });
    },
    [user]
  );

  // not used
  const updateLogEntry = useCallback(
    (entryId: string, entry: HunterLogEntry) => {
      if (!user) return;
      const entryRef = getDocument(user.uid, entryId);
      updateDoc(entryRef, entry);
    },
    [user]
  );

  const deleteLogEntry = useCallback(
    async (entryId: string) => {
      if (!user) return;
      await deleteDoc(getDocument(user.uid, entryId));
    },
    [user]
  );

  useLayoutEffect(() => {
    if (!user) return;
    const logRef = collection(database, `user/${user.uid}/log`).withConverter(converter);
    const queryInventory = query(logRef, orderBy(`timestamp`, order));
    const unsubscribe = onSnapshot(queryInventory, (snapshot) => {
      const data = snapshot.docs.map((doc) => converter.fromFirestore(doc));
      setLogs(data);
    });
    return unsubscribe;
  }, [user, order]);

  return {
    logs,
    setOrder,
    addLogEntry,
    updateLogEntry,
    deleteLogEntry,
  };
};

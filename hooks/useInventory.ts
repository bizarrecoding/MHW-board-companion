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
import { useDispatch, useSelector } from "react-redux";

import { InventoryKind } from "../assets/data/types";
import { UserContext } from "../context/UserContext";
import { database } from "../service/firebase";
import {
  addLocalInventoryEntry,
  deleteLocalInventoryEntry,
  updateLocalInventoryEntry,
} from "../util/redux/LocalDataSlice";
import { RootState } from "../util/redux/store";

export type InventoryEntry = {
  type: InventoryKind;
  name: string;
  amount: number;
  id: string;
  timestamp?: string;
};

const converter = {
  toFirestore: (data: Omit<InventoryEntry, `id`>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return {
      id: snap.id,
      ...snap.data(),
    } as InventoryEntry;
  },
};

const getCollection = (userId: string) => {
  return collection(database, `user/${userId}/inventory`).withConverter(converter);
};

const getDocument = (userId: string, entry: string) => {
  return doc(database, `user/${userId}/inventory/${entry}`).withConverter(converter);
};

export const useInventory = () => {
  const { user, isGuest } = useContext(UserContext);
  const dispatch = useDispatch();
  const localInventory = useSelector((state: RootState) => state.localData.inventory);

  const [inventory, setInventory] = useState<InventoryEntry[]>([]);

  const updateEntry = useCallback(
    async (entryId: string, amount: number) => {
      if (isGuest) {
        dispatch(updateLocalInventoryEntry({ id: entryId, amount }));
      } else {
        if (!user) return;
        const entryRef = getDocument(user.uid, entryId);
        await updateDoc(entryRef, { amount });
      }
    },
    [user, isGuest, dispatch]
  );

  const addEntry = useCallback(
    (item: Omit<InventoryEntry, `id`>) => {
      if (isGuest) {
        dispatch(addLocalInventoryEntry(item));
      } else {
        if (!user) return;
        const existingItem = inventory.find((i) => i.name === item.name);
        if (!existingItem) {
          addDoc(getCollection(user.uid), {
            name: item.name,
            type: item.type,
            amount: 1,
            timestamp: new Date().toISOString(),
          });
        } else {
          updateEntry(existingItem.id, existingItem.amount + 1);
        }
      }
    },
    [user, isGuest, inventory, updateEntry, dispatch]
  );

  const deleteEntry = useCallback(
    async (entryId: string) => {
      if (isGuest) {
        dispatch(deleteLocalInventoryEntry(entryId));
      } else {
        if (!user) return;
        await deleteDoc(getDocument(user.uid, entryId));
      }
    },
    [user, isGuest, dispatch]
  );

  useLayoutEffect(() => {
    if (isGuest) {
      setInventory(localInventory);
      return;
    }

    if (!user) {
      setInventory([]);
      return;
    }
    const inventoryRef = collection(database, `user/${user.uid}/inventory`).withConverter(
      converter
    );
    const queryInventory = query(inventoryRef, orderBy(`timestamp`));
    const unsubscribe = onSnapshot(queryInventory, (snapshot) => {
      const data = snapshot.docs.map((doc) => converter.fromFirestore(doc));
      setInventory(data);
    });
    return unsubscribe;
  }, [user, isGuest, localInventory]);

  return { inventory, addEntry, updateEntry, deleteEntry };
};

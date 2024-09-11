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

import { InventoryKind } from "../assets/data/types";
import { UserContext } from "../context/UserContext";
import { database } from "../service/firebase";

export type InventoryEntry = {
  type: InventoryKind;
  name: string;
  amount: number;
  id: string;
  timestamp?: string;
};

const converter = {
  toFirestore: (data: InventoryEntry) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as InventoryEntry,
};

const getCollection = (userId: string, entry?: string) => {
  if (entry)
    return collection(database, `user/${userId}/inventory/${entry}`).withConverter(converter);
  else return collection(database, `user/${userId}/inventory`).withConverter(converter);
};
const getDocument = (userId: string, entry: string) => {
  return doc(database, `user/${userId}/inventory/${entry}`).withConverter(converter);
};

export const useInventory = () => {
  const { user } = useContext(UserContext);
  const [inventory, setInventory] = useState<InventoryEntry[]>([]);

  const updateEntry = useCallback(
    async (entryId: string, amount: number) => {
      if (!user) return;
      const entryRef = getDocument(user.uid, entryId);
      //only update the amount
      await updateDoc(entryRef, { amount });
    },
    [user]
  );

  const addEntry = useCallback(
    (item: Omit<InventoryEntry, `id`>) => {
      if (!user) return;
      const existingItem = inventory.find((i) => i.name === item.name);
      // set also lets us set a key, so we can use the item name as the key
      // addDoc would not let us set the key
      if (!existingItem)
        addDoc(getCollection(user.uid, item.name), {
          id: item.name,
          name: item.name,
          type: item.type,
          amount: 1,
          timestamp: new Date().toISOString(),
        });
      else {
        updateEntry(existingItem.id, existingItem.amount + 1);
      }
    },
    [user, inventory, updateEntry]
  );

  const deleteEntry = useCallback(
    async (entryId: string) => {
      if (!user) return;
      await deleteDoc(getDocument(user.uid, entryId));
    },
    [user]
  );

  useLayoutEffect(() => {
    if (!user) return;
    const inventoryRef = collection(database, `user/${user.uid}/inventory`).withConverter(
      converter
    );
    const queryInventory = query(inventoryRef, orderBy(`timestamp`));
    const unsubscribe = onSnapshot(queryInventory, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: doc.data().type,
        name: doc.data().name,
        amount: doc.data().amount,
        timestamp: doc.data().timestamp,
      }));
      setInventory(data);
    });
    return unsubscribe;
  }, [user]);

  return { inventory, addEntry, updateEntry, deleteEntry };
};

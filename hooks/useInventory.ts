import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { useCallback, useContext, useLayoutEffect, useState } from "react";

import { InventoryKind } from "../assets/data/types";
import { UserContext } from "../context/UserContext";
import { database } from "../service/firebase";

export type InventoryEntry = {
  type: InventoryKind;
  name: string;
  amount: number;
  id: string;
};

export const useInventory = () => {
  const { user } = useContext(UserContext);
  const [inventory, setInventory] = useState<InventoryEntry[]>([]);

  const addEntry = useCallback(
    (item: Omit<InventoryEntry, `id`>) => {
      if (!user) return;
      const existingItem = inventory.find((i) => i.name === item.name);
      const entryRef = doc(database, `user/${user.uid}/inventory/${item.name}`);
      setDoc(
        entryRef,
        {
          name: item.name,
          type: item.type,
          amount: (existingItem?.amount ?? 0) + 1,
          timestamp: new Date().toISOString(),
        },
        { merge: true }
      );
    },
    [user, inventory]
  );

  const updateEntry = useCallback(
    async (entryId: string, amount: number) => {
      if (!user) return;
      const entryRef = doc(database, `user/${user.uid}/inventory/${entryId}`);
      await setDoc(entryRef, { amount }, { merge: true });
    },
    [user]
  );

  const deleteEntry = useCallback(
    async (entryId: string) => {
      if (!user) return;
      await deleteDoc(doc(database, `user/${user.uid}/inventory/${entryId}`));
    },
    [user]
  );

  useLayoutEffect(() => {
    if (!user) return;
    const inventoryRef = collection(database, `user/${user.uid}/inventory`);
    const queryInventory = query(inventoryRef, orderBy(`timestamp`));
    const unsubscribe = onSnapshot(queryInventory, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: doc.data().type,
        name: doc.data().name,
        amount: doc.data().amount,
      })) as InventoryEntry[];
      setInventory(data);
    });
    return unsubscribe;
  }, [user]);

  return { inventory, addEntry, updateEntry, deleteEntry };
};

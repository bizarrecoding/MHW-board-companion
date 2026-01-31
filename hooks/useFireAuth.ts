import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCallback, useContext } from "react";

import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

import { UserContext } from "../context/UserContext";
import { auth, database } from "../service/firebase";
import { RootState } from "../util/redux/store";

export const useFireAuth = () => {
  const router = useRouter();
  const { setIsGuest } = useContext(UserContext);
  const localData = useSelector((state: RootState) => state.localData);

  const syncLocalDataToFirestore = useCallback(async (userId: string) => {
    try {
      // Sync Inventory
      const inventoryRef = collection(database, `user/${userId}/inventory`);
      for (const item of localData.inventory) {
        const { id, ...entry } = item
        await addDoc(inventoryRef, entry)
      }
      // Sync Logs
      const logsRef = collection(database, `user/${userId}/log`);
      for (const log of localData.logs) {
        const { id, ...entry } = log
        await addDoc(logsRef, entry)
      }
    } catch (error) {
      console.error(`[SyncError]`, (error as Error).message);
    }
  }, [localData]);

  const registerUser = useCallback(async (user: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user, password);
      await syncLocalDataToFirestore(userCredential.user.uid);
      setIsGuest(false);
      router.replace(`/(drawer)/(tabs)/Story`);
    } catch (error) {
      console.error(`[RegisterError]`, (error as Error).message);
      throw error;
    }
  }, [syncLocalDataToFirestore, setIsGuest]);

  const loginUser = useCallback(async (user: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, user, password);
      setIsGuest(false);
    } catch (error) {
      console.log(`[LoginError]`, (error as Error).message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsGuest(false);
      await signOut(auth);
    } catch (error) {
      console.log(`[LogoutError]`, (error as Error).message);
      throw error;
    }
  }, [setIsGuest]);

  return {
    registerUser,
    loginUser,
    logout,
  };
};

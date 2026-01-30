import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCallback, useContext } from "react";

import { UserContext } from "../context/UserContext";
import { auth } from "../service/firebase";

export const useFireAuth = () => {
  const router = useRouter();
  const registerUser = useCallback(async (user: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, user, password);
      router.replace(`/(drawer)/(tabs)/Story`);
    } catch (error) {
      console.error(`[RegisterError]`, (error as Error).message);
      throw error;
    }
  }, []);

  const loginUser = useCallback(async (user: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, user, password);
    } catch (error) {
      console.log(`[LoginError]`, (error as Error).message);
      throw error;
    }
  }, []);

  const { setIsGuest } = useContext(UserContext);

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

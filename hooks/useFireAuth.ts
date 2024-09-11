import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCallback } from "react";

import { auth } from "../service/firebase";

export const useFireAuth = () => {
  const registerUser = useCallback(async (user: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, user, password);
      router.replace(`/inventory`);
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

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(`[LogoutError]`, (error as Error).message);
      throw error;
    }
  }, []);

  return {
    registerUser,
    loginUser,
    logout,
  };
};

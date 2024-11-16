import { router } from "expo-router";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { auth } from "../service/firebase";

export type TUserContext = {
  user: User | null;
};

export const UserContext = React.createContext<TUserContext>({
  user: null,
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fast login
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(`🚀 ~ onAuthStateChanged:`, user?.uid);
      if (user) {
        setUser(user);
        router.replace(`/(drawer)/inventory`);
      } else {
        setUser(null);
        router.replace(`/`);
      }
    });
    return unsubscribe;
  }, [setUser]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

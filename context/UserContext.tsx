import { User } from "firebase/auth";
import React, { useState } from "react";

export type TUserContext = {
  user: User | null;
  setUser: (credentials: User | null) => void;
};

export const UserContext = React.createContext<TUserContext>({
  user: null,
  setUser: (_credentials: User | null) => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

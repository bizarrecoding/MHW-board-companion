import React, { useState } from "react";

export type TUserContext = {
  user: { uid: string; email?: string | null } | null;
  setUser: (user: { uid: string; email?: string | null } | null) => void;
  isGuest: boolean;
  setIsGuest: (isGuest: boolean) => void;
};

export const UserContext = React.createContext<TUserContext>({
  user: null,
  setUser: () => { },
  isGuest: false,
  setIsGuest: () => { },
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ uid: string; email?: string | null } | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser, isGuest, setIsGuest }}>
      {children}
    </UserContext.Provider>
  );
};

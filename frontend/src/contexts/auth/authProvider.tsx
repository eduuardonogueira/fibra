"use client";

import { ReactNode, useEffect, useState } from "react";
import { AUTH_CONTEXT_INITIAL_STATE, AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(() => {
    const storedAuth =
      typeof window !== "undefined" ? localStorage.getItem("auth") : "";
    return storedAuth ? JSON.parse(storedAuth) : AUTH_CONTEXT_INITIAL_STATE;
  });

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        setAuth: setAuth,
        isLogged: auth.isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

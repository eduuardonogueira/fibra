"use client";

import { createContext } from "react";

export type AuthValues = {
  isLogged: boolean;
};

type AuthContextState = AuthValues & {
  setAuth: ({ isLogged }: { isLogged: boolean }) => void;
};

export const AUTH_CONTEXT_INITIAL_STATE: AuthContextState = {
  setAuth: () => {},
  isLogged: false,
};

export const AuthContext = createContext(AUTH_CONTEXT_INITIAL_STATE);

"use client";

import { LOGIN_ROUTE } from "@/constants/routes";
import { AuthContext } from "@/contexts/auth/authContext";
import { redirect } from "next/navigation";
import { useContext} from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLogged } = useContext(AuthContext)
  
  if(!isLogged) return redirect(LOGIN_ROUTE)

  return children;
}

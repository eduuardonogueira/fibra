"use server";

import { cookies } from "next/headers";
import { LOGIN_ROUTE } from "@/constants/routes";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export async function RequireAuth({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("authToken")?.value;

  if (!sessionCookie) redirect(LOGIN_ROUTE);

  return children;
}

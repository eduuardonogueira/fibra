"use server";

import { LOGIN_ROUTE } from "@/constants/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect(LOGIN_ROUTE);
}

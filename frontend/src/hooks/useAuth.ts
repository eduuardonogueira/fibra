"use server";

import { IUser } from "@/types/users";
import { cookies } from "next/headers";
import { authFetch } from "./useApi";

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });

    if (!response || response.status === 401) return false;

    const data = await response.json();
    const { token } = data;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("authToken", token);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function validate(): Promise<boolean> {
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/auth/validate`,
      {
        method: "GET",
      }
    );

    if (!response || response.status === 401) return false;

    return response.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getProfile(): Promise<IUser | null> {
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/auth/profile`,
      {
        method: "GET",
      }
    );

    if (!response || response.status === 401) return null;

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

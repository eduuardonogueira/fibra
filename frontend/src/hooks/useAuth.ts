"use server";

import { IUser } from "@/types/users";
import { cookies } from "next/headers";

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
      cookieStore.set("session", token);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function validate(): Promise<boolean | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/validate`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response || response.status === 401) return false;

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfile(): Promise<IUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token.value}` },
    });

    if (!response || response.status === 401) return null;

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

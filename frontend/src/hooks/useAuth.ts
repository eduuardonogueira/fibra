import { IUser } from "@/types/users";
import { cookies } from "next/headers";

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) return false;

    const data = await response.json();

    const { token } = data;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("authToken", JSON.stringify(token));
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function validate(): Promise<IUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/validate`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

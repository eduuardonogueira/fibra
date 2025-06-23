"use server";

import { IUser, UserRoles } from "@/types/users";
import { cookies } from "next/headers";

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    // const response = await fetch("http://localhost:3000/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // });

    // if (!response.ok) return false;

    // const data = await response.json();
    // const { token } = data;

    // if (token) {
    //   const cookieStore = await cookies();
    //   cookieStore.set("session", token);
    //   return true;
    // }

    if (username === "teste@teste.com" && password === "teste1234") {
      const token = "e19723981y2301b2083gb1297ev12uen190-c2be1";
      if (token) {
        const cookieStore = await cookies();
        cookieStore.set("session", token);
        return true;
      }
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
    // const response = await fetch(`${process.env.BACKEND_URL}/validate`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // return response.json();

    const user = {
      id: "13640cf2-3c3f-42ff-a57c-93558f615bde",
      fullName: "teste",
      role: "ADMIN" as UserRoles,
      email: "teste@teste.com",
    };

    return user;
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
    // const response = await fetch(
    //   "https://de-olho-no-foco.onrender.com/auth/profile",
    //   {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token.value}` },
    //   }
    // );

    // return response.json();

    const user = {
      id: "13640cf2-3c3f-42ff-a57c-93558f615bde",
      fullName: "teste",
      role: "ADMIN" as UserRoles,
      email: "teste@teste.com",
    };

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

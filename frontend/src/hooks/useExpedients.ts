"use server";

import { ICreateExpedient } from "@/types/expedient";
import { cookies } from "next/headers";

export async function createExpedient(
  expedient: ICreateExpedient
): Promise<ICreateExpedient | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/expedients`, {
      method: "POST",
      body: JSON.stringify(expedient),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      // headers: {  },
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateExpedient(
  id: string,
  expedient: ICreateExpedient
): Promise<ICreateExpedient | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/expedients/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(expedient),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        // headers: {  },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteExpedient(
  id: string
): Promise<{ status: number } | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/expedients/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        // headers: {  },
      }
    );

    return {
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

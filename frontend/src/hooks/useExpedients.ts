"use server";

import { ICreateExpedient } from "@/types/expedient";
import { authFetch } from "./useAuthFetch";

export async function createExpedient(
  expedient: ICreateExpedient
): Promise<ICreateExpedient | null> {
  try {
    const response = await authFetch(`${process.env.BACKEND_URL}/expedients`, {
      method: "POST",
      body: JSON.stringify(expedient),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.status);

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
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/expedients/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(expedient),
        headers: {
          "Content-Type": "application/json",
        },
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
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/expedients/${id}`,
      {
        method: "DELETE",
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

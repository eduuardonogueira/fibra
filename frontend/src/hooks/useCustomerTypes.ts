"use server";

import { ICustomerType } from "@/types/customerTypes";

export async function getCustomerTypes(): Promise<ICustomerType[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customer-types`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

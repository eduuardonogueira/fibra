"use server";

import { IPaginationProps, IPaginationResponse } from "@/types/api";
import {
  ICreateProfessional,
  IProfessionalCalendar,
  IUser,
  IUserWithServices,
  IUserWithServicesAndExpedients,
} from "@/types/users";
import { getUrlApiPagination } from "./useApi";
import { authFetch } from "./useAuthFetch";

export async function getProfessionalById(id: string): Promise<IUser | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfessionals(): Promise<IUser[] | null> {
  try {
    const response = await authFetch(`${process.env.BACKEND_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfessionalsAndServices(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<IUserWithServices[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/users/with-services",
    paginationProps
  );

  try {
    const response = await authFetch(url, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfessionalsWithServicesAndExpedients(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<IUserWithServicesAndExpedients[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/users/professionals-services-expedients",
    paginationProps
  );
  try {
    const response = await authFetch(url, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createProfessional(
  customer: ICreateProfessional
): Promise<IUser | null> {
  try {
    const response = await authFetch(`${process.env.BACKEND_URL}/users`, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteProfessional(
  id: string
): Promise<{ status: number } | null> {
  try {
    const response = await authFetch(`${process.env.BACKEND_URL}/users/${id}`, {
      method: "DELETE",
    });

    return {
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfessionalCalendar({
  userId,
  serviceId,
}: {
  userId: string;
  serviceId: string;
}): Promise<IProfessionalCalendar | null> {
  const searchParams = new URLSearchParams({
    userId,
    serviceId,
  });

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/user-services/schedule?${searchParams}`,
      {
        method: "GET",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

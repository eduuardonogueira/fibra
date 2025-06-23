"use server";

import { IPaginationProps, IPaginationResponse } from "@/types/api";
import {
  IAppointment,
  ICreateAppointment,
  IFormatedAppointment,
  UpdateAppointment,
} from "@/types/appointments";
import { getUrlApiPagination } from "./useApi";
import { cookies } from "next/headers";

export async function getAppointments(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<IFormatedAppointment[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/appointments",
    paginationProps
  );

  const cookieStore = await cookies();
  const authToken = cookieStore.get("session");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAppointmentById(
  id: string
): Promise<IFormatedAppointment | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("session");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/appointments/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createAppointment(
  Appointment: ICreateAppointment
): Promise<IAppointment | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("session");
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/appointments`, {
      method: "POST",
      body: JSON.stringify(Appointment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(response.status);
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAppointment(
  id: string
): Promise<{ status: number } | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("session");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/appointments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
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

export async function updateAppointment(
  id: string,
  Appointment: UpdateAppointment
): Promise<IFormatedAppointment | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("session");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/appointments/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(Appointment),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log(response.status);
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

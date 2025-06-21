"use server";

import { IPaginationProps, IPaginationResponse } from "@/types/api";
import {
  IAppointment,
  ICreateAppointment,
  IFormatedAppointment,
  UpdateAppointment,
} from "@/types/appointments";
import { getUrlApiPagination } from "./useApi";

export async function getAppointments(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<IFormatedAppointment[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/appointments",
    paginationProps
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
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
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/appointments/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // headers: { Authorization: `Bearer ${token}` },
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
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/appointments`, {
      method: "POST",
      body: JSON.stringify(Appointment),
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
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
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/appointments/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // headers: { Authorization: `Bearer ${token}` },
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
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/appointments/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(Appointment),
        headers: { "Content-Type": "application/json" },
        // headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response.status);
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

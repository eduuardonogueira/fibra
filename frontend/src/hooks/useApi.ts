"use server";

import { IService, IServiceForm, IServiceList } from "@/types/services";
import {
  ICreateCustomer,
  ICustomer,
  ICustomerAndAppointments,
} from "@/types/customers";
import { ICustomerType } from "@/types/customerTypes";
import {
  ICreateProfessional,
  IProfessionalCalendar,
  IUser,
  IUserWithServices,
} from "@/types/users";
import { cookies } from "next/headers";
import { ICreateAppointment, IFormatedAppointment } from "@/types/appointments";
import { IPaginationProps, IPaginationResponse } from "@/types/api";
import { getUrlApiPagination } from "./useApiPagination";

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

export async function getCustomers(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<ICustomer[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/customers",
    paginationProps
  );
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCustomerAndAppointmentsById(
  id: string
): Promise<ICustomerAndAppointments | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customers/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    const foundCustomer: ICustomerAndAppointments = await response.json();

    if (foundCustomer) {
      return {
        ...foundCustomer,
        id: foundCustomer.id.toString(),
        photoUrl: "",
        appointmentsCount: 0,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCustomersAndAppointments(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<ICustomerAndAppointments[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/customers/customers-with-appointments",
    paginationProps
  );
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createCustomer(
  customer: ICreateCustomer
): Promise<ICustomer | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customers`, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteCustomer(
  id: string
): Promise<{ status: number } | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customers/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return {
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCustomerTypes(): Promise<ICustomerType[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customer-types`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    const formatedData = data.map((type: ICustomerType) => ({
      ...type,
      id: type.id.toString(),
    }));

    return formatedData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfessionals(): Promise<IUser[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users2`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProfessionalById(id: string): Promise<IUser | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users2/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
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
    const response = await fetch(`${process.env.BACKEND_URL}/users2/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return {
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createProfessional(
  customer: ICreateProfessional
): Promise<IUser | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users2`, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
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
    "/users2/with-services",
    paginationProps
  );
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getServices(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<IServiceList[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/services",
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

export async function createService(
  service: IServiceForm
): Promise<IService | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/services/with-users`,
      {
        method: "POST",
        body: JSON.stringify(service),
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

export async function deleteService(
  id: string
): Promise<{ status: number } | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/services/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return {
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAppointments(
  paginationProps: IPaginationProps
): Promise<IPaginationResponse<IFormatedAppointment[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/appointments2",
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

export async function createAppointment(
  Appointment: ICreateAppointment
): Promise<Response | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/appointments2`, {
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

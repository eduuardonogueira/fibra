"use server";

import {
  ICreateCustomer,
  ICustomer,
  ICustomerAndAppointments,
} from "@/types/customers";
import { getUrlApiPagination } from "./useApi";
import { IPaginationProps, IPaginationResponse } from "@/types/api";

export async function getCustomers(
  paginationProps?: IPaginationProps
): Promise<IPaginationResponse<ICustomer[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/customers",
    paginationProps ? paginationProps : { currentPage: 1, pageSize: 50 }
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

export async function updateCustomer(
  id: string,
  customer: ICreateCustomer
): Promise<ICustomer | null> {
  console.log(customer);
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
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

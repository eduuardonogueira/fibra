"use server";

import {
  ICreateCustomer,
  ICustomer,
  ICustomerAndAppointments,
} from "@/types/customers";
import { ICustomerType } from "@/types/customerTypes";
import { IService, IServiceForm, IServiceList } from "@/types/services";
import { IUser, UserRoles } from "@/types/users";
import { cookies } from "next/headers";

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8000", {
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
    const response = await fetch("http://localhost", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getServices(): Promise<IServiceList[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/services`, {
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
    const response = await fetch(`${process.env.BACKEND_URL}/services`, {
      method: "POST",
      body: JSON.stringify(service),
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCustomers(): Promise<ICustomer[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customers`, {
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
    const response = await fetch(`${process.env.BACKEND_URL}/customers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    const data: ICustomerAndAppointments[] = await response.json();
    const foundCustomer = data.find((customer) => customer.id == id);

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

export async function getCustomersAndAppointments(): Promise<
  ICustomerAndAppointments[] | null
> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    const data: ICustomerAndAppointments[] = await response.json();

    const formatedCustomers = data.map((customer) => ({
      ...customer,
      photoUrl: "",
      appointmentsCount: 0,
    }));

    return formatedCustomers;
    // return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function CreateCustomer(
  customer: ICreateCustomer
): Promise<ICustomerAndAppointments[] | null> {
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

export async function getCustomerTypes(): Promise<ICustomerType[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/customer-types`, {
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

export async function getProfessionals(): Promise<IUser[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // headers: { Authorization: `Bearer ${token}` },
    });

    const data: {
      id: string;
      name: string;
      email: string;
      role: UserRoles;
    }[] = await response.json();

    if (data) {
      return data.map((professional) => ({
        ...professional,
        fullName: professional.name,
      }));
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

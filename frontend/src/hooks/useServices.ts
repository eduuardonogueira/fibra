"use server";

import { IService, IServiceForm, IServiceList } from "@/types/services";
import { authFetch, getUrlApiPagination } from "./useApi";
import { IPaginationProps, IPaginationResponse } from "@/types/api";

export async function getServices(
  paginationProps?: IPaginationProps
): Promise<IPaginationResponse<IServiceList[]> | null> {
  const url = getUrlApiPagination(
    process.env.BACKEND_URL,
    "/services",
    paginationProps ? paginationProps : { currentPage: 1, pageSize: 50 }
  );

  try {
    const response = await fetch(url, {
      method: "GET",
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
    const response = await authFetch(
      `${process.env.BACKEND_URL}/services/with-users`,
      {
        method: "POST",
        body: JSON.stringify(service),
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

export async function updateService(
  id: string,
  service: IServiceForm
): Promise<IService | null> {
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/services/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(service),
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

export async function deleteService(
  id: string
): Promise<{ status: number } | null> {
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/services/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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

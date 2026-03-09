"use server";
import { cookies } from "next/headers";

export async function authFetch(
  url: string | URL | globalThis.Request,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  const originalHeaders =
    options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries())
      : options.headers || {};

  const mergedHeaders = {
    ...originalHeaders,
    Authorization: `Bearer ${authToken}`,
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers: mergedHeaders,
  };

  return fetch(url, fetchOptions);
}

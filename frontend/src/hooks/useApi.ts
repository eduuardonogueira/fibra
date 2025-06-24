import { cookies } from "next/headers";

export function getUrlApiPagination(
  baseUrl: string | undefined,
  router: string,
  paginationParams: {
    currentPage: number;
    pageSize: number;
  }
) {
  const { currentPage, pageSize } = paginationParams;
  const params = new URLSearchParams({
    page: currentPage.toString(),
    size: pageSize.toString(),
  }).toString();
  return `${baseUrl}${router}?${params}`;
}

export async function authFetch(
  url: string | URL | globalThis.Request,
  options?: RequestInit
) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    ...options,
  });
}

import { IStatistics } from "@/types/dashboard";
import { authFetch } from "./useApi";

export async function getStatistics(): Promise<IStatistics | null> {
  try {
    const response = await authFetch(
      `${process.env.BACKEND_URL}/api/dashboard/stats`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

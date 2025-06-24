import { mockStats } from "@/app/(home)/dashboard/visao-geral/mock";
import { IStatistics } from "@/types/dashboard";

export async function getStatistics(): Promise<IStatistics | null> {
  try {
    return mockStats;
  } catch (error) {
    console.log(error);
    return null;
  }
}

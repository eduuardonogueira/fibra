import { mockStats } from "@/app/(home)/dashboard/visao-geral/mock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStatistics(): Promise<any | null> {
  try {
    await new Promise((resolver) => setTimeout(resolver, 1000));

    return mockStats;
  } catch (error) {
    console.log(error);
    return null;
  }
}

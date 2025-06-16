import { ICustomerType } from "@/types/customerTypes";

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

export interface ICustomer {
  id: string;
  fullName: string;
  phone: string;
  age: number;
  address: string;
  photoUrl: string;
  customerType: CustomerType;
}

export interface ICustomerAndAppointments extends ICustomer {
  appointmentsId?: string[];
  appointmentsCount: number;
}

export type CustomerType = "adulto" | "mirim" | "familiar";

export interface ICustomer {
  id: string;
  fullName: string;
  phone: string;
  age: number;
  address: string;
  photoUrl: string;
  customerType: {
    id: string;
    name: string;
  };
}

export interface ICustomerAndAppointments extends ICustomer {
  appointmentsId?: string[];
  appointmentsCount: number;
}

export interface ICreateCustomer {
  fullName: string;
  phone: string;
  age: number;
  address: string;
  photoUrl?: string;
  customerType: string;
}

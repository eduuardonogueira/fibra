import { ICustomer } from "./customers";
import { IService } from "./services";

export interface IAppointment {
  id: string;
  dateTime: Date;
  status: string;
  notes: string;
  service: IService;
  customer: ICustomer;
}

export interface IFormatedAppointment {
  id: string;
  customerName: string;
  customerId: string;
  age: number;
  phone: string;
  dateTime: Date;
  status: string;
  customerType: string;
  professional: string;
  serviceType: string;
  notes: string;
}

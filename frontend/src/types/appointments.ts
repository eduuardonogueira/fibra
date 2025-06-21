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
  status: string;
  dateTime: string;
  observations: string;
  customer: {
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
  };
  service: {
    id: string;
    name: string;
    description: string;
    duration: number;
  };
  professional: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface IAppointmentsDetails {
  id: string;
  status: string;
  dateTime: string;
  observations: string;
  customerId: string;
  customerFullName: string;
  phone: string;
  age: number;
  address: string;
  photoUrl: string;
  customerType: string;
  serviceType: string;
  duration: number;
  professional: string;
}

export interface ICreateAppointment {
  status: AppointmentStatus;
  dateTime: Date;
  observations?: string;
  customerId: string;
  serviceId: string;
  userId: string;
}

export type UpdateAppointment = ICreateAppointment;

export type AppointmentStatus =
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELED"
  | "DELAYED";

export const EnumAppointmentStatusMap: Record<string, string> = {
  SCHEDULED: "Agendado",
  COMPLETED: "Completo",
  CANCELED: "Cancelado",
  DELAYED: "Atrasado",
};

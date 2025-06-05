import { IDayOff } from "./dayOff";
import { ITimeOff } from "./timeOff";
import { IExpedient } from "./expedient";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRoles;
}

export type UserRoles = "USER" | "PROFESSIONAL" | "ADMIN";

export interface ICreateProfessional {
  fullName: string;
  email: string;
  role: UserRoles;
  password?: string;
}

export interface IUserWithServices extends IUser {
  services: {
    id: string;
    name: string;
  }[];
}

export interface IProfessionalCalendar {
  id: string;
  fullName: string;
  expedient: IExpedient[];
  timeOffs?: ITimeOff[];
  dayOffs?: IDayOff[];
  appointments?: {
    id: string;
    dateTime: string;
  }[];
}

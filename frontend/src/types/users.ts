import { IDayOff } from "./dayOff";
import { ITimeOff } from "./timeOff";
import { IWorkSchedule } from "./workSchedule";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRoles;
}

export type UserRoles = "profissional" | "admin";

export interface IProfessionalCalendar {
  id: string;
  fullName: string;
  expedient: IWorkSchedule[];
  timeOffs?: ITimeOff[];
  dayOffs?: IDayOff[];
  appointments?: {
    id: string;
    dateTime: string;
  }[];
}

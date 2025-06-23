import { IUser } from "./users";

export interface IService<TUser = IUser> {
  id: string;
  name: string;
  description: string;
  duration: number;
  professionals?: TUser[];
}

export type IServiceList = IService<{
  id: string;
  fullName: string;
}>;

export interface IServiceForm {
  name: string;
  description: string;
  duration: number;
  userIds: string[];
}

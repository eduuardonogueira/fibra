import { IUser } from "./users";

export interface IService<TUser = IUser> {
  id: string;
  name: string;
  description: string;
  users: TUser[];
}

export type IServiceList = IService<{
  id: string;
  fullName: string;
}>;

export interface IServiceForm {
  name: string;
  description: string;
  usersId: string[];
}

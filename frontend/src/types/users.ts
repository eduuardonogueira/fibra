export interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRoles;
}

export type UserRoles = "profissional" | "admin";

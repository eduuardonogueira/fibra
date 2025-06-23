import { UseFormReturn } from "react-hook-form";

export interface IRegisterCustomerForm {
  form: UseFormReturn<
    {
      fullName: string;
      phone: string;
      age: number;
      address: string;
      customerType: string;
      service: string;
      professionalId: string;
      dateTime: Date;
      observations?: string;
    },
    unknown,
    {
      fullName: string;
      phone: string;
      age: number;
      address: string;
      customerType: string;
      service: string;
      professionalId: string;
      dateTime: Date;
      observations?: string;
    }
  >;
}

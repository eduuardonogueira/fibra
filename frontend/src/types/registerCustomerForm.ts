import { UseFormReturn } from "react-hook-form";

export interface IRegisterCustomerForm {
  form: UseFormReturn<
    {
      fullname: string;
      phone: string;
      age: number;
      address: string;
      customerType: string;
      service: string;
      professionalId: string;
      dateTime: Date;
    },
    unknown,
    {
      fullname: string;
      phone: string;
      age: number;
      address: string;
      customerType: string;
      service: string;
      professionalId: string;
      dateTime: Date;
    }
  >;
}

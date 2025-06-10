"use client";

import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { ICustomer, ICustomerAndAppointments } from "@/types/customers";
import { Dispatch, SetStateAction } from "react";

interface ICustomerFormFooter {
  setIsEditing: (prop: boolean) => void;
  isSaving: boolean;
  setEditedCustomer:
    | Dispatch<SetStateAction<ICustomerAndAppointments>>
    | Dispatch<SetStateAction<ICustomerAndAppointments | null>>
    | Dispatch<SetStateAction<ICustomer>>;
  customer: ICustomerAndAppointments;
}

export function CustomerFormFooter({
  isSaving,
  setIsEditing,
  setEditedCustomer,
  customer,
}: ICustomerFormFooter) {
  return (
    <CardFooter className="flex justify-between mt-6">
      <Button
        variant="outline"
        type="button"
        className="hover:cursor-pointer"
        onClick={() => {
          setIsEditing(false);
          setEditedCustomer(customer);
        }}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={isSaving}
        className="hover:cursor-pointer"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </>
        )}
      </Button>
    </CardFooter>
  );
}

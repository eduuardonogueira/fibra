"use client";

import { CustomerFormContent } from "@/components/customerFormContent";
import { CustomerFormFooter } from "@/components/customerFormFooter";
import { CustomerFormHeader } from "@/components/customerFormHeader";
import { Card } from "@/components/ui/card";
import { ICustomerAndAppointments } from "@/types/customers";
import { useEffect, useState } from "react";
import { ICustomerType } from "@/types/customerTypes";
import { myToast } from "@/components/myToast";
import { CUSTOMERS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { createCustomer, getCustomerTypes } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";

export default function CreateCustomer() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customerTypes, setCustomerTypes] = useState<ICustomerType[] | null>(
    null
  );
  const [editedCustomer, setEditedCustomer] =
    useState<ICustomerAndAppointments>({
      id: "",
      fullName: "",
      age: 0,
      address: "",
      photoUrl: "",
      phone: "",
      customerType: {
        id: "",
        name: "adulto",
      },
      appointmentsCount: 0,
    });

  useEffect(() => {
    async function fetchCustomerTypes() {
      try {
        setIsLoading(true);
        const data = await getCustomerTypes();
        if (!data) {
          myToast("Erro", "Erro ao buscar tipos do paciente");
          return;
        }
        setCustomerTypes(data);
      } catch (error) {
        myToast("Error", `${error}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCustomerTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await createCustomer(editedCustomer);

      if (!response) return;

      myToast("Sucesso", "Usuário criado com sucesso");

      setTimeout(() => {
        router.push(CUSTOMERS_ROUTE);
      }, 1000);
    } catch (error) {
      console.log(error);
      myToast("Error", "Falha ao criar usuário");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIsEditing(true);
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerTypeChange = (value: string) => {
    setIsEditing(true);
    if (!customerTypes) return;
    setEditedCustomer((prev) => ({
      ...prev,
      customerType: {
        id: customerTypes.find((type) => type.name === value)?.id ?? "",
        name: value,
      },
    }));
  };

  return (
    <div className="container mx-auto">
      <Card>
        <form onSubmit={handleSubmit}>
          <CustomerFormHeader
            title="Criar Paciente"
            description="Adicione os dados cadastrais do paciente"
          />
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <CustomerFormContent
              handleInputChange={handleInputChange}
              handleCustomerTypeChange={handleCustomerTypeChange}
              editedCustomer={editedCustomer}
              customerTypes={customerTypes}
            />
          )}

          {isEditing && (
            <CustomerFormFooter
              isSaving={isSaving}
              customer={editedCustomer}
              setIsEditing={setIsEditing}
              setEditedCustomer={setEditedCustomer}
            />
          )}
        </form>
      </Card>
    </div>
  );
}

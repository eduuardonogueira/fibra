"use client";

import { CustomerFormContent } from "@/components/customerFormContent";
import { CustomerFormFooter } from "@/components/customerFormFooter";
import { CustomerFormHeader } from "@/components/customerFormHeader";
import { Card } from "@/components/ui/card";
import { CustomerType, ICustomerAndAppointments } from "@/types/customers";
import { useEffect, useState } from "react";
import { mockCustomerTypes } from "../editar/[id]/mock";
import { ICustomerType } from "@/types/customerTypes";
import { myToast } from "@/components/myToast";
import { CUSTOMERS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";

const initialCustomerTypes = mockCustomerTypes;

export default function CreateCustomer() {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customerTypes, setCustomerTypes] = useState<ICustomerType[] | null>(
    null
  );
  const [editedUser, setEditedUser] = useState<ICustomerAndAppointments>({
    id: "",
    fullName: "",
    age: 0,
    address: "",
    photoUrl: "",
    phone: "",
    customerType: "adulto",
    appointmentsCount: 0,
  });

  useEffect(() => {
    async function fetchCustomerTypes() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCustomerTypes(initialCustomerTypes);
    }

    fetchCustomerTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      myToast("Sucesso", "Usuário criado com sucesso");
      router.push(CUSTOMERS_ROUTE);
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
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerTypeChange = (value: CustomerType) => {
    setIsEditing(true);
    setEditedUser((prev) => ({ ...prev, customerType: value }));
  };

  return (
    <div className="container mx-auto">
      <Card>
        <form onSubmit={handleSubmit}>
          <CustomerFormHeader
            title="Criar Paciente"
            description="Adicione os dados cadastrais do paciente"
          />
          <CustomerFormContent
            handleInputChange={handleInputChange}
            handleCustomerTypeChange={handleCustomerTypeChange}
            editedUser={editedUser}
            customerTypes={customerTypes}
          />
          {isEditing && (
            <CustomerFormFooter
              isSaving={isSaving}
              user={editedUser}
              setIsEditing={setIsEditing}
              setEditedUser={setEditedUser}
            />
          )}
        </form>
      </Card>
    </div>
  );
}

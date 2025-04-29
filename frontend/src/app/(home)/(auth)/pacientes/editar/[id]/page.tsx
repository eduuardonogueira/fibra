/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import { useState, useEffect, use } from "react";

import { Card } from "@/components/ui/card";

import { CustomerFormHeader } from "@/components/customerFormHeader";
import { CustomerFormFooter } from "@/components/customerFormFooter";
import { CustomerFormContent } from "@/components/customerFormContent";
import { myToast } from "@/components/myToast";

import { NotFoundCustomer } from "./notFoundCustomer";
import Loading from "./loading";

import { CustomerType, ICustomerAndAppointments } from "@/types/customers";
import { ICustomerType } from "@/types/customerTypes";

import { mockCustomerTypes, mockUsers } from "./mock";
import { CUSTOMERS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";

const initialUsers = mockUsers;
const initialCustomerTypes = mockCustomerTypes;

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = use(params);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customerTypes, setCustomerTypes] = useState<ICustomerType[] | null>(
    null
  );
  const [user, setUser] = useState<ICustomerAndAppointments | null>(null);
  const [editedUser, setEditedUser] = useState<ICustomerAndAppointments | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundUser = initialUsers.find((u) => u.id === userId);

        await new Promise((resolve) => setTimeout(resolve, 500));
        setCustomerTypes(initialCustomerTypes);

        if (foundUser) {
          setEditedUser(foundUser);
          setUser(foundUser);
        } else {
          myToast("Erro", "Usuário não encontrado");
        }
      } catch (error) {
        myToast("Erro", "Falha ao carregar dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      myToast("Sucesso", "Usuário atualizado com sucesso!");
      router.push(CUSTOMERS_ROUTE);
    } catch (error) {
      myToast("Error", "Falha ao atualizar informações do usuário");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIsEditing(true);
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCustomerTypeChange = (value: CustomerType) => {
    setIsEditing(true);
    setEditedUser((prev) => (prev ? { ...prev, customerType: value } : null));
  };

  if (isLoading) return <Loading />;

  if (!user || !editedUser) return <NotFoundCustomer />;

  return (
    <div className="container mx-auto">
      <Card>
        <form onSubmit={handleSubmit}>
          <CustomerFormHeader
            title="Editar Informações do Paciente"
            description="Atualize os dados cadastrais do paciente"
          />

          <CustomerFormContent
            handleInputChange={handleInputChange}
            handleCustomerTypeChange={handleCustomerTypeChange}
            user={user}
            editedUser={editedUser}
            customerTypes={customerTypes}
          />

          {isEditing && (
            <CustomerFormFooter
              isSaving={isSaving}
              user={user}
              setIsEditing={setIsEditing}
              setEditedUser={setEditedUser}
            />
          )}
        </form>
      </Card>
    </div>
  );
}

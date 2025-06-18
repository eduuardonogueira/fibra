/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import { useState, useEffect, use } from "react";

import { Card } from "@/components/ui/card";

import { CustomerFormHeader } from "@/components/customerFormHeader";
import { CustomerFormFooter } from "@/app/(home)/dashboard/pacientes/customerFormFooter";
import { CustomerFormContent } from "@/app/(home)/dashboard/pacientes/customerFormContent";
import { myToast } from "@/components/myToast";

import { NotFoundCustomer } from "./notFoundCustomer";
import Loading from "./loading";

import { ICustomer } from "@/types/customers";
import { ICustomerType } from "@/types/customerTypes";

import { CUSTOMERS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import {
  getCustomerAndAppointmentsById,
  getCustomerTypes,
  updateCustomer,
} from "@/hooks/useApi";

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: customerId } = use(params);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customerTypes, setCustomerTypes] = useState<ICustomerType[] | null>(
    null
  );
  const [customer, setCustumer] = useState<ICustomer | null>(null);
  const [editedCustomer, setEditedCustomer] = useState<ICustomer>({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const foundCustomerData = await getCustomerAndAppointmentsById(
          customerId
        );
        const customerTypesData = await getCustomerTypes();

        if (foundCustomerData && customerTypesData) {
          setEditedCustomer(foundCustomerData);
          setCustumer(foundCustomerData);
          setCustomerTypes(customerTypesData);
        } else {
          myToast("Erro", "Usuário não encontrado");
        }
      } catch (error) {
        myToast("Erro", "Falha ao carregar dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (!editedCustomer) {
      myToast("Error", "Falha ao atualizar informações do usuário");
      return;
    }

    try {
      const response = await updateCustomer(customerId, editedCustomer);

      if (!response) {
        myToast("Error", "Falha ao atualizar informações do usuário");
        return;
      }

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

  if (isLoading) return <Loading />;

  if (!customer || !editedCustomer) return <NotFoundCustomer />;

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
            customer={{ ...customer, appointmentsCount: 0 }}
            editedCustomer={{ ...editedCustomer, appointmentsCount: 0 }}
            customerTypes={customerTypes}
          />

          {isEditing && (
            <CustomerFormFooter
              isSaving={isSaving}
              customer={{ ...customer, appointmentsCount: 0 }}
              setIsEditing={setIsEditing}
              setEditedCustomer={setEditedCustomer}
            />
          )}
        </form>
      </Card>
    </div>
  );
}

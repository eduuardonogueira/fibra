/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import { useState, useEffect, use } from "react";

import { Card } from "@/components/ui/card";

import { CustomerFormHeader } from "@/components/customerFormHeader";
import { myToast } from "@/components/myToast";

import { NotFoundProfessional } from "./notFoundProfessional";
import Loading from "./loading";

import { PROFESSIONALS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { ProfessionalFormFooter } from "../../professionalFormFooter";
import { ProfessionalFormContent } from "../../professionalFormContent";
import { userRoles } from "@/constants/roles";
import { ICreateProfessional, IUser, UserRoles } from "@/types/users";
import { getProfessionalById } from "@/hooks/useProfessionals";

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: professionalId } = use(params);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [professional, setProfessional] = useState<IUser | null>(null);
  const [editedProfessional, setEditedProfessional] = useState<
    IUser | ICreateProfessional
  >({
    id: "",
    fullName: "",
    email: "",
    role: "USER",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const professionalData = await getProfessionalById(professionalId);

        if (professionalData) {
          setEditedProfessional(professionalData);
          setProfessional(professionalData);
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
  }, [professionalId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      myToast("Sucesso", "Usuário atualizado com sucesso!");
      router.push(PROFESSIONALS_ROUTE);
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
    setEditedProfessional((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: UserRoles) => {
    setIsEditing(true);
    setEditedProfessional((prev) => ({
      ...prev,
      role,
    }));
  };

  if (isLoading) return <Loading />;

  if (!professional || !editedProfessional) return <NotFoundProfessional />;

  return (
    <div className="container mx-auto">
      <Card>
        <form onSubmit={handleSubmit}>
          <CustomerFormHeader
            title="Editar Informações do Profissonal"
            description="Atualize os dados cadastrais do profissonal"
          />
          <div className="mt-4">
            <ProfessionalFormContent
              handleInputChange={handleInputChange}
              handleRoleChange={handleRoleChange}
              editedProfessional={editedProfessional}
              professionalRoles={userRoles}
            />

            {isEditing && (
              <ProfessionalFormFooter
                isSaving={isSaving}
                professional={professional}
                setIsEditing={setIsEditing}
                setEditedProfessional={setEditedProfessional}
              />
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

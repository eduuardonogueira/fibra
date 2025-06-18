"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { myToast } from "@/components/myToast";
import { PROFESSIONALS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { createProfessional } from "@/hooks/useProfessionals";
import { ICreateProfessional, UserRoles } from "@/types/users";
import { ProfessionalFormContent } from "../professionalFormContent";
import { CustomerFormHeader } from "@/components/customerFormHeader";
import { ProfessionalFormFooter } from "../professionalFormFooter";
import { userRoles } from "@/constants/roles";

export default function CreateCustomer() {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfessional, setEditedProfessional] =
    useState<ICreateProfessional>({
      fullName: "",
      email: "",
      role: "USER",
      password: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await createProfessional(editedProfessional);

      if (!response) return;

      myToast("Sucesso", "Usuário criado com sucesso");

      setTimeout(() => {
        router.push(PROFESSIONALS_ROUTE);
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
    setEditedProfessional((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: UserRoles) => {
    setIsEditing(true);
    setEditedProfessional((prev) => ({
      ...prev,
      role,
    }));
  };

  return (
    <div className="container mx-auto">
      <Card>
        <form onSubmit={handleSubmit}>
          <CustomerFormHeader
            title="Criar Profissional"
            description="Adicione os dados cadastrais do profissional"
          />
          <div className='mt-4'>
            <ProfessionalFormContent
              handleRoleChange={handleRoleChange}
              handleInputChange={handleInputChange}
              editedProfessional={editedProfessional}
              professionalRoles={userRoles}
            />

            {isEditing && (
              <ProfessionalFormFooter
                isSaving={isSaving}
                professional={editedProfessional}
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

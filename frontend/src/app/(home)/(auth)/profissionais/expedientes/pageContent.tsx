"use client";

import type React from "react";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { myToast } from "@/components/myToast";
import { IExpedient } from "@/types/expedient";
import { initialProfessionals } from "./mock";
import { IUserWithServicesAndExpedients } from "@/types/users";
import ProfessionalExpedientCard from "./professionalExpedientCard";
import CreateDialog from "./createDialog";

export default function PageContent({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dialogType, setDialogType] = useState<"create" | "edit">("create");

  const [professionals, setProfessionals] = useState<
    IUserWithServicesAndExpedients[]
  >([]);
  const [currentExpedient, setCurrentExpedient] = useState<IExpedient | null>(
    null
  );
  const [currentService, setCurrentService] = useState<{
    professionalId: string;
    serviceId: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    weekday: "",
    startTime: "",
    endTime: "",
  });

  // Load professionals
  const fetchProfessionals = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProfessionals(initialProfessionals);
    } catch (error) {
      myToast("Erro", "Falha ao carregar profissionais");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [myToast]);

  useEffect(() => {
    fetchProfessionals();
  }, [fetchProfessionals]);

  // Open dialog for creating a new expedient
  const openCreateDialog = (professionalId: string, serviceId: string) => {
    setCurrentExpedient(null);
    setCurrentService({ professionalId, serviceId });
    setFormData({
      weekday: "",
      startTime: "",
      endTime: "",
    });
    setDialogType("create");
    setIsDialogOpen(true);
  };

  // Open dialog for editing an expedient
  const openEditDialog = (
    expedient: IExpedient,
    professionalId: string,
    serviceId: string
  ) => {
    setCurrentExpedient(expedient);
    setCurrentService({ professionalId, serviceId });
    setFormData({
      weekday: expedient.weekday.toString(),
      startTime: expedient.startTime,
      endTime: expedient.endTime,
    });
    setDialogType("edit");
    setIsDialogOpen(true);
  };

  // Open dialog for deleting an expedient
  const openDeleteDialog = (
    expedient: IExpedient,
    professionalId: string,
    serviceId: string
  ) => {
    setCurrentExpedient(expedient);
    setCurrentService({ professionalId, serviceId });
    setIsDeleteDialogOpen(true);
  };

  // Validate time format and logic
  const validateTimes = (startTime: string, endTime: string): boolean => {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    return start < end;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.weekday || !formData.startTime || !formData.endTime) {
        myToast("Erro", "Todos os campos são obrigatórios");
        setIsSubmitting(false);
        return;
      }

      // Validate time logic
      if (!validateTimes(formData.startTime, formData.endTime)) {
        myToast(
          "Erro",
          "O horário de início deve ser anterior ao horário de fim"
        );
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!currentService) return;

      const updatedProfessionals = professionals.map((professional) => {
        if (professional.id === currentService.professionalId) {
          return {
            ...professional,
            services: professional.services.map((service) => {
              if (service.id === currentService.serviceId) {
                if (currentExpedient) {
                  // Update existing expedient
                  return {
                    ...service,
                    expedients: service.expedients.map((exp) =>
                      exp.id === currentExpedient.id
                        ? {
                            ...exp,
                            weekday: Number.parseInt(formData.weekday),
                            startTime: formData.startTime,
                            endTime: formData.endTime,
                          }
                        : exp
                    ),
                  };
                } else {
                  // Create new expedient
                  const newExpedient: IExpedient = {
                    id: `${Date.now()}`,
                    weekday: Number.parseInt(formData.weekday),
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                  };
                  return {
                    ...service,
                    expedients: [...service.expedients, newExpedient],
                  };
                }
              }
              return service;
            }),
          };
        }
        return professional;
      });

      setProfessionals(updatedProfessionals);
      myToast(
        "Sucesso",
        currentExpedient
          ? "Expediente atualizado com sucesso"
          : "Expediente criado com sucesso"
      );

      setIsDialogOpen(false);
    } catch (error) {
      myToast(
        "Erro",
        currentExpedient
          ? "Falha ao atualizar expediente"
          : "Falha ao criar expediente"
      );
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle expedient deletion
  const handleDelete = async () => {
    if (!currentExpedient || !currentService) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedProfessionals = professionals.map((professional) => {
        if (professional.id === currentService.professionalId) {
          return {
            ...professional,
            services: professional.services.map((service) => {
              if (service.id === currentService.serviceId) {
                return {
                  ...service,
                  expedients: service.expedients.filter(
                    (exp) => exp.id !== currentExpedient.id
                  ),
                };
              }
              return service;
            }),
          };
        }
        return professional;
      });

      setProfessionals(updatedProfessionals);
      myToast("Sucesso", "Expediente excluído com sucesso");
    } catch (error) {
      myToast("Erro", "Falha ao excluir expediente");
      console.log(error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando profissionais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Card>
        {children}
        <CardContent className="space-y-6">
          {professionals.map((professional) => (
            <ProfessionalExpedientCard
              key={professional.id}
              professional={professional}
              openEditDialog={openEditDialog}
              openDeleteDialog={openDeleteDialog}
              openCreateDialog={openCreateDialog}
            />
          ))}
        </CardContent>
      </Card>

      {/* Create/Edit Expedient Dialog */}
      <CreateDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        formData={formData}
        setFormData={setFormData}
        dialogType={dialogType}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este expediente? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

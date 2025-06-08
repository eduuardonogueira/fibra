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
import { ICreateExpedient, IExpedient } from "@/types/expedient";
import { IUserWithServicesAndExpedients } from "@/types/users";
import ProfessionalExpedientCard from "./professionalExpedientCard";
import CreateDialog from "./createDialog";
import {
  createExpedient,
  getProfessionalsWithServicesAndExpedients,
} from "@/hooks/useApi";

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
    userId: string;
    serviceId: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    weekday: "",
    startTime: "",
    endTime: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const fetchProfessionals = useCallback(async () => {
    try {
      const response = await getProfessionalsWithServicesAndExpedients(
        pagination
      );

      if (!response) return;

      const { data, totalPages } = response;

      setPagination((prev) => ({ ...prev, totalPages }));
      setProfessionals(data);
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

  const openCreateDialog = (userId: string, serviceId: string) => {
    setCurrentExpedient(null);
    setCurrentService({ userId, serviceId });
    setFormData({
      weekday: "",
      startTime: "",
      endTime: "",
    });
    setDialogType("create");
    setIsDialogOpen(true);
  };

  const openEditDialog = (
    expedient: IExpedient,
    userId: string,
    serviceId: string
  ) => {
    setCurrentExpedient(expedient);
    setCurrentService({ userId, serviceId });
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
    userId: string,
    serviceId: string
  ) => {
    setCurrentExpedient(expedient);
    setCurrentService({ userId, serviceId });
    setIsDeleteDialogOpen(true);
  };

  const validateTimes = (startTime: string, endTime: string): boolean => {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    return start < end;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.weekday || !formData.startTime || !formData.endTime) {
        myToast("Erro", "Todos os campos são obrigatórios");
        setIsSubmitting(false);
        return;
      }

      if (!validateTimes(formData.startTime, formData.endTime)) {
        myToast(
          "Erro",
          "O horário de início deve ser anterior ao horário de fim"
        );
        setIsSubmitting(false);
        return;
      }

      if (!currentService) return;

      const expedientData: ICreateExpedient = {
        ...formData,
        weekday: Number(formData.weekday),
        ...currentService,
      };
      const response = await createExpedient(expedientData);

      if (!response) return;

      const updatedProfessionals = professionals.map((professional) => {
        if (professional.id === currentService.userId) {
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
        if (professional.id === currentService.userId) {
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

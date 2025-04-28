/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, Loader2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { mockServices } from "./mock";
import { IServiceForm, IServiceList } from "@/types/services";
import { Badge } from "@/components/ui/badge";
import { CreateOrUpdateService } from "./createOrUpdateService";
import { DeleteService } from "./deleteService";

const initialServices = mockServices;

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [services, setServices] = useState<IServiceList[]>([]);
  const [currentService, setCurrentService] = useState<IServiceList | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<IServiceForm>({
    name: "",
    description: "",
    usersId: [],
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setServices(initialServices);
      } catch (error) {
        toast("Erro", {
          description: "Falha ao carregar serviços",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.users.some((user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const openCreateDialog = () => {
    setCurrentService(null);
    setFormData({
      name: "",
      description: "",
      usersId: [""],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: IServiceList) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      usersId: service.users.map((user) => user.id.toString()),
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (service: IServiceList) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Serviços</CardTitle>
              <CardDescription>Gerencie os serviços oferecidos</CardDescription>
            </div>
            <Button onClick={openCreateDialog} className="hover:cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Serviço
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar serviços..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-7 w-7 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Limpar pesquisa</span>
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Descrição
                    </TableHead>
                    <TableHead>Responsáveis</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">
                          {service.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {service.description.length > 100
                            ? `${service.description.substring(0, 100)}...`
                            : service.description}
                        </TableCell>
                        <TableCell className="flex flex-col gap-2 h-full justify-center">
                          {service.users.map((user) => (
                            <Badge key={user.id} variant={"outline"}>
                              {user.fullName}
                            </Badge>
                          ))}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(service)}
                              className="hover:cursor-pointer hover:bg-yellow-500"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(service)}
                              className="hover:cursor-pointer hover:bg-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        {searchQuery
                          ? "Nenhum serviço encontrado para esta pesquisa."
                          : "Nenhum serviço cadastrado."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateOrUpdateService
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        services={services}
        setServices={setServices}
        currentService={currentService}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />

      <DeleteService
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        currentService={currentService}
        services={services}
        setServices={setServices}
      />
    </div>
  );
}

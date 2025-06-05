/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2, Search, X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import {
  CREATE_PROFESSIONAL_ROUTE,
  UPDATE_PROFESSIONAL_ROUTE,
} from "@/constants/routes";
import {
  deleteProfessional,
  getProfessionalsAndServices,
} from "@/hooks/useApi";
import { myToast } from "@/components/myToast";
import { IUserWithServices } from "@/types/users";
import { Badge } from "@/components/ui/badge";
import { ProfessionalRoleBadge } from "@/components/professionalRoleBadge";

export default function ProfessionalPage() {
  const router = useRouter();

  const [professionals, setProfessionals] = useState<
    IUserWithServices[] | null
  >([]);
  const [currentProfessional, setCurrentProfessional] =
    useState<IUserWithServices | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const fetchProfessionals = useCallback(async () => {
    try {
      const response = await getProfessionalsAndServices(pagination);
      if (!response) {
        myToast("Erro", "Falha ao carregar profissionais");
        return;
      }

      const { data, totalPages } = response;

      setProfessionals(data);
      setPagination((prev) => ({ ...prev, totalPages }));
    } catch (error) {
      myToast("Erro", "Falha ao carregar profissionais");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage]);

  useEffect(() => {
    fetchProfessionals();
  }, [fetchProfessionals]);

  const filteredProfessional = professionals?.filter(
    (professional) =>
      professional.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professional.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professional.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToEditProfessional = (professionalId: string) => {
    router.push(`${UPDATE_PROFESSIONAL_ROUTE}/${professionalId}`);
  };

  const openDeleteDialog = (professional: IUserWithServices) => {
    setCurrentProfessional(professional);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!currentProfessional) return;

    try {
      const response = await deleteProfessional(currentProfessional.id);

      if (!response || response.status !== 204) {
        myToast("Erro", "Falha ao excluir profissional");
        return;
      }

      const updatedProfessionals = professionals?.filter(
        (professional) => professional.id !== currentProfessional.id
      );
      if (!updatedProfessionals) return;

      setProfessionals(updatedProfessionals);
      myToast("Sucesso", "Profissional excluído com sucesso");
    } catch (error) {
      myToast("Erro", "Falha ao excluir profissional");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const setCurrentPage = (page: number) =>
    setPagination((prev) => ({ ...prev, currentPage: page }));

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Profissionais</CardTitle>
              <CardDescription>
                Gerencie os profissionais cadastrados
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push(CREATE_PROFESSIONAL_ROUTE)}
              className="hover:cursor-pointer"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Profissional
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar profissionais..."
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
                    <TableHead className="hidden lg:table-cell">
                      Email
                    </TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Serviços
                    </TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfessional && filteredProfessional.length > 0 ? (
                    filteredProfessional.map((professional) => (
                      <TableRow key={professional.id}>
                        <TableCell>{professional.fullName}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {professional.email}
                        </TableCell>
                        <TableCell>
                          <ProfessionalRoleBadge type={professional.role} />
                        </TableCell>
                        <TableCell className="flex-col gap-2 h-full justify-center hidden sm:flex">
                          {professional.services &&
                          professional.services.length > 0 ? (
                            professional.services.map((service) => (
                              <Badge
                                key={`${service.name}${professional.fullName}`}
                                variant="outline"
                              >
                                {service.name}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline">Nenhum Serviço</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                navigateToEditProfessional(professional.id)
                              }
                              className="hover:cursor-pointer hover:bg-yellow-500"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(professional)}
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
                      <TableCell colSpan={7} className="h-24 text-center">
                        {searchQuery
                          ? "Nenhum profissional encontrado para esta pesquisa."
                          : "Nenhum profissional cadastrado."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            setCurrentPage={setCurrentPage}
          />
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o profissional (
              {currentProfessional?.fullName})? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer ">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 hover:cursor-pointer"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

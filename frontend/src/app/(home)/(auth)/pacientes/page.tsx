/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  Loader2,
  Search,
  X,
  UserPlus,
  User,
} from "lucide-react";
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
import { toast } from "sonner";
import { CustomerTypeBadge } from "@/components/customerTypeBadge";
import { ICustomerAndAppointments } from "@/types/customers";
import { Pagination } from "@/components/pagination";
import {
  CREATE_CUSTOMER_ROUTE,
  UPDATE_CUSTOMER_ROUTE,
} from "@/constants/routes";
import { getCustomersAndAppointments } from "@/hooks/useApi";
import { myToast } from "@/components/myToast";

export default function CustomerPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<ICustomerAndAppointments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] =
    useState<ICustomerAndAppointments | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchCustomers = useCallback(async () => {
    try {
      const data = await getCustomersAndAppointments();
      if (!data) {
        myToast("Erro", "Falha ao carregar clientes");
        return;
      }

      setCustomers(data);
    } catch (error) {
      myToast("Erro", "Falha ao carregar clientes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = customers.filter(
    (customers) =>
      customers.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customers.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customers.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigateToEditCustomer = (customerId: string) => {
    router.push(`${UPDATE_CUSTOMER_ROUTE}/${customerId}`);
  };

  const openDeleteDialog = (customer: ICustomerAndAppointments) => {
    setCurrentCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!currentCustomer) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedCustomers = customers.filter(
        (customer) => customer.id !== currentCustomer.id
      );
      setCustomers(updatedCustomers);
      toast("Sucesso", {
        description: "Cliente excluído com sucesso",
      });
    } catch (error) {
      toast("Erro", {
        description: "Falha ao excluir cliente",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Pacientes</CardTitle>
              <CardDescription>
                Gerencie os pacientes cadastrados
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push(CREATE_CUSTOMER_ROUTE)}
              className="hover:cursor-pointer"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar clientes..."
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
                    <TableHead>Cliente</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Idade
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Telefone
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Endereço
                    </TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Agendamentos
                    </TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.length > 0 ? (
                    paginatedCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden">
                              {customer.photoUrl ? (
                                <Image
                                  src={customer.photoUrl || "/placeholder.svg"}
                                  alt={customer.fullName}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-muted flex items-center justify-center">
                                  <User className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="font-medium">
                              {customer.fullName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {customer.age} anos
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {customer.phone}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell max-w-[300px] truncate">
                          {customer.address}
                        </TableCell>
                        <TableCell>
                          <CustomerTypeBadge
                            type={customer.customerType.name}
                          />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {customer.appointmentsCount}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                navigateToEditCustomer(customer.id)
                              }
                              className="hover:cursor-pointer hover:bg-yellow-500"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(customer)}
                              className="hover:cursor-pointer hover:bg-red-500"
                              disabled={customer.appointmentsCount > 0}
                              title={
                                customer.appointmentsCount > 0
                                  ? "Não é possível excluir clientes com agendamentos"
                                  : "Excluir cliente"
                              }
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
                          ? "Nenhum cliente encontrado para esta pesquisa."
                          : "Nenhum cliente cadastrado."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
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
              Tem certeza que deseja excluir o cliente (
              {currentCustomer?.fullName})? Esta ação não pode ser desfeita.
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

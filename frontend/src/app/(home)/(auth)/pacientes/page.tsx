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
import { Badge } from "@/components/ui/badge";

// Mock data for clients
const initialClients = [
  {
    id: "1",
    fullName: "John Doe",
    phone: "(+55) 98765-4321",
    age: 35,
    address: "Rua das Flores, 123, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "adulto",
    appointmentsCount: 4,
  },
  {
    id: "2",
    fullName: "Jane Smith",
    phone: "(+55) 91234-5678",
    age: 28,
    address: "Avenida Paulista, 1000, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "mirim",
    appointmentsCount: 3,
  },
  {
    id: "3",
    fullName: "Robert Johnson",
    phone: "(+55) 99876-5432",
    age: 42,
    address: "Rua Augusta, 500, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "familiar",
    appointmentsCount: 2,
  },
  {
    id: "4",
    fullName: "Emily Davis",
    phone: "(+55) 97654-3210",
    age: 31,
    address: "Rua Oscar Freire, 300, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "adulto",
    appointmentsCount: 4,
  },
  {
    id: "5",
    fullName: "Michael Wilson",
    phone: "(+55) 95555-4444",
    age: 45,
    address: "Alameda Santos, 800, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "adulto",
    appointmentsCount: 1,
  },
  {
    id: "6",
    fullName: "Sarah Brown",
    phone: "(+55) 94444-3333",
    age: 29,
    address: "Rua Haddock Lobo, 400, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "mirim",
    appointmentsCount: 2,
  },
  {
    id: "7",
    fullName: "David Miller",
    phone: "(+55) 93333-2222",
    age: 38,
    address: "Avenida Rebouças, 600, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "adulto",
    appointmentsCount: 0,
  },
  {
    id: "8",
    fullName: "Jennifer Taylor",
    phone: "(+55) 92222-1111",
    age: 33,
    address: "Rua da Consolação, 700, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "adulto",
    appointmentsCount: 1,
  },
  {
    id: "9",
    fullName: "Thomas Anderson",
    phone: "(+55) 91111-0000",
    age: 41,
    address: "Avenida Brigadeiro Faria Lima, 1500, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "familiar",
    appointmentsCount: 3,
  },
  {
    id: "10",
    fullName: "Lisa White",
    phone: "(+55) 90000-9999",
    age: 27,
    address: "Rua Bela Cintra, 300, São Paulo, SP",
    photo: "/placeholder.svg?height=40&width=40",
    customerType: "mirim",
    appointmentsCount: 2,
  },
];

// Customer type badge component
const CustomerTypeBadge = ({ type }: { type: string }) => {
  const typeStyles = {
    adulto: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    mirim: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    familiar: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  };

  return (
    <Badge
      variant="outline"
      className={`capitalize ${typeStyles[type as keyof typeof typeStyles]}`}
    >
      {type === "adulto" ? "Adulto" : type === "mirim" ? "Mirim" : "Familiar"}
    </Badge>
  );
};

type Client = {
  id: string;
  fullName: string;
  phone: string;
  age: number;
  address: string;
  photo: string;
  customerType: string;
  appointmentsCount: number;
};

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Load clients
  const fetchClients = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setClients(initialClients);
    } catch (error) {
      toast("Erro", {
        description: "Falha ao carregar clientes",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Filter clients based on search query
  const filteredClients = clients.filter(
    (client) =>
      client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Navigate to edit client page
  const navigateToEditClient = (clientId: string) => {
    router.push(`/editar-usuario/${clientId}`);
  };

  // Open dialog for deleting a client
  const openDeleteDialog = (client: Client) => {
    setCurrentClient(client);
    setIsDeleteDialogOpen(true);
  };

  // Handle client deletion
  const handleDelete = async () => {
    if (!currentClient) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedClients = clients.filter(
        (client) => client.id !== currentClient.id
      );
      setClients(updatedClients);
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

  // Handle page changes
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Clientes</CardTitle>
              <CardDescription>
                Gerencie os clientes cadastrados
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/cadastrar-cliente")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
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

          {/* Clients table */}
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
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedClients.length > 0 ? (
                    paginatedClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden">
                              {client.photo ? (
                                <Image
                                  src={client.photo || "/placeholder.svg"}
                                  alt={client.fullName}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-muted flex items-center justify-center">
                                  <User className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="font-medium">{client.fullName}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {client.age} anos
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {client.phone}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell max-w-[300px] truncate">
                          {client.address}
                        </TableCell>
                        <TableCell>
                          <CustomerTypeBadge type={client.customerType} />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {client.appointmentsCount}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigateToEditClient(client.id)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(client)}
                              disabled={client.appointmentsCount > 0}
                              title={
                                client.appointmentsCount > 0
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <div className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o cliente (
              {currentClient?.fullName})? Esta ação não pode ser desfeita.
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

"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Search, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DetailsModal from "./detailsModal";
import { CustomerTypeBadge } from "@/components/customerTypeBadge";
import {
  IAppointmentsDetails,
  IFormatedAppointment,
} from "@/types/appointments";
import { Pagination } from "@/components/pagination";
import { getAppointments } from "@/hooks/useAppointments";
import { myToast } from "@/components/myToast";
import StatusBadge from "@/components/statusBadge";
import { ptBR } from "date-fns/locale";
import { DeleteAppointment } from "./deleteAppointment";

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string[]>([]);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointmentsDetails | null>(null);
  const [appointments, setAppointments] = useState<
    IFormatedAppointment[] | null
  >(null);

  const defaultPageSize = 10;
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: defaultPageSize,
    totalPages: 0,
  });

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await getAppointments(pagination);
        if (!response) return;

        const { data, totalPages } = response;
        setAppointments(data);
        setPagination((prev) => ({ ...prev, totalPages }));
      } catch (error) {
        myToast("Erro", `Falha ao carregar serviços ${error}`);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    fetchAppointments();
  }, [pagination.currentPage, pagination.pageSize]);

  const statusTypes = Array.from(
    new Set(
      appointments?.map((appointment) => appointment.status.toLowerCase())
    )
  );

  const serviceTypes = Array.from(
    new Set(
      appointments?.map((appointment) => appointment.service.name.toLowerCase())
    )
  );

  const customerTypes = Array.from(
    new Set(
      appointments?.map((appointment) =>
        appointment.customer.customerType.name.toLowerCase()
      )
    )
  );

  const filteredAppointments = appointments?.filter((appointment) => {
    const matchesSearch = appointment.customer.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter.length === 0 ||
      statusFilter.includes(appointment.status.toLowerCase());

    const matchesCustomerType =
      customerTypeFilter.length === 0 ||
      customerTypeFilter.includes(
        appointment.customer.customerType.name.toLowerCase()
      );

    const matchesServiceType =
      serviceTypeFilter.length === 0 ||
      serviceTypeFilter.includes(appointment.service.name.toLowerCase());

    const matchesDate =
      !dateFilter ||
      format(appointment.dateTime, "yyyy-MM-dd") ===
        format(dateFilter, "yyyy-MM-dd");

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCustomerType &&
      matchesServiceType &&
      matchesDate
    );
  });

  const setCurrentPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter([]);
    setCustomerTypeFilter([]);
    setServiceTypeFilter([]);
    setDateFilter(undefined);
    setPagination((prev) => ({ ...prev, pageSize: defaultPageSize }));
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((current) =>
      current.includes(status)
        ? current.filter((s) => s !== status)
        : [...current, status]
    );
  };

  const toggleCustomerTypeFilter = (type: string) => {
    setCustomerTypeFilter((current) =>
      current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type]
    );
  };

  const toggleServiceTypeFilter = (serviceType: string) => {
    setServiceTypeFilter((current) =>
      current.includes(serviceType)
        ? current.filter((s) => s !== serviceType)
        : [...current, serviceType]
    );
  };

  const openAppointmentDetails = (appointment: IFormatedAppointment) => {
    const formatedData = {
      id: appointment.id,
      status: appointment.status,
      dateTime: appointment.dateTime,
      observations: appointment.observations,
      customerId: appointment.customer.id,
      customerFullName: appointment.customer.fullName,
      phone: appointment.customer.phone,
      age: appointment.customer.age,
      address: appointment.customer.address,
      photoUrl: appointment.customer.photoUrl,
      customerType: appointment.customer.customerType.name,
      serviceType: appointment.service.name,
      duration: appointment.service.duration,
      professional: appointment.professional.fullName,
    };
    setSelectedAppointment(formatedData);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Agendamentos</CardTitle>
          <CardDescription>
            Visualize e gerencie os agendamentos dos clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6 flex-wrap">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por nome..."
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

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[200px] justify-start text-left font-normal hover:cursor-pointer"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter ? (
                        format(dateFilter, "PPP")
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFilter}
                      onSelect={setDateFilter}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[200px] hover:cursor-pointer"
                    >
                      {serviceTypeFilter.length > 0
                        ? `Serviço (${serviceTypeFilter.length})`
                        : "Tipo de Atendimento"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[250px]">
                    {serviceTypes.map((serviceType) => (
                      <DropdownMenuCheckboxItem
                        key={serviceType}
                        className="capitalize hover:cursor-pointer"
                        checked={serviceTypeFilter.includes(serviceType)}
                        onCheckedChange={() =>
                          toggleServiceTypeFilter(serviceType)
                        }
                      >
                        {serviceType}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[150px] hover:cursor-pointer"
                    >
                      {customerTypeFilter.length > 0
                        ? `Tipo (${customerTypeFilter.length})`
                        : "Tipo de Cliente"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    {customerTypes.map((type) => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        className="capitalize hover:cursor-pointer"
                        checked={customerTypeFilter.includes(type)}
                        onCheckedChange={() => toggleCustomerTypeFilter(type)}
                      >
                        {type}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[150px] hover:cursor-pointer"
                    >
                      {statusFilter.length > 0
                        ? `Status (${statusFilter.length})`
                        : "Status"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    {statusTypes.map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        className="capitalize hover:cursor-pointer"
                        checked={statusFilter.includes(status)}
                        onCheckedChange={() => toggleStatusFilter(status)}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Select
                  onValueChange={(value) =>
                    setPagination((prev) => ({
                      ...prev,
                      pageSize: parseInt(value),
                    }))
                  }
                  value={pagination.pageSize.toString()}
                >
                  <SelectTrigger className="min-w-[80px] w-full md:w-[80px] hover:cursor-pointer">
                    <SelectValue placeholder="Itens por página" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from([5, 10, 20]).map((quantity) => (
                      <SelectItem
                        key={quantity}
                        value={quantity.toString()}
                        className="hover:cursor-pointer"
                      >
                        {quantity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="min-w-[120px] border-1 not-disabled:border-gray-600 hover:cursor-pointer"
                  disabled={
                    !searchQuery &&
                    statusFilter.length === 0 &&
                    customerTypeFilter.length === 0 &&
                    serviceTypeFilter.length === 0 &&
                    !dateFilter &&
                    pagination.pageSize === defaultPageSize
                  }
                >
                  Limpar Filtros
                </Button>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Idade
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Telefone
                      </TableHead>
                      <TableHead>Data Agendamento</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Tipo de Atendimento
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Duração
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Tipo
                      </TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments && filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <TableRow
                          key={appointment.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => openAppointmentDetails(appointment)}
                        >
                          <TableCell className="font-medium">
                            {appointment.customer.fullName}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {appointment.customer.age}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {appointment.customer.phone}
                          </TableCell>
                          <TableCell>
                            {format(appointment.dateTime, "dd/MM/yyyy")}
                            <div className="text-sm text-muted-foreground">
                              {format(appointment.dateTime, "HH:mm", {
                                locale: ptBR,
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {appointment.service.name}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {appointment.service.duration}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <CustomerTypeBadge
                              type={appointment.customer.customerType.name}
                            />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={appointment.status} />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Nenhum agendamento encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <DetailsModal
        selectedAppointment={selectedAppointment}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      <DeleteAppointment
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        setIsModalOpen={setIsModalOpen}
        selectedAppointment={selectedAppointment}
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </div>
  );
}

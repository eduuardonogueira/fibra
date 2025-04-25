"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search, X } from "lucide-react";

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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MockAppointmentsData } from "./mock";
import DetailsModal from "./detailsModal";
import { StatusBadge } from "./statusBadge";
import { CustomerTypeBadge } from "./customerTypeBadge";

// Mock data for appointments
const appointments = MockAppointmentsData;
type Appointment = (typeof appointments)[0];

// Extract unique service types for filter
const statusTypes = Array.from(
  new Set(appointments.map((appointment) => appointment.status.toLowerCase()))
);

const serviceTypes = Array.from(
  new Set(
    appointments.map((appointment) => appointment.serviceType.toLowerCase())
  )
);

// Extract unique customer types for filter
const customerTypes = Array.from(
  new Set(
    appointments.map((appointment) => appointment.customerType.toLowerCase())
  )
);

// Status badge component

// Customer type badge component

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string[]>([]);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedAppointment, setSelectedAppointment] = useState<
    (typeof appointments)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultItemPerPageValue = 5;
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemPerPageValue);

  const matchesFilter = (
    filter: string[] | Date | undefined,
    field: keyof Appointment,
    appointment: Appointment
  ) => {
    if (filter instanceof Array && filter.length === 0) return true;

    if (typeof appointment[field] === "string" && filter instanceof Array)
      return filter.includes(appointment[field].toLowerCase());

    if (appointment[field] && filter instanceof Date)
      return (
        format(appointment[field], "yyyy-MM-dd") ===
        format(filter, "yyyy-MM-dd")
      );
  };

  // Filter appointments based on search query and filters
  const filteredAppointments = appointments.filter((appointment) => {
    // Search filter
    const matchesSearch = appointment.customerName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus = matchesFilter(statusFilter, "status", appointment);
    const matchesCustomerType = matchesFilter(
      customerTypeFilter,
      "customerType",
      appointment
    );
    const matchesServiceType = matchesFilter(
      serviceTypeFilter,
      "serviceType",
      appointment
    );
    const matchesDate =
      !dateFilter || matchesFilter(dateFilter, "dateTime", appointment);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCustomerType &&
      matchesServiceType &&
      matchesDate
    );
  });

  // Add pagination calculation
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter([]);
    setCustomerTypeFilter([]);
    setServiceTypeFilter([]);
    setDateFilter(undefined);
    setItemsPerPage(defaultItemPerPageValue);
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

  // Add function to open the appointment details modal
  const openAppointmentDetails = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Add function to handle page changes
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Agendamentos</CardTitle>
          <CardDescription>
            Visualize e gerencie os agendamentos dos clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and filters */}
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

            {/* Date filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[200px] justify-start text-left font-normal"
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

            {/* Status filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[150px]">
                  {statusFilter.length > 0
                    ? `Status (${statusFilter.length})`
                    : "Status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {statusTypes.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    className="capitalize"
                    checked={statusFilter.includes(status)}
                    onCheckedChange={() => toggleStatusFilter(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Customer type filter - changed to multi-select dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[150px]">
                  {customerTypeFilter.length > 0
                    ? `Tipo (${customerTypeFilter.length})`
                    : "Tipo de Cliente"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {customerTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    className="capitalize"
                    checked={customerTypeFilter.includes(type)}
                    onCheckedChange={() => toggleCustomerTypeFilter(type)}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Service type filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[200px]">
                  {serviceTypeFilter.length > 0
                    ? `Serviço (${serviceTypeFilter.length})`
                    : "Tipo de Atendimento"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[250px]">
                {serviceTypes.map((serviceType) => (
                  <DropdownMenuCheckboxItem
                    key={serviceType}
                    className="capitalize"
                    checked={serviceTypeFilter.includes(serviceType)}
                    onCheckedChange={() => toggleServiceTypeFilter(serviceType)}
                  >
                    {serviceType}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Select
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
              value={itemsPerPage.toString()}
            >
              <SelectTrigger className="min-w-[80px] w-full md:w-[80px]">
                <SelectValue placeholder="Itens por página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear filters button */}
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="min-w-[120px]"
              disabled={
                !searchQuery &&
                statusFilter.length === 0 &&
                customerTypeFilter.length === 0 &&
                serviceTypeFilter.length === 0 &&
                !dateFilter &&
                itemsPerPage === defaultItemPerPageValue
              }
            >
              Limpar Filtros
            </Button>
          </div>

          {/* Appointments table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Idade</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Telefone
                  </TableHead>
                  <TableHead>Data Agendamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Tipo de Atendimento
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAppointments.length > 0 ? (
                  paginatedAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => openAppointmentDetails(appointment)}
                    >
                      <TableCell className="font-medium">
                        {appointment.customerName}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {appointment.age}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {appointment.phone}
                      </TableCell>
                      <TableCell>
                        {format(appointment.dateTime, "dd/MM/yyyy")}
                        <div className="text-sm text-muted-foreground">
                          {format(appointment.dateTime, "HH:mm")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={appointment.status} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <CustomerTypeBadge type={appointment.customerType} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {appointment.serviceType}
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
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </Button>
              <div className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próxima página</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <DetailsModal
        selectedAppointment={selectedAppointment}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

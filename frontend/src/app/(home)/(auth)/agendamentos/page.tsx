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
import { mockAppointments } from "./mock";
import DetailsModal from "./detailsModal";
import { StatusBadge } from "./statusBadge";
import { CustomerTypeBadge } from "@/components/customerTypeBadge";
import { IFormatedAppointment } from "@/types/appointments";
import { Pagination } from "@/components/pagination";

const appointments: IFormatedAppointment[] = mockAppointments;

const statusTypes = Array.from(
  new Set(appointments.map((appointment) => appointment.status.toLowerCase()))
);

const serviceTypes = Array.from(
  new Set(
    appointments.map((appointment) => appointment.serviceType.toLowerCase())
  )
);

const customerTypes = Array.from(
  new Set(
    appointments.map((appointment) => appointment.customerType.toLowerCase())
  )
);

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string[]>([]);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IFormatedAppointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultItemPerPageValue = 5;
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemPerPageValue);

  const matchesFilter = (
    filter: string[] | Date | undefined,
    field: keyof IFormatedAppointment,
    appointment: IFormatedAppointment
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

  const filteredAppointments = appointments.filter((appointment) => {
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

  const openAppointmentDetails = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment);
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
                    onCheckedChange={() => toggleServiceTypeFilter(serviceType)}
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
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
              value={itemsPerPage.toString()}
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
                itemsPerPage === defaultItemPerPageValue
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
                  <TableHead className="hidden md:table-cell">Idade</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Telefone
                  </TableHead>
                  <TableHead>Data Agendamento</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Tipo de Atendimento
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                  <TableHead>Status</TableHead>
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
                      <TableCell className="hidden md:table-cell">
                        {appointment.serviceType}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <CustomerTypeBadge type={appointment.customerType} />
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
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
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

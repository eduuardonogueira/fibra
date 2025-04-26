import { CustomerTypeBadge } from "@/app/(home)/agendamentos/customerTypeBadge";
import { StatusBadge } from "@/app/(home)/agendamentos/statusBadge";
import { Appointment } from "@/types/appointments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface IDetailsModal {
  label: string;
  field: keyof Appointment;
  format?: (prop: string | number | Date) => string;
  component?: (prop: string | number | Date) => React.ReactNode;
}

export const detailsModal: IDetailsModal[] = [
  {
    label: "Nome",
    field: "customerName",
  },
  {
    label: "Idade",
    field: "age",
    format: (number) => number.toString(),
  },
  {
    label: "Telefone",
    field: "phone",
  },
  {
    label: "Profissional",
    field: "professional",
  },
  {
    label: "Data",
    field: "dateTime",
    format: (date) =>
      `${format(date, "PPP", { locale: ptBR })} às ${format(
        date,
        "HH:mm"
      )} horas`,
  },
  {
    label: "Tipo de Atendimento",
    field: "serviceType",
  },
  {
    label: "Status",
    field: "status",
    component: (value) =>
      typeof value === "string" ? <StatusBadge status={value} /> : "",
  },
  {
    label: "Tipo de Paciente",
    field: "customerType",
    component: (value) =>
      typeof value === "string" ? <CustomerTypeBadge type={value} /> : "",
  },
  {
    label: "Observações",
    field: "notes",
  },
];

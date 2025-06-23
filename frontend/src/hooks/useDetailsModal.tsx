import { CustomerTypeBadge } from "@/components/customerTypeBadge";
import StatusBadge from "@/components/statusBadge";
import { IAppointmentsDetails } from "@/types/appointments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface IDetailsModal {
  label: string;
  field: keyof IAppointmentsDetails;
  format?: (prop: string | number | Date) => string;
  component?: (prop: string | number | Date) => React.ReactNode;
}

export const detailsModal: IDetailsModal[] = [
  {
    label: "Nome",
    field: "customerFullName",
  },
  {
    label: "Idade",
    field: "age",
    format: (number) => `${number} anos`,
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
      `${format(date, "PPP", { locale: ptBR })} às ${format(date, "HH:mm", {
        locale: ptBR,
      })} horas`,
  },
  {
    label: "Tipo de Atendimento",
    field: "serviceType",
  },
  {
    label: "Duração",
    field: "duration",
    format: (string) => `${string} minutos`,
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
    field: "observations",
    format: (string) => (string ? `${string}` : "Sem observações"),
  },
];

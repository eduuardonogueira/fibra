import { Badge } from "./ui/badge";

export default function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    SCHEDULED: "bg-green-100 text-green-800 hover:bg-green-100",
    DELAYED: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    COMPLETED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    CANCELED: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const statusLabels = {
    SCHEDULED: "Agendado",
    DELAYED: "Atrasado",
    COMPLETED: "Completo",
    CANCELED: "Cancelado",
  };

  return (
    <Badge
      variant="outline"
      className={statusStyles[status as keyof typeof statusStyles]}
    >
      {statusLabels[status as keyof typeof statusLabels]}
    </Badge>
  );
}

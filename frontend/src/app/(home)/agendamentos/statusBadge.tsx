import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    confirmado: "bg-green-100 text-green-800 hover:bg-green-100",
    pendente: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    completo: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    cacelado: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        statusStyles[status as keyof typeof statusStyles]
      )}
    >
      {status}
    </Badge>
  );
};
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ProfessionalRoleBadge({ type }: { type: string }) {
  const typeStyles = {
    PROFESSIONAL: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    USER: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    ADMIN: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  };

  return (
    <Badge
      variant="outline"
      className={cn("capitalize", typeStyles[type as keyof typeof typeStyles])}
    >
      {type.toLowerCase()}
    </Badge>
  );
}

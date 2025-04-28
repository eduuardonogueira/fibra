import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function CustomerTypeBadge({ type }: { type: string }) {
  const typeStyles = {
    adulto: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    mirim: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    familiar: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  };

  return (
    <Badge
      variant="outline"
      className={cn("capitalize", typeStyles[type as keyof typeof typeStyles])}
    >
      {type}
    </Badge>
  );
}

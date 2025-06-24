import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface IClientDistributionProps {
  clientsByType: Record<string, number>;
  totalClients: number;
}

export default function ClientDistribution({
  clientsByType,
  totalClients,
}: IClientDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5" />
          Distribuição de Clientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(clientsByType).map(
            ([type, count]: [string, number]) => {
              const percentage = Math.round((count / totalClients) * 100);
              const typeLabels = {
                guarda: "Guarda",
                mirim: "Mirim",
                familiar: "Familiar",
              };
              const typeColors = {
                guarda: "bg-gray-500",
                mirim: "bg-purple-500",
                familiar: "bg-amber-500",
              };

              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{typeLabels[type as keyof typeof typeLabels]}</span>
                    <span className="font-medium">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full ${
                        typeColors[type as keyof typeof typeColors]
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
}

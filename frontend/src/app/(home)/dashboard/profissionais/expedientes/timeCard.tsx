import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { weekdayNames } from "@/constants/weekdayNames";
import { IExpedient } from "@/types/expedient";
import { IUser, IUserWithServicesAndExpedients } from "@/types/users";
import { Clock, Pencil, Trash2 } from "lucide-react";

interface ITimeCardProps {
  service: IUserWithServicesAndExpedients["services"][0];
  professional: IUser;
  openEditDialog: (
    expedient: IExpedient,
    professionalId: string,
    serviceId: string
  ) => void;
  openDeleteDialog: (
    expedient: IExpedient,
    professionalId: string,
    serviceId: string
  ) => void;
}

export default function TimeCard({
  service,
  openEditDialog,
  professional,
  openDeleteDialog,
}: ITimeCardProps) {
  const sortExpedients = (expedients: IExpedient[]) => {
    return [...expedients].sort((a, b) => {
      if (a.weekday !== b.weekday) {
        return a.weekday - b.weekday;
      }
      return a.startTime.localeCompare(b.startTime);
    });
  };

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
      {sortExpedients(service.expedients).map((expedient) => (
        <Card key={expedient.id} className="p-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {weekdayNames[expedient.weekday]}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {expedient.startTime} - {expedient.endTime}
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:cursor-pointer hover:bg-yellow-500"
                onClick={() =>
                  openEditDialog(expedient, professional.id, service.id)
                }
              >
                <Pencil className="h-3 w-3" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:cursor-pointer hover:bg-red-500"
                onClick={() =>
                  openDeleteDialog(expedient, professional.id, service.id)
                }
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Excluir</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

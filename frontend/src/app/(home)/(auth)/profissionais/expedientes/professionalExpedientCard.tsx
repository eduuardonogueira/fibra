import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Clock, PlusCircle, User } from "lucide-react";
import TimeCard from "./timeCard";
import { Badge } from "@/components/ui/badge";
import { IUserWithServicesAndExpedients } from "@/types/users";
import { IExpedient } from "@/types/expedient";

interface IProfessionalExpedientCardProps {
  professional: IUserWithServicesAndExpedients;
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
  openCreateDialog: (professionalId: string, serviceId: string) => void;
}

export default function ProfessionalExpedientCard({
  professional,
  openEditDialog,
  openDeleteDialog,
  openCreateDialog,
}: IProfessionalExpedientCardProps) {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{professional.fullName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {professional.services.map((service, serviceIndex) => (
          <div key={service.id}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">{service.name}</h4>
                <Badge variant="outline">
                  {service.expedients.length} expedientes
                </Badge>
              </div>
              <Button
                size="sm"
                onClick={() => openCreateDialog(professional.id, service.id)}
                className="h-8"
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Adicionar Expediente
              </Button>
            </div>

            {service.expedients.length > 0 ? (
              <TimeCard
                service={service}
                openEditDialog={openEditDialog}
                professional={professional}
                openDeleteDialog={openDeleteDialog}
              />
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum expediente cadastrado para este serviço</p>
              </div>
            )}

            {serviceIndex < professional.services.length - 1 && (
              <Separator className="mt-4" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

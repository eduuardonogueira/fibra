import { CustomerTypeBadge } from "@/components/customerTypeBadge";
import StatusBadge from "@/components/statusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { location } from "@/constants/localInformations";
import { APPOINTMENTS_ROUTE, UPDATE_CUSTOMER_ROUTE } from "@/constants/routes";
import { IFormatedAppointment } from "@/types/appointments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface IAppointmentsDetailsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedAppointment: IFormatedAppointment;
}

export default function AppointmentsDetailsModal({
  isModalOpen,
  setIsModalOpen,
  selectedAppointment,
}: IAppointmentsDetailsModalProps) {
  const getEndTime = () => {
    const startTime = new Date(selectedAppointment.dateTime);
    const endTime = new Date(startTime).setMinutes(
      startTime.getMinutes() + selectedAppointment.service.duration
    );
    return endTime;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Agendamento</DialogTitle>
          <DialogDescription>
            Informações completas sobre o agendamento selecionado.
          </DialogDescription>
        </DialogHeader>
        {selectedAppointment && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedAppointment.customer.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">
                  {selectedAppointment.customer.fullName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {selectedAppointment.customer.phone}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedAppointment.customer.age} anos
                  </span>
                  <CustomerTypeBadge
                    type={selectedAppointment.customer.customerType.name}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Data e Horário
                  </p>
                  <p className="text-sm">
                    {format(
                      selectedAppointment.dateTime,
                      "EEEE, dd 'de' MMMM",
                      { locale: ptBR }
                    )}
                  </p>
                  <p className="text-sm">
                    {format(selectedAppointment.dateTime, "HH:mm")} -{" "}
                    {format(getEndTime(), "HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Status
                  </p>
                  <StatusBadge status={selectedAppointment.status} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Profissional
                  </p>
                  <p className="text-sm">
                    {selectedAppointment.professional.fullName}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Local
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {location}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Tipo de Serviço
                  </p>
                  <p className="text-sm">{selectedAppointment.service.name}</p>
                </div>

                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Duração
                  </p>
                  <p className="text-sm">
                    {selectedAppointment.service.duration} minutos
                  </p>
                </div>

                {selectedAppointment.observations && (
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">
                      Observações
                    </p>
                    <p className="text-sm">
                      {selectedAppointment.observations}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full md:flex-row md:w-auto gap-2 pt-4 justify-end">
              <Link
                href={`${UPDATE_CUSTOMER_ROUTE}/${selectedAppointment.customer.id}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:cursor-pointer w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  Editar Paciente
                </Button>
              </Link>
              <Link
                href={`${APPOINTMENTS_ROUTE}?editDialog=${selectedAppointment.id}`}
              >
                <Button size="sm" className="hover:cursor-pointer w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Editar Agendamento
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

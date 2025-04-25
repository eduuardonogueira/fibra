import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { StatusBadge } from "./statusBadge";
import { CustomerTypeBadge } from "./customerTypeBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IModalProps {
  selectedAppointment: {
    id: number;
    customerName: string;
    age: number;
    phone: string;
    dateTime: Date;
    status: string;
    customerType: string;
    professional: string;
    serviceType: string;
    notes: string;
  } | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DetailsModal({
  selectedAppointment,
  isModalOpen,
  setIsModalOpen,
}: IModalProps) {
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium col-span-1">Nome:</div>
              <div className="col-span-3">
                {selectedAppointment.customerName}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Idade:</div>
              <div className="col-span-3">{selectedAppointment.age} anos</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Telefone:</div>
              <div className="col-span-3">{selectedAppointment.phone}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Profissional:</div>
              <div className="col-span-3">
                {selectedAppointment.professional}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Data:</div>
              <div className="col-span-3">
                {format(selectedAppointment.dateTime, "PPP", {
                  locale: ptBR,
                })}{" "}
                às {format(selectedAppointment.dateTime, "HH:mm")} horas
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Tipo de Atendimento:</div>
              <div className="col-span-3">
                {selectedAppointment.serviceType}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Status:</div>
              <div className="col-span-3">
                <StatusBadge status={selectedAppointment.status} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">Tipo de Paciente:</div>
              <div className="col-span-3">
                <CustomerTypeBadge type={selectedAppointment.customerType} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="font-medium">Observações:</div>
              <div className="col-span-3">{selectedAppointment.notes}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

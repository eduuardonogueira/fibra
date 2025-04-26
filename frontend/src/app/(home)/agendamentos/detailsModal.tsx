import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { detailsModal, IDetailsModal } from "@/hooks/useDetailsModal";

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

const renderValue = (details: IDetailsModal, value: string | number | Date) => {
  if (details.component) return details.component(value);
  if (details.format) return details.format(value);
  if (value instanceof Date) return value.toLocaleString();
  return value;
};

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
        {selectedAppointment &&
          detailsModal.map((details) => {
            const rawValue = selectedAppointment[details.field];
            const renderedValue: string | React.ReactNode = renderValue(
              details,
              rawValue
            );

            return (
              <div
                key={details.label}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] items-start gap-4"
              >
                <div className="font-medium col-span-1">{details.label}:</div>
                <div className="col-span-1">{renderedValue}</div>
              </div>
            );
          })}
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { detailsModal, IDetailsModal } from "@/hooks/useDetailsModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { IAppointmentsDetails } from "@/types/appointments";
import { UPDATE_CUSTOMER_ROUTE } from "@/constants/routes";

interface IModalProps {
  selectedAppointment: IAppointmentsDetails | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
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
  setIsDeleteDialogOpen,
}: IModalProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[500px] flex flex-col w-full">
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
                className="grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] items-start gap-4 w-full"
              >
                <div className="font-medium col-span-1">{details.label}:</div>
                <div className="col-span-1 break-words whitespace-pre-line max-w-full truncate">
                  {renderedValue}
                </div>
              </div>
            );
          })}
        <DialogFooter className="mt-2 flex justify-between!">
          <Button
            variant="secondary"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="hover:cursor-pointer hover:bg-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Deletar agendamento
            <span className="sr-only">Deletar Agendamento</span>
          </Button>
          <Link
            href={`${UPDATE_CUSTOMER_ROUTE}/${selectedAppointment?.customerId}`}
          >
            <Button className="hover:cursor-pointer w-full">
              <Edit className="mr-2 h-4 w-4" />
              Editar Informações do Clente
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { myToast } from "@/components/myToast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteAppointment } from "@/hooks/useApi";
import {
  IAppointmentsDetails,
  IFormatedAppointment,
} from "@/types/appointments";

interface IDeleteServiceProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (p: boolean) => void;
  setIsModalOpen: (p: boolean) => void;
  appointments: IFormatedAppointment[] | null;
  selectedAppointment: IAppointmentsDetails | null;
  setAppointments: React.Dispatch<
    React.SetStateAction<IFormatedAppointment[] | null>
  >;
}

export function DeleteAppointment({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  setIsModalOpen,
  selectedAppointment,
  appointments,
  setAppointments,
}: IDeleteServiceProps) {
  const handleDelete = async () => {
    if (!selectedAppointment) return;

    try {
      const response = await deleteAppointment(selectedAppointment.id);

      if (!response || response.status !== 200) {
        myToast("Erro", "Falha ao excluir serviço");
        return;
      }

      const updatedAppointments = appointments
        ? appointments.filter(
            (appointment) => appointment.id !== selectedAppointment.id
          )
        : null;
      setAppointments(updatedAppointments);
      myToast("Sucesso", "Agendamento excluído com sucesso");
      setIsModalOpen(false);
    } catch (error) {
      myToast("Erro", "Falha ao excluir agendamento");
      console.log(error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o agendamento? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 hover:cursor-pointer"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

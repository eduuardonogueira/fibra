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
import { deleteService } from "@/hooks/useServices";
import { IServiceList } from "@/types/services";

interface IDeleteServiceProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (p: boolean) => void;
  services: IServiceList[] | null;
  currentService: IServiceList | null;
  setServices: React.Dispatch<React.SetStateAction<IServiceList[] | null>>;
}

export function DeleteService({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  currentService,
  services,
  setServices,
}: IDeleteServiceProps) {
  const handleDelete = async () => {
    if (!currentService) return;

    try {
      const response = await deleteService(currentService.id);

      if (!response || response.status !== 204) {
        myToast("Erro", "Falha ao excluir serviço");
        return;
      }

      const updatedServices = services
        ? services.filter((service) => service.id !== currentService.id)
        : null;
      setServices(updatedServices);
      myToast("Sucesso", "Serviço excluído com sucesso");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      myToast("Erro", "Falha ao excluir serviço");
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
            Tem certeza que deseja excluir o serviço ({currentService?.name})?
            Esta ação não pode ser desfeita.
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

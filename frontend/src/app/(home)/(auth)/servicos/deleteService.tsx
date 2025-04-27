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
import { IServiceList } from "@/types/services";
import { toast } from "sonner";

interface IDeleteServiceProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (p: boolean) => void;
  services: IServiceList[];
  currentService: IServiceList | null;
  setServices: React.Dispatch<React.SetStateAction<IServiceList[]>>;
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
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedServices = services.filter(
        (service) => service.id !== currentService.id
      );
      setServices(updatedServices);
      toast("Sucesso", {
        description: "Serviço excluído com sucesso",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Erro", {
        description: "Falha ao excluir serviço",
      });
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { MultiSelect } from "@/components/multiSelect";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IServiceForm, IServiceList } from "@/types/services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { myToast } from "@/components/myToast";
import { createService, getProfessionals } from "@/hooks/useApi";
import { IUser } from "@/types/users";
import { useEffect, useState } from "react";

interface ICreateOrUpdateServiceProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (p: boolean) => void;
  services: IServiceList[];
  setServices: React.Dispatch<React.SetStateAction<IServiceList[]>>;
  currentService: IServiceList | null;
  formData: IServiceForm;
  setFormData: React.Dispatch<React.SetStateAction<IServiceForm>>;
  isSubmitting: boolean;
  setIsSubmitting: (p: boolean) => void;
}

const professionals = [
  { id: "1", fullName: "Dra. Ana Silva" },
  { id: "2", fullName: "Dr. Carlos Mendes" },
  { id: "3", fullName: "Dra. Mariana Costa" },
  { id: "4", fullName: "Dr. Paulo Ribeiro" },
];

export function CreateOrUpdateService({
  isDialogOpen,
  setIsDialogOpen,
  services,
  setServices,
  currentService,
  formData,
  setFormData,
  isSubmitting,
  setIsSubmitting,
}: ICreateOrUpdateServiceProps) {
  const [professionals, setProfessionals] = useState<IUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const professionalsData = await getProfessionals();

        if (!professionalsData) {
          myToast("Erro", "Falha ao carregar os profissionais");
          return;
        }

        setProfessionals(professionalsData);
      } catch (error) {
        myToast("Erro", "Falha ao conectar com o servidor");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string[]) => {
    setFormData((prev) => ({ ...prev, usersId: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!professionals) return;

    try {
      if (
        !formData.name ||
        !formData.description ||
        !formData.usersId ||
        !formData.duration
      ) {
        myToast("Erro", "Todos os campos são obrigatórios");
        setIsSubmitting(false);
        return;
      }

      console.log(formData)
      const response = await createService(formData);

      const selectedUsers = professionals.filter((user) =>
        formData.usersId.includes(user.id)
      );

      if (currentService && response) {
        const updatedServices = services.map((service) =>
          service.id === currentService.id
            ? {
                ...service,
                name: formData.name,
                description: formData.description,
                duration: formData.duration,
                users: selectedUsers,
              }
            : service
        );
        setServices(updatedServices);
        myToast("Sucesso", "Serviço atualizado com sucesso");
      } else {
        const newService: IServiceList = {
          id: `${services.length + 1}`,
          name: formData.name,
          description: formData.description,
          duration: formData.duration,
          professionals: selectedUsers,
        };
        setServices([...services, newService]);
        myToast("Sucesso", "Serviço criado com sucesso");
      }

      setIsDialogOpen(false);
    } catch (error) {
      myToast(
        "Erro",
        currentService ? "Falha ao atualizar serviço" : "Falha ao criar serviço"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {currentService ? "Editar Serviço" : "Novo Serviço"}
          </DialogTitle>
          <DialogDescription>
            {currentService
              ? "Atualize as informações do serviço nos campos abaixo."
              : "Preencha os campos abaixo para criar um novo serviço."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Serviço</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Consulta Regular"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Duração do Serviço (minutos)</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    duration: parseInt(e.target.value),
                  }))
                }
                type="number"
                placeholder="Tempo em minutos"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva o serviço..."
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userId">Profissional Responsável</Label>
              {isLoading || !professionals ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Carregando profissionais...
                  </p>
                </div>
              ) : (
                <MultiSelect
                  options={professionals.map((user) => ({
                    value: user.id,
                    label: user.fullName,
                  }))}
                  selected={formData.usersId}
                  onChange={handleSelectChange}
                  placeholder="Selecione os profissionais"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="hover:cursor-pointer hover:bg-red-500"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="hover:cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {currentService ? "Atualizando..." : "Criando..."}
                </>
              ) : currentService ? (
                "Atualizar Serviço"
              ) : (
                "Criar Serviço"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

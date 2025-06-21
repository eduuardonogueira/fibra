import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getServices } from "@/hooks/useServices";
import { Briefcase, Loader2, Save, User, UserCheck } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getProfessionals } from "@/hooks/useProfessionals";
import { getCustomers } from "@/hooks/useCustomers";
import { myToast } from "@/components/myToast";
import { IServiceList } from "@/types/services";
import { IUser } from "@/types/users";
import { ICustomer } from "@/types/customers";
import { format } from "date-fns";
import { updateAppointment } from "@/hooks/useAppointments";
import {
  AppointmentStatus,
  IAppointmentsDetails,
  IFormatedAppointment,
} from "@/types/appointments";

interface IFormData {
  serviceId: string;
  customerId: string;
  userId: string;
  dateTime: string;
  status: string;
  observations: string;
}

interface IEditModalProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedAppointment: IAppointmentsDetails | null;
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  setAppointments: Dispatch<SetStateAction<IFormatedAppointment[] | null>>;
}

export default function EditModal({
  isEditDialogOpen,
  formData,
  selectedAppointment,
  setFormData,
  setIsEditDialogOpen,
  setAppointments,
}: IEditModalProps) {
  const [services, setServices] = useState<IServiceList[] | null>();
  const [professionals, setProfessionals] = useState<IUser[] | null>();
  const [customers, setCustomers] = useState<ICustomer[] | null>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const servicesResponse = await getServices();
        const professionalsResponse = await getProfessionals();
        const customersResponse = await getCustomers();

        if (!servicesResponse || !professionalsResponse || !customersResponse) {
          myToast("Erro", "Erro ao sincronizar dados");
          return;
        }

        setServices(servicesResponse.data);
        setProfessionals(professionalsResponse);
        setCustomers(customersResponse.data);
      } catch (error) {
        console.log(error);
        myToast("Erro", "Erro conectar com o servidor");
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !formData.customerId ||
        !formData.serviceId ||
        !formData.userId ||
        !formData.dateTime ||
        !formData.status ||
        !selectedAppointment
      ) {
        myToast("Erro", "Todos os campos obrigatórios devem ser preenchidos");
        setIsSubmitting(false);
        return;
      }

      const appointmentBody = {
        ...formData,
        dateTime: new Date(formData.dateTime),
        status: formData.status as AppointmentStatus,
      };
      const response = await updateAppointment(
        selectedAppointment.id,
        appointmentBody
      );

      console.log(appointmentBody);
      console.log(response);

      if (!response || !response.id) {
        myToast("Erro", "Erro ao atualizar dados do agendamento.");
        setIsSubmitting(false);
        return;
      }

      setAppointments((prev) =>
        prev
          ? prev.map((appointment) =>
              appointment.id === response.id ? response : appointment
            )
          : null
      );
      myToast("Sucesso", "Agendamento atualizado com sucesso!");
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
          <DialogDescription>
            Atualize as informações do agendamento nos campos abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="customerId">Cliente *</Label>
              {!customers ? (
                <span>Carregando clientes...</span>
              ) : (
                <Select
                  value={formData.customerId}
                  onValueChange={handleSelectChange("customerId")}
                  required
                >
                  <SelectTrigger className="hover:cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem
                        key={customer.id.toString()}
                        value={customer.id.toString()}
                        className="hover:cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>{customer.fullName}</span>
                          <Badge variant="outline" className="text-xs">
                            {customer.customerType?.name
                              ? customer.customerType.name
                              : "Sem tipo"}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="serviceId">Serviço *</Label>
                {!services ? (
                  <span>Carregando serviços...</span>
                ) : (
                  <Select
                    value={formData.serviceId}
                    onValueChange={handleSelectChange("serviceId")}
                    required
                  >
                    <SelectTrigger className="w-full hover:cursor-pointer">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id}
                          className="hover:cursor-pointer"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <span className="truncate">{service.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {service.duration}min
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="professionalId">Profissional *</Label>
                {!professionals ? (
                  <span>Carregando Profissionais...</span>
                ) : (
                  <Select
                    value={formData.userId}
                    onValueChange={handleSelectChange("professionalId")}
                    required
                  >
                    <SelectTrigger className="hover:cursor-pointer">
                      <UserCheck className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Selecione o profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionals.map((professional) => (
                        <SelectItem
                          className="hover:cursor-pointer"
                          key={professional.id}
                          value={professional.id}
                        >
                          {professional.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="dateTime">Data *</Label>
                <Input
                  id="dateTime"
                  name="dateTime"
                  type="datetime-local"
                  className="flex w-min hover:cursor-pointer"
                  value={format(formData.dateTime, "yyyy-MM-dd HH:mm")}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleSelectChange("status")}
                  required
                >
                  <SelectTrigger className="hover:cursor-pointer">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="hover:cursor-pointer"
                      value="SCHEDULED"
                    >
                      Agendado
                    </SelectItem>
                    <SelectItem
                      className="hover:cursor-pointer"
                      value="COMPLETED"
                    >
                      Completo
                    </SelectItem>
                    <SelectItem
                      className="hover:cursor-pointer"
                      value="DELAYED"
                    >
                      Atrasado
                    </SelectItem>
                    <SelectItem
                      className="hover:cursor-pointer"
                      value="CANCELED"
                    >
                      Cancelado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                name="observations"
                value={formData.observations}
                onChange={handleInputChange}
                placeholder="Informações adicionais sobre o agendamento..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="hover:cursor-pointer"
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
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

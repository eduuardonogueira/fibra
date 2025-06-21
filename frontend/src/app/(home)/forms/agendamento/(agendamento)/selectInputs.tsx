import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRegisterCustomerForm } from "../../../../../types/registerCustomerForm";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IServiceList } from "@/types/services";
import { ICustomerType } from "@/types/customerTypes";
import SelectDisabled from "@/components/selectDisabled";
import { myToast } from "@/components/myToast";
import { Loader2 } from "lucide-react";
import { getCustomerTypes } from "@/hooks/useCustomerTypes";
import { getServices } from "@/hooks/useServices";

interface ISelectInput extends IRegisterCustomerForm {
  selectedService: IServiceList | undefined;
  setSelectedService: Dispatch<SetStateAction<IServiceList | undefined>>;
  setSelectedProfessional: Dispatch<SetStateAction<string>>;
}

export default function SelectInputs({
  form,
  selectedService,
  setSelectedService,
  setSelectedProfessional,
}: ISelectInput) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerTypes, setCustomerTypes] = useState<
    ICustomerType[] | undefined
  >(undefined);
  const [services, setServices] = useState<IServiceList[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchCustomersTypesAndServices() {
      try {
        setIsLoading(true);
        const customerTypesData = await getCustomerTypes();
        const servicesResponse = await getServices({
          currentPage: 1,
          pageSize: 50,
        });

        if (!servicesResponse || !customerTypesData) return;

        const { data } = servicesResponse;

        setServices(data);
        setCustomerTypes(customerTypesData);
      } catch (error) {
        myToast("Erro", "Erro ao buscar tipos do paciente");

        myToast("Error", `${error}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCustomersTypesAndServices();
  }, []);

  function handleCustomerTypeChange(value: string) {
    form.setValue("customerType", value);
  }

  function handleServiceTypeChange(value: string) {
    form.setValue("service", value);
    const service = services?.find(
      (service) => service.id.toString() === value
    );
    setSelectedService(service);
    setSelectedProfessional("");
  }

  function handleProfessionalChange(value: string) {
    form.setValue("professionalId", value);
    setSelectedProfessional(value);
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Classificação</h3>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <FormField
          control={form.control}
          name="customerType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tipo do paciente:</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => handleCustomerTypeChange(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full hover:cursor-pointer">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {customerTypes?.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.id}
                        className="hover:cursor-pointer"
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="service"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Serviço:</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => handleServiceTypeChange(value)}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full hover:cursor-pointer">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {services?.map((type) => (
                    <SelectItem
                      key={type.id.toString()}
                      value={type.id.toString()}
                      className="hover:cursor-pointer"
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="professionalId"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Profissional:</FormLabel>
            {selectedService ? (
              <FormControl>
                <Select
                  onValueChange={(value) => handleProfessionalChange(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full hover:cursor-pointer">
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedService.professionals?.map((professional) => (
                      <SelectItem
                        key={professional.id.toString()}
                        value={professional.id.toString()}
                        className="hover:cursor-pointer"
                      >
                        {professional.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            ) : (
              <SelectDisabled text="Selecione um serviço" />
            )}
          </FormItem>
        )}
      />
    </div>
  );
}

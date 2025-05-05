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
import { IRegisterCustomerForm } from "../../../../types/registerCustomerForm";
import { mockCustomerTypes } from "../../(auth)/pacientes/editar/[id]/mock";
import { mockServices } from "./mock";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IServiceList } from "@/types/services";
import { ICustomerType } from "@/types/customerTypes";
import SelectDisabled from "@/components/selectDisabled";

interface ISelectInput extends IRegisterCustomerForm {
  selectedService: IServiceList | undefined;
  setSelectedService: Dispatch<SetStateAction<IServiceList | undefined>>;
  setSelectedProfessional: Dispatch<SetStateAction<string>>;
}

const initialCustomerTypes = mockCustomerTypes;
const initalServices = mockServices;

export default function SelectInputs({
  form,
  selectedService,
  setSelectedService,
  setSelectedProfessional,
}: ISelectInput) {
  const [customerTypes, setCustomersTypes] = useState<
    ICustomerType[] | undefined
  >(undefined);
  const [services, setServices] = useState<IServiceList[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchCustomersAndServices() {
      await new Promise((resolver) => setTimeout(resolver, 500));

      setCustomersTypes(initialCustomerTypes);
      setServices(initalServices);
    }

    fetchCustomersAndServices();
  }, []);

  function handleServiceTypeChange(value: string) {
    form.setValue("service", value);
    const service = services?.find((service) => service.id === value);
    console.log(value);
    setSelectedService(service);
  }

  function handleProfessionalChange(value: string) {
    form.setValue("professionalId", value);
    setSelectedProfessional(value);
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Classificação</h3>
      <FormField
        control={form.control}
        name="customerType"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Tipo do paciente:</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    {selectedService.professionals.map((professional) => (
                      <SelectItem
                        key={professional.id}
                        value={professional.id}
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

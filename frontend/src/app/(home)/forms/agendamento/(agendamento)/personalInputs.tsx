import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IRegisterCustomerForm } from "@/types/registerCustomerForm";

type IPersonalInputs = IRegisterCustomerForm;

export default function PersonalInputs({ form }: IPersonalInputs) {
  function handleAgeChange(value: string) {
    form.setValue("age", parseInt(value));
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Informações Pessoais</h3>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Nome completo:</FormLabel>
            <FormControl>
              <Input placeholder="Digite seu nome completo" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Telefone:</FormLabel>
            <FormControl>
              <Input placeholder="(+55) 91 98888-8888" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Idade:</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite sua idade"
                {...field}
                type="number"
                onChange={(e) => handleAgeChange(e.target.value)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import AddressInputs from "./addressInputs";
import PersonalInputs from "./personalInputs";
import SelectInputs from "./selectInputs";
import { CalendarInput } from "./calendarInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IServiceList } from "@/types/services";
import { createAppointment, createCustomer } from "@/hooks/useApi";
import { ICreateCustomer } from "@/types/customers";
import { Loader2 } from "lucide-react";
import { myToast } from "@/components/myToast";
import { useRouter } from "next/navigation";
import { CONFIRMATION_APPOINTMENT } from "@/constants/routes";

const formSchema = z.object({
  fullName: z.string().min(10).max(100),
  phone: z.string().min(11).max(20),
  age: z.number().int().nonnegative().min(1).max(120),
  address: z.string().min(20).max(200),
  customerType: z.string(),
  service: z.string(),
  professionalId: z.string(),
  dateTime: z.date().min(new Date()),
  observations: z.string().max(500).optional(),
});

export default function CardForm() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<
    IServiceList | undefined
  >(undefined);
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit({ ...values }: z.infer<typeof formSchema>) {
    setIsSubmiting(true);

    const formData = values;

    try {
      const {
        dateTime,
        observations,
        professionalId,
        service: serviceId,
        customerType,
        ...customerData
      } = formData;

      const createdCustomer: ICreateCustomer = {
        ...customerData,
        customerType: {
          id: customerType,
        },
      };
      const customerResponse = await createCustomer(createdCustomer);

      if (!customerResponse) {
        myToast("Erro", "Erro ao criar paciente, tente novamente mais tarde!");
        return;
      }

      const appointmentResponse = await createAppointment({
        status: "SCHEDULED",
        dateTime,
        observations,
        customerId: customerResponse.id.toString(),
        serviceId: serviceId,
        userId: professionalId,
      });

      if (!appointmentResponse) {
        myToast(
          "Erro",
          "Erro ao registrar seu agendamento, tente novamente mais tarde!"
        );
        return;
      }

      myToast("Sucesso", "Seu agendamento foi registrado com sucesso!");
      router.push(`${CONFIRMATION_APPOINTMENT}/${appointmentResponse.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-[1fr_auto_auto] align-middle gap-6 gap-y-8 w-full h-full"
      >
        <PersonalInputs form={form} />
        <AddressInputs form={form} />
        <SelectInputs
          form={form}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          setSelectedProfessional={setSelectedProfessional}
        />
        <CalendarInput
          form={form}
          selectedService={selectedService}
          selectedProfessional={selectedProfessional}
        />
        <Button
          className="w-full md:col-start-1 md:col-end-3 md:max-w-[500px] hover:cursor-pointer md:justify-self-center"
          type="submit"
          disabled={isSubmiting}
        >
          {isSubmiting ? <Loader2 className="animate-spin" /> : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}

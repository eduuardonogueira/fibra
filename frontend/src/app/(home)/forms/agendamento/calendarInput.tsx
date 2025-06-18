import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IRegisterCustomerForm } from "@/types/registerCustomerForm";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import SelectDisabled from "@/components/selectDisabled";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProfessionalCalendar } from "@/types/users";
import { IServiceList } from "@/types/services";
import { getProfessionalCalendar } from "@/hooks/useApi";
import { myToast } from "@/components/myToast";
import { useGetAvailableTimeSlots } from "@/hooks/useGetAvailableTimeSlots";
import { getAllDatesDisabled } from "@/hooks/useGetAllDatesDisabled";

interface ICalendarInput extends IRegisterCustomerForm {
  selectedService: IServiceList | undefined;
  selectedProfessional: string | undefined;
}

export function CalendarInput({
  form,
  selectedService,
  selectedProfessional,
}: ICalendarInput) {
  const [professionalCalendar, setProfessionalCalendar] = useState<
    IProfessionalCalendar | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    async function fetchScheduleDates() {
      if (!selectedService || !selectedProfessional) return;

      try {
        const response = await getProfessionalCalendar({
          userId: selectedProfessional,
          serviceId: selectedService.id,
        });

        if (!response) return;

        setProfessionalCalendar(response);
      } catch (error) {
        myToast("Error", "erro ao buscar agendamentos");
        console.log(error);
      }
    }

    resetDateAndHour();
    fetchScheduleDates();
  }, [selectedProfessional, selectedService]);

  function handleHourChange(selectedHour: string) {
    if (selectedDate) {
      const [hour, minutes] = selectedHour.split(":").map(Number);

      const dateAndHour = new Date(selectedDate);

      dateAndHour.setHours(hour, minutes, 0, 0);

      dateAndHour.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      form.setValue("dateTime", dateAndHour);
    }
  }

  function resetDateAndHour() {
    setSelectedDate(undefined);
    form.unregister("dateTime");
  }

  const daysOff = professionalCalendar?.dayOffs?.map(
    (day) => new Date(day.dayOff)
  );
  const journey = professionalCalendar?.expedient?.filter(
    (workSchedule) => workSchedule.weekday === selectedDate?.getDay()
  );
  const appointments = professionalCalendar?.appointments?.filter(
    (appointment) =>
      new Date(appointment.dateTime).getDate() === selectedDate?.getDate()
  );
  const breaks = professionalCalendar?.timeOffs?.filter(
    (timeOff) =>
      new Date(timeOff.startDateTime).getDate() === selectedDate?.getDate()
  );

  const availableTimeSlots = useGetAvailableTimeSlots(
    journey,
    appointments,
    breaks,
    selectedService?.duration
  );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Agendamento</h3>
      <Label className="flex flex-col gap-2 items-start">
        Data:
        {!selectedProfessional || professionalCalendar ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal hover:cursor-pointer"
                disabled={!selectedProfessional || !professionalCalendar}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: ptBR })
                ) : (
                  <span>Escolha uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                required
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                disabled={(date) =>
                  getAllDatesDisabled(
                    date,
                    daysOff,
                    professionalCalendar?.expedient
                  )
                }
              />
            </PopoverContent>
          </Popover>
        ) : (
          <SelectDisabled text="Carregando datas disponíveis" />
        )}
      </Label>
      <Label className="flex flex-col gap-2 items-start">
        Horário:
        {!selectedDate ? (
          <SelectDisabled text="Selecione uma data" />
        ) : availableTimeSlots && availableTimeSlots.length > 0 ? (
          <Select onValueChange={(value) => handleHourChange(value)} required>
            <SelectTrigger className="w-full hover:cursor-pointer">
              <SelectValue placeholder="Escolha um horário" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots?.map((hour) => (
                <SelectItem
                  key={hour}
                  value={hour}
                  className="hover:cursor-pointer"
                >
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <SelectDisabled text="Essa data não possui horários disponíveis" />
        )}
      </Label>
    </div>
  );
}

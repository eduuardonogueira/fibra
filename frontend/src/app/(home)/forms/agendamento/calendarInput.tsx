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
import { IExpedient } from "@/types/expedient";
import { ITimeOff } from "@/types/timeOff";
import { getProfessionalCalendar } from "@/hooks/useApi";
import { myToast } from "@/components/myToast";

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

  function getAvailableTimeSlots(
    journey: IExpedient[] | undefined,
    appointments: { id: string; dateTime: string }[] | undefined,
    breaks: ITimeOff[] | undefined,
    durationMinutes: number | undefined
  ): string[] | undefined {
    if (!journey || !durationMinutes) return undefined;

    const availableTime: string[] = journey.reduce((array: string[], time) => {
      const { startTime, endTime } = time;
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const start = new Date();
      start.setHours(startHour, startMinute, 0, 0);

      const end = new Date();
      end.setHours(endHour, endMinute, 0, 0);

      while (start.getTime() + durationMinutes * 60000 <= end.getTime()) {
        const hh = String(start.getHours()).padStart(2, "0");
        const mm = String(start.getMinutes()).padStart(2, "0");
        array.push(`${hh}:${mm}`);
        start.setMinutes(start.getMinutes() + durationMinutes);
      }

      return array;
    }, []);

    const appointmentsHours = appointments?.map((appointment) => {
      const dateTime = new Date(appointment.dateTime);
      const hour = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    });

    const breaksHours = breaks?.map((time) => {
      const startDateTime = new Date(time.startDateTime);
      const endDateTime = new Date(time.endDateTime);

      const startHour = startDateTime.getHours();
      const startMinutes = startDateTime.getMinutes();

      const endHour = endDateTime.getHours();
      const endMinutes = endDateTime.getMinutes();

      return {
        startBreak: `${String(startHour).padStart(2, "0")}:${String(
          startMinutes
        ).padStart(2, "0")}`,
        endbreak: `${String(endHour).padStart(2, "0")}:${String(
          endMinutes
        ).padStart(2, "0")}`,
      };
    });

    const availableTimeWithAppointments = appointmentsHours
      ? availableTime.filter((time) => !appointmentsHours.includes(time))
      : availableTime;

    const availableTimeWithBreaks = breaksHours
      ? availableTimeWithAppointments.filter((time) => {
          const [hour, minute] = time.split(":").map(Number);
          const current = hour * 60 + minute;

          const isInPause = breaksHours.some(({ startBreak, endbreak }) => {
            const [startH, startM] = startBreak.split(":").map(Number);
            const [endH, endM] = endbreak.split(":").map(Number);
            const start = startH * 60 + startM;
            const end = endH * 60 + endM;

            return current >= start && current < end;
          });

          return !isInPause;
        })
      : availableTimeWithAppointments;

    return availableTimeWithBreaks;
  }

  function getAllDatesDisabled(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isWeekend = [0, 6].includes(date.getDay());
    const isBeforeToday = date < today;

    const isDayOff = Array.isArray(daysOff)
      ? daysOff.some((d) => {
          const off = new Date(d);
          return (
            off.getFullYear() === date.getFullYear() &&
            off.getMonth() === date.getMonth() &&
            off.getDate() === date.getDate()
          );
        })
      : false;

    return isBeforeToday || isWeekend || isDayOff;
  }

  const availableTimeSlots = getAvailableTimeSlots(
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal hover:cursor-pointer"
              disabled={!selectedProfessional}
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
              disabled={(date) => getAllDatesDisabled(date)}
            />
          </PopoverContent>
        </Popover>
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

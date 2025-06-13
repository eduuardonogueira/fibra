import { IExpedient } from "@/types/expedient";
import { ITimeOff } from "@/types/timeOff";

export function useGetAvailableTimeSlots(
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

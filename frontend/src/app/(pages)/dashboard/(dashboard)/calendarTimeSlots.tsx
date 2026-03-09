import { IFormatedAppointment } from "@/types/appointments";
import AppointmentCard from "./appointmentCard";
import { timeSlots } from "./mock";

interface ICalendarTimeSlotsProps {
  weekDays: Date[];
  openAppointmentDetails: (appointment: IFormatedAppointment) => void;
  getAppointmentsForSlot: (
    day: Date,
    timeSlot: string
  ) => IFormatedAppointment[] | undefined;
}

export default function CalendarTimeSlots({
  weekDays,
  openAppointmentDetails,
  getAppointmentsForSlot,
}: ICalendarTimeSlotsProps) {
  return (
    <>
      {timeSlots.map((timeSlot) => (
        <div key={timeSlot} className="grid grid-cols-8 border-b min-h-[80px]">
          <div className="p-4 text-center bg-muted border-r font-medium text-sm">
            {timeSlot}
          </div>
          {weekDays.map((day) => {
            const dayAppointments = getAppointmentsForSlot(day, timeSlot);
            return (
              <div
                key={`${day.toString()}-${timeSlot}`}
                className="p-2 border-l space-y-1"
              >
                {dayAppointments?.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onClick={() => openAppointmentDetails(appointment)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

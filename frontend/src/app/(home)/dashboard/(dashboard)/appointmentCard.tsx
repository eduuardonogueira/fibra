import { IFormatedAppointment } from "@/types/appointments";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface IAppointmentCardProps {
  appointment: IFormatedAppointment;
  onClick: () => void;
}

export default function AppointmentCard({
  appointment,
  onClick,
}: IAppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "border-l-green-500 bg-green-50";
      case "pendente":
        return "border-l-yellow-500 bg-yellow-50";
      case "completo":
        return "border-l-blue-500 bg-blue-50";
      case "cancelado":
        return "border-l-red-500 bg-red-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const getEndTime = () => {
    const startTime = new Date(appointment.dateTime);
    const endTime = new Date(startTime).setMinutes(
      startTime.getMinutes() + appointment.service.duration
    );
    return endTime;
  };

  return (
    <div
      className={`p-2 rounded-md border-l-4 cursor-pointer hover:shadow-sm transition-shadow text-xs ${getStatusColor(
        appointment.status
      )}`}
      onClick={onClick}
    >
      <div className="font-medium truncate">
        {appointment.customer.fullName}
      </div>
      <div className="text-muted-foreground truncate">
        {appointment.service.name}
      </div>
      <div className="flex items-center gap-1 mt-1">
        <Clock className="h-3 w-3" />
        <span>
          {format(appointment.dateTime, "HH:mm")} -{" "}
          {format(getEndTime(), "HH:mm")}
        </span>
      </div>
    </div>
  );
}

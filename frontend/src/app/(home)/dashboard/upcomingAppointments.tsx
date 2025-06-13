import StatusBadge from "@/components/statusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  APPOINTMENTS_ROUTE,
  CONFIRMATION_APPOINTMENT,
} from "@/constants/routes";
import { format } from "date-fns";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

interface IUpcomingAppointmentsProps {
  upcomingAppointments: {
    id: number;
    customerName: string;
    dateTime: Date;
    professional: string;
    serviceType: string;
    status: string;
  }[];
}

export default function UpcomingAppointments({
  upcomingAppointments,
}: IUpcomingAppointmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Próximos Agendamentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary">
                {appointment.customerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{appointment.customerName}</p>
                <StatusBadge status={appointment.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                {appointment.serviceType}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {format(appointment.dateTime, "HH:mm")} •{" "}
                  {appointment.professional}
                </p>
                <Link href={`${CONFIRMATION_APPOINTMENT}/${appointment.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 hover:cursor-pointer"
                  >
                    <ArrowUpRight className="h-3 w-3" />
                    <span className="sr-only">Ver detalhes</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Link href={APPOINTMENTS_ROUTE} className="w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:cursor-pointer"
          >
            Ver Todos os Agendamentos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

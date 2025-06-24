"use client";

import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  OctagonAlert,
} from "lucide-react";

import StatisticsProgress from "@/components/statisticsProgress";
import HeatmapCalendar from "./heatmapCalendar";
import AppointmentsStatistics from "./appointmentsStatistics";
import UpcomingAppointments from "./upcomingAppointments";
import ClientDistribution from "./clientDistribution";
import { use, useEffect } from "react";
import { myToast } from "@/components/myToast";
import { IStatistics } from "@/types/dashboard";

interface IPageContentProps {
  statsPromise: Promise<IStatistics | null>;
}

export default function PageContent({ statsPromise }: IPageContentProps) {
  const stats = use(statsPromise);

  useEffect(() => {
    myToast(
      "Atenção",
      "Estes dados não são reais, somente valores simbólicos",
      { icon: <OctagonAlert color="red" />, position: "top-center" }
    );
  }, []);

  if (!stats) {
    return <div>Erro ao carregar o Dashboard</div>;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatisticsProgress
          title="Total de Agendamentos"
          statistics={1248}
          Icon={Calendar}
          iconClassName="text-primary"
          iconBackgroundClassName="bg-primary/10"
        />

        <StatisticsProgress
          title="Clientes Cadastrados"
          statistics={stats.totalClients}
          Icon={Users}
          iconClassName="text-blue-600"
          iconBackgroundClassName="bg-blue-100"
        />

        <StatisticsProgress
          title="Taxa de Conclusão"
          statistics={`${Math.round(
            (stats.completedAppointments / stats.totalAppointments) * 100
          )}%`}
          Icon={CheckCircle}
          iconClassName="text-green-600"
          iconBackgroundClassName="bg-green-100"
          progressValue={Math.round(
            (stats.completedAppointments / stats.totalAppointments) * 100
          )}
        />

        <StatisticsProgress
          title="Taxa de Cancelamento"
          statistics={`${Math.round(
            (stats.canceledAppointments / stats.totalAppointments) * 100
          )}%`}
          Icon={XCircle}
          iconClassName="text-red-600"
          iconBackgroundClassName="bg-red-100"
          progressValue={Math.round(
            (stats.canceledAppointments / stats.totalAppointments) * 100
          )}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <AppointmentsStatistics
            appointmentsByProfessional={stats.appointmentsByProfessional}
            appointmentsByStatus={stats.appointmentsByStatus}
            appointmentsByService={stats.appointmentsByService}
            totalAppointments={stats.totalAppointments}
          />
          <HeatmapCalendar monthlyAppointments={stats.monthlyAppointments} />
        </div>

        <div className="space-y-8">
          <UpcomingAppointments
            upcomingAppointments={stats.upcomingAppointments}
          />

          <ClientDistribution
            clientsByType={stats.clientsByType}
            totalClients={stats.totalClients}
          />
        </div>
      </div>
    </>
  );
}

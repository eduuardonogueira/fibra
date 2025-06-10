"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { mockStats } from "./mock";
import StatisticsProgress from "@/components/statisticsProgress";
import PageHeader from "./pageHeader";
import HeatmapCalendar from "./heatmapCalendar";
import AppointmentsStatistics from "./appointmentsStatistics";
import UpcomingAppointments from "./upcomingAppointments";
import ClientDistribution from "./clientDistribution";
import QuickLinks from "./quickLinks";

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStats(mockStats);
      } catch (error) {
        console.error("Failed to fetch statistics", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Card className="p-6 gap-0">
        <PageHeader />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatisticsProgress
            title="Total de Agendamentos"
            statistics="1248"
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

            <QuickLinks />
          </div>
        </div>
      </Card>
    </div>
  );
}


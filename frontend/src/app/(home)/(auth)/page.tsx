"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Users,
  FileText,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  Bell,
  Plus,
  BarChart3,
  CalendarClock,
  UserPlus,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { mockStats } from "./mock";
import StatusBadge from "@/components/statusBadge";
import StatisticsProgress from "@/components/statisticsProgress";

// Activity icon component
const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "appointment_created":
      return <Plus className="h-4 w-4 text-green-500" />;
    case "appointment_completed":
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    case "appointment_canceled":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "client_registered":
      return <UserPlus className="h-4 w-4 text-purple-500" />;
    case "service_updated":
      return <FileText className="h-4 w-4 text-amber-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

// Format relative time
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Agora mesmo";
  if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h atrás`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d atrás`;
};

export default function HomePage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth] = useState(new Date());

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

  // Generate calendar days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get appointment count for a specific day
  const getAppointmentCountForDay = (day: Date) => {
    if (!stats) return 0;
    const appointment = stats.monthlyAppointments.find((a: any) =>
      isSameDay(a.date, day)
    );
    return appointment ? appointment.count : 0;
  };

  // Calculate max appointments in a day for the heatmap scale
  const maxAppointments =
    stats?.monthlyAppointments.reduce(
      (max: number, day: any) => (day.count > max ? day.count : max),
      0
    ) || 0;

  // Get color intensity based on appointment count
  const getColorIntensity = (count: number) => {
    if (count === 0) return "bg-gray-100";
    const intensity = Math.min(
      Math.floor((count / maxAppointments) * 5) + 1,
      5
    );
    return `bg-blue-${intensity}00`;
  };

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
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao Sistema de Agendamentos
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/agendar">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </Link>
          <Link href="/cadastrar-cliente">
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatisticsProgress
          title="Total de Agendamentos"
          statistics={1248}
          Icon={Calendar}
          progressValue={100}
        />

        <StatisticsProgress
          title="Clientes Cadastrados"
          statistics={stats.totalClients}
          Icon={Users}
          progressValue={100}
        />

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Taxa de Conclusão
                </p>
                <p className="text-3xl font-bold">
                  {Math.round(
                    (stats.completedAppointments / stats.totalAppointments) *
                      100
                  )}
                  %
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress
                value={
                  (stats.completedAppointments / stats.totalAppointments) * 100
                }
                className="h-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Taxa de Cancelamento
                </p>
                <p className="text-3xl font-bold">
                  {Math.round(
                    (stats.canceledAppointments / stats.totalAppointments) * 100
                  )}
                  %
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress
                value={
                  (stats.canceledAppointments / stats.totalAppointments) * 100
                }
                className="h-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Tabs for different statistics */}
          <Tabs defaultValue="status">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Estatísticas de Agendamentos
                  </CardTitle>
                  <TabsList>
                    <TabsTrigger value="status">Status</TabsTrigger>
                    <TabsTrigger value="service">Serviços</TabsTrigger>
                    <TabsTrigger value="professional">
                      Profissionais
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="status" className="mt-0">
                  <div className="space-y-4">
                    {Object.entries(stats.appointmentsByStatus).map(
                      ([status, count]: [string, any]) => (
                        <div key={status} className="flex items-center">
                          <div className="w-36 flex items-center">
                            <StatusBadge status={status} />
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="h-3 rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full ${
                                  status === "confirmado"
                                    ? "bg-green-500"
                                    : status === "pendente"
                                    ? "bg-yellow-500"
                                    : status === "completo"
                                    ? "bg-blue-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${
                                    (count / stats.totalAppointments) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-12 text-right text-sm">{count}</div>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="service" className="mt-0">
                  <div className="space-y-4">
                    {Object.entries(stats.appointmentsByService).map(
                      ([service, count]: [string, any]) => (
                        <div key={service} className="flex items-center">
                          <div className="w-48 truncate text-sm">{service}</div>
                          <div className="flex-1 mx-4">
                            <div className="h-3 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{
                                  width: `${
                                    (count / stats.totalAppointments) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-12 text-right text-sm">{count}</div>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="professional" className="mt-0">
                  <div className="space-y-4">
                    {Object.entries(stats.appointmentsByProfessional).map(
                      ([professional, count]: [string, any]) => (
                        <div key={professional} className="flex items-center">
                          <div className="w-48 truncate text-sm">
                            {professional}
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="h-3 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{
                                  width: `${
                                    (count / stats.totalAppointments) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-12 text-right text-sm">{count}</div>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          {/* Calendar Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                Distribuição de Agendamentos -{" "}
                {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                  (day) => (
                    <div
                      key={day}
                      className="font-medium text-muted-foreground py-1"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-1">
                {calendarDays.map((day) => {
                  const count = getAppointmentCountForDay(day);
                  const colorClass =
                    count === 0
                      ? "bg-gray-100"
                      : `bg-blue-${Math.min(
                          Math.floor((count / maxAppointments) * 5) + 1,
                          5
                        )}00`;

                  return (
                    <div
                      key={day.toString()}
                      className={`aspect-square rounded-md flex items-center justify-center text-xs ${colorClass} ${
                        count > 0 ? "text-white" : "text-gray-500"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{format(day, "d")}</span>
                        {count > 0 && (
                          <span className="text-[10px]">{count}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Menos</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  </div>
                  <span>Mais</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Anúncios e Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.announcements.map((announcement: any) => (
                <Card
                  key={announcement.id}
                  className={`border-l-4 ${
                    announcement.priority === "high"
                      ? "border-l-red-500"
                      : announcement.priority === "medium"
                      ? "border-l-amber-500"
                      : "border-l-blue-500"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {announcement.content}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {format(announcement.date, "dd/MM/yyyy")}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Ver Todos os Anúncios
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Próximos Agendamentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.upcomingAppointments.map((appointment: any) => (
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
                      <Link href={`/confirmacao/${appointment.id}`}>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
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
              <Link href="/" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Todos os Agendamentos
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.recentActivity.map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex gap-3 pb-3 border-b last:border-0 last:pb-0"
                >
                  <div className="mt-0.5">
                    <div className="bg-muted rounded-full p-1">
                      <ActivityIcon type={activity.type} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{formatRelativeTime(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Ver Todas as Atividades
              </Button>
            </CardFooter>
          </Card>

          {/* Client Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5" />
                Distribuição de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.clientsByType).map(
                  ([type, count]: [string, any]) => {
                    const percentage = Math.round(
                      (count / stats.totalClients) * 100
                    );
                    const typeLabels = {
                      adulto: "Adulto",
                      mirim: "Mirim",
                      familiar: "Familiar",
                    };
                    const typeColors = {
                      adulto: "bg-gray-500",
                      mirim: "bg-purple-500",
                      familiar: "bg-amber-500",
                    };

                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {typeLabels[type as keyof typeof typeLabels]}
                          </span>
                          <span className="font-medium">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full ${
                              typeColors[type as keyof typeof typeColors]
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Acesso Rápido</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Link href="/agendar">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar
                </Button>
              </Link>
              <Link href="/clientes">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Clientes
                </Button>
              </Link>
              <Link href="/servicos">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Serviços
                </Button>
              </Link>
              <Link href="/profissionais">
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Profissionais
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


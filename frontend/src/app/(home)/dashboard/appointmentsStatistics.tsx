import StatusBadge from "@/components/statusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";

interface IAppointmentsStatisticsProps {
  appointmentsByProfessional: Record<string, number>;
  appointmentsByStatus: Record<string, number>;
  appointmentsByService: Record<string, number>;
  totalAppointments: number;
}

export default function AppointmentsStatistics({
  appointmentsByProfessional,
  appointmentsByStatus,
  appointmentsByService,
  totalAppointments,
}: IAppointmentsStatisticsProps) {
  return (
    <Tabs defaultValue="status">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-y-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estatísticas de Agendamentos
            </CardTitle>
            <TabsList className="m-auto md:m-0">
              <TabsTrigger className="hover:cursor-pointer" value="status">
                Status
              </TabsTrigger>
              <TabsTrigger className="hover:cursor-pointer" value="service">
                Serviços
              </TabsTrigger>
              <TabsTrigger
                className="hover:cursor-pointer"
                value="professional"
              >
                Profissionais
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="status" className="mt-0">
            <div className="space-y-4">
              {Object.entries(appointmentsByStatus).map(
                ([status, count]: [string, number]) => (
                  <div key={status} className="flex items-center">
                    <div className="flex items-center">
                      <StatusBadge status={status} />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${
                            status === "SCHEDULED"
                              ? "bg-green-500"
                              : status === "DELAYED"
                              ? "bg-yellow-500"
                              : status === "COMPLETED"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${(count / totalAppointments) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right text-sm">{count}</div>
                  </div>
                )
              )}
            </div>
          </TabsContent>
          <TabsContent value="service" className="mt-0">
            <div className="space-y-4">
              {Object.entries(appointmentsByService).map(
                ([service, count]: [string, number]) => (
                  <div key={service} className="flex items-center">
                    <div className="truncate text-sm">{service}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(count / totalAppointments) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right text-sm">{count}</div>
                  </div>
                )
              )}
            </div>
          </TabsContent>
          <TabsContent value="professional" className="mt-0">
            <div className="space-y-4">
              {Object.entries(appointmentsByProfessional).map(
                ([professional, count]: [string, number]) => (
                  <div key={professional} className="flex items-center">
                    <div className="truncate text-sm">{professional}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${(count / totalAppointments) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right text-sm">{count}</div>
                  </div>
                )
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

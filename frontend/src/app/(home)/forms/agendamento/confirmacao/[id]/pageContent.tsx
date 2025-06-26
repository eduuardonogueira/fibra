"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Briefcase,
  UserCheck,
  ArrowLeft,
  Printer,
  Mail,
  Notebook,
  CircleAlert,
  CircleHelp,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { myToast } from "@/components/myToast";
import StatusBadge from "@/components/statusBadge";
import { DASHBOARD_ROUTE, SCHEDULE_APPOINTMENT } from "@/constants/routes";
import { CustomerTypeBadge } from "@/components/customerTypeBadge";
import { IFormatedAppointment } from "@/types/appointments";
import {
  address,
  email,
  location,
  openingHours,
  phone,
} from "@/constants/localInformations";
import Image from "next/image";

interface IPageContentProps {
  isLogged: boolean;
  appointmentPromise: Promise<IFormatedAppointment | null>;
  children: React.ReactNode;
}

export default function PageContent({
  isLogged,
  appointmentPromise,
  children,
}: IPageContentProps) {
  const router = useRouter();
  const appointment = use(appointmentPromise);

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    myToast("Email enviado", "Confirmação enviada para o email do cliente");
  };

  if (!appointment) return children;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <section className="flex items-center justify-center gap-4 mb-8 flex-wrap">
        <Image width={100} height={100} src="/logo.png" alt="logo" />

        <div className="text-center">
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-1">
            <h1 className="w-auto text-2xl md:text-4xl font-bold text-green-600 text-nowrap">
              Agendamento Confirmado!
            </h1>
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className=" h-4 w-4 md:h-8 md:w-8 text-green-600" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Seu agendamento foi realizado com sucesso. Confira os detalhes
            abaixo.
          </p>
        </div>
      </section>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Detalhes do Agendamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Data
                  </p>
                  <p className="text-lg">
                    {format(
                      appointment.dateTime,
                      "EEEE, dd 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Horário
                  </p>
                  <p className="text-lg">
                    {format(appointment.dateTime, "HH:mm")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Duração: {appointment.service.duration} minutos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Local
                  </p>
                  <p className="text-lg">{location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Serviço
                  </p>
                  <p className="text-lg">{appointment.service.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Profissional
                  </p>
                  <p className="text-lg">{appointment.professional.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Status
                  </p>
                  <StatusBadge status={appointment.status} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Nome Completo
                </p>
                <p className="text-lg">{appointment.customer.fullName}</p>
              </div>

              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Idade
                </p>
                <p>{appointment.customer.age} anos</p>
              </div>

              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Tipo de Cliente
                </p>
                <CustomerTypeBadge
                  type={appointment.customer.customerType.name}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Telefone
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {appointment.customer.phone}
                </p>
              </div>

              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Endereço
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{appointment.customer.address}</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {appointment.observations && (
        <Card className="mb-6 gap-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Notebook className="h-5 w-5" />
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{appointment.observations}</p>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6 border-amber-200 bg-amber-50 gap-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <CircleAlert className="h-5 w-5" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700">
          <ul className="space-y-2">
            <li>• Chegue com 15 minutos de antecedência</li>
            <li>• Traga um documento de identificação</li>
            <li>
              • Em caso de cancelamento, avise com pelo menos 24 horas de
              antecedência
            </li>
            <li>• Para reagendamento, entre em contato conosco</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => router.push(SCHEDULE_APPOINTMENT)}
          className="hover:cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Realizar outro agendamento
        </Button>

        {isLogged ? (
          <Button
            variant="outline"
            className="hover:cursor-pointer"
            onClick={() => router.push(DASHBOARD_ROUTE)}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Ir para Dashboard
          </Button>
        ) : (
          ""
        )}

        <Button
          variant="outline"
          onClick={handlePrint}
          className="hover:cursor-pointer"
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>

        <Button onClick={handleSendEmail} className="hover:cursor-pointer" >
          <Mail className="mr-2 h-4 w-4" />
          Enviar por Email
        </Button>
      </div>

      <Card className="mt-8 gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleHelp className="h-5 w-5" />
            Precisa de Ajuda?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-medium">Telefone</p>
              <p className="text-muted-foreground">{phone}</p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{email}</p>
            </div>
            <div>
              <p className="font-medium">Horário de Atendimento</p>
              <p className="text-muted-foreground">{openingHours}</p>
            </div>
            <div>
              <p className="font-medium">Endereço</p>
              <p className="text-muted-foreground">{address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

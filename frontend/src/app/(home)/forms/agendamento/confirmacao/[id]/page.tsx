"use client";

import { useState, useEffect } from "react";
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
  Edit,
  Printer,
  Mail,
  Loader2,
  Notebook,
  CircleAlert,
  CircleHelp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { myToast } from "@/components/myToast";
import StatusBadge from "@/components/statusBadge";
import {
  SCHEDULE_APPOINTMENT,
  UPDATE_CUSTOMER_ROUTE,
} from "@/constants/routes";
import { CustomerTypeBadge } from "@/components/customerTypeBadge";
import { IFormatedAppointment } from "@/types/appointments";
import { getAppointmentById } from "@/hooks/useAppointments";
import {
  address,
  email,
  location,
  openingHours,
  phone,
} from "@/constants/localInformations";

export default function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [appointment, setAppointment] = useState<IFormatedAppointment | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      const { id } = await params;
      try {
        const response = await getAppointmentById(id);

        if (response) {
          setAppointment(response);
        } else {
          myToast("Erro", "Agendamento não encontrado");
          router.push(SCHEDULE_APPOINTMENT);
        }
      } catch (error) {
        console.log(error);
        myToast("Erro", "Falha ao carregar informações do agendamento");
        router.push(SCHEDULE_APPOINTMENT);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointment();
  }, [params, router, myToast]);

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    myToast("Email enviado", "Confirmação enviada para o email do cliente");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando confirmação...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Agendamento não encontrado</CardTitle>
            <CardDescription>
              Não foi possível encontrar o agendamento solicitado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Agendamentos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Agendamento Confirmado!
        </h1>
        <p className="text-muted-foreground text-lg">
          Seu agendamento foi realizado com sucesso. Confira os detalhes abaixo.
        </p>
      </div>

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

        <Link href={`${UPDATE_CUSTOMER_ROUTE}/${appointment.customer.id}`}>
          <Button variant="outline" className="hover:cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Editar Informações
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={handlePrint}
          className="hover:cursor-pointer"
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>

        <Button onClick={handleSendEmail} className="hover:cursor-pointer">
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

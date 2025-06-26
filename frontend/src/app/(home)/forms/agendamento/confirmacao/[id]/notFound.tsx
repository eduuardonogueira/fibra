"use server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DASHBOARD_ROUTE, SCHEDULE_APPOINTMENT } from "@/constants/routes";
import { validate } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
  const isLogged = await validate();
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
          <Link href={isLogged ? DASHBOARD_ROUTE : SCHEDULE_APPOINTMENT}>
            <Button className="hover:cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Agendamentos
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

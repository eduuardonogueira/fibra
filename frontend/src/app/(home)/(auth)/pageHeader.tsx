import { Button } from "@/components/ui/button";
import { APPOINTMENTS_ROUTE, CREATE_CUSTOMER_ROUTE } from "@/constants/routes";
import { Calendar, UserPlus2Icon } from "lucide-react";
import Link from "next/link";

export default function PageHeader() {
  return (
    <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao Sistema de Agendamentos
        </p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Link href={APPOINTMENTS_ROUTE} className="w-full sm:w-fit">
          <Button className="w-full hover:cursor-pointer">
            <Calendar className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </Link>
        <Link href={CREATE_CUSTOMER_ROUTE} className="w-full sm:w-fit">
          <Button
            variant="outline"
            className="w-full hover:cursor-pointer"
          >
            <UserPlus2Icon className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>
    </div>
  );
}

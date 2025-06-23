import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CUSTOMERS_ROUTE } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function NotFoundCustomer() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Paciente não encontrado</CardTitle>
          <CardDescription>
            Não foi possível encontrar o paciente solicitado.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={CUSTOMERS_ROUTE} >
            <Button className="hover:cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Pacientes
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

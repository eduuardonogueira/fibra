import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PROFESSIONALS_ROUTE } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function NotFoundProfessional() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Usuário não encontrado</CardTitle>
          <CardDescription>
            Não foi possível encontrar o usuário solicitado.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={PROFESSIONALS_ROUTE}>
            <Button className="hover:cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Profissionais
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

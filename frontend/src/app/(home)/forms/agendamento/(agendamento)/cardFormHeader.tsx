"use server";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DASHBOARD_ROUTE } from "@/constants/routes";
import { validate } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CardFormHeader() {
  const isLogged = await validate();
  return (
    <CardHeader className="flex items-center gap-4">
      {isLogged ? (
        <Link href={DASHBOARD_ROUTE} className="h-min">
          <Button
            className="hover:cursor-pointer"
            type="button"
            variant={"outline"}
            size={"icon"}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
      ) : (
        ""
      )}
      <div>
        <CardTitle className="text-2xl font-bold">
          Cadastro do Paciente
        </CardTitle>
        <CardDescription>Insira suas informações</CardDescription>
      </div>
    </CardHeader>
  );
}

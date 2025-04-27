"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function FormHeader() {
  const router = useRouter();
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Button
          className="hover:cursor-pointer"
          variant={"outline"}
          size={"icon"}
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Voltar</span>
        </Button>
        <div>
          <CardTitle className="text-2xl">
            Editar Informações do Paciente
          </CardTitle>
          <CardDescription>
            Atualize os dados cadastrais do paciente
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  );
}

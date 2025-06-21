"use server";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CardFormHeader() {
  return (
    <CardHeader>
      <div>
        <CardTitle className="text-2xl font-bold">
          Cadastro do Paciente
        </CardTitle>
        <CardDescription>Insira suas informações</CardDescription>
      </div>
    </CardHeader>
  );
}

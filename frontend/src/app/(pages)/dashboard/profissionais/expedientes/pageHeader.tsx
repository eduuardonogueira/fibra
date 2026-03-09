"use server";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PageHeader() {
  return (
    <CardHeader>
      <CardTitle className="text-2xl">Profissionais e Expedientes</CardTitle>
      <CardDescription>
        Gerencie os horários de trabalho dos profissionais por serviço
      </CardDescription>
    </CardHeader>
  );
}

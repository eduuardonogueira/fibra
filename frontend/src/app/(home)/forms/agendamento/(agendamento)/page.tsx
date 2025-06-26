"use server";

import { Card, CardContent } from "@/components/ui/card";
import CardFormHeader from "./cardFormHeader";
import CardForm from "./cardForm";

export default async function CreatAppointmentPage() {
  return (
    <div className="container mx-auto flex w-full h-full max-w-[1000px] items-center py-8 px-4">
      <Card className="w-full h-full">
        <CardFormHeader />
        <CardContent>
          <CardForm />
        </CardContent>
      </Card>
    </div>
  );
}

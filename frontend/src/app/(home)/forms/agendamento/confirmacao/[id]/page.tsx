"use server";
import { validate } from "@/hooks/useAuth";
import PageContent from "./pageContent";
import { getAppointmentById } from "@/hooks/useAppointments";
import { Suspense } from "react";
import NotFound from "./notFound";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isLogged = await validate();
  const { id } = await params;
  const appointmentPromise = getAppointmentById(id);

  return (
    <Suspense>
      <PageContent appointmentPromise={appointmentPromise} isLogged={isLogged}>
        <NotFound />
      </PageContent>
    </Suspense>
  );
}

"use server";

import { validate, getAppointmentById } from "@/api/index";
import PageContent from "./pageContent";
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


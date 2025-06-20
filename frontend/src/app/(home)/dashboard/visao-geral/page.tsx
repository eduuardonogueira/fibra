"use server";

import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { getStatistics } from "@/hooks/useDashboard";

import Loader from "@/components/loader";
import PageContent from "./pageContent";
import QuickLinks from "./quickLinks";
import DashboardPageHeader from "@/components/dashboardPageHeader";

export default async function Dashboard() {
  const statsPromise = getStatistics();

  return (
    <div className="container mx-auto">
      <Card className="p-6 gap-0">
        <DashboardPageHeader
          title="Visão Geral"
          text="Tenha uma visão de modo geral dos seus agendamentos"
        />
        <Suspense fallback={<Loader text="Carregando estatisticas" />}>
          <PageContent statsPromise={statsPromise} />
        </Suspense>
        <QuickLinks />
      </Card>
    </div>
  );
}

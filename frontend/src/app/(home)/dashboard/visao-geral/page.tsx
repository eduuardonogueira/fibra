"use server";

import { Suspense } from "react";
import PageContent from "./pageContent";
import { getStatistics } from "@/hooks/useDashboard";
import QuickLinks from "./quickLinks";
import Loader from "@/components/loader";

export default async function Overview() {
  const statsPromise = getStatistics();
  return (
    <div>
      <Suspense fallback={<Loader text="Carregando dashboard..." />}>
        <PageContent statsPromise={statsPromise} />
      </Suspense>
      <QuickLinks />
    </div>
  );
}

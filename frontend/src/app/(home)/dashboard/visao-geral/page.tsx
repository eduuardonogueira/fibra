"use server";

import { Suspense } from "react";
import PageContent from "./pageContent";
import QuickLinks from "./quickLinks";
import { getStatistics } from "@/api/index";
import { Loader } from "@/components/index";

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


import { Card } from "@/components/ui/card";
import React from "react";
import QuickLinks from "./quickLinks";
import DashboardPageHeader from "@/components/dashboardPageHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <Card className="p-6 gap-0">
        <DashboardPageHeader
          title="Visão Geral"
          text="Tenha uma visão de modo geral dos seus agendamentos"
        />
        {children}
        <QuickLinks />
      </Card>
    </div>
  );
}

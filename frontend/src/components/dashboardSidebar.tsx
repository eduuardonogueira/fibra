"use server";

import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import DashboardSidebarContent from "./dashboardSidebarContent";
import DashboardSidebarFooter from "./dashboardSidebarFooter";

export async function DashboardSidebar({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar>
        <DashboardSidebarContent />
        <DashboardSidebarFooter />
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}

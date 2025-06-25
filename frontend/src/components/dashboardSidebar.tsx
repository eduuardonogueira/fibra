"use server";

import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode, Suspense } from "react";
import DashboardSidebarContent from "./dashboardSidebarContent";
import DashboardSidebarFooter from "./dashboardSidebarFooter";
import { getProfile } from "@/hooks/useAuth";

export async function DashboardSidebar({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const userPromise = getProfile();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar>
        <DashboardSidebarContent />
        <Suspense
          fallback={
            <span className="flex w-full py-2 px-6">Carregando...</span>
          }
        >
          <DashboardSidebarFooter userPromise={userPromise} />
        </Suspense>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}

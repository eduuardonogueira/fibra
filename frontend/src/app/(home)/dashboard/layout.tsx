import { DashboardSidebar } from "@/components/dashboardSidebar";
import { HeaderBreadcrumb } from "@/components/headerBreadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RequireAuth } from "@/components/requireAuth";
import AppFooter from "@/components/appFooter";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <DashboardSidebar>
        <main className="w-full px-6 py-4">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
            <HeaderBreadcrumb />
          </div>
          {children}
          <AppFooter />
        </main>
      </DashboardSidebar>
    </RequireAuth>
  );
}

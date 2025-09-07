import {
  AppFooter,
  RequireAuth,
  DashboardSidebar,
  HeaderBreadcrumb,
} from "@/components/index";
import { SidebarTrigger } from "@/components/ui/sidebar";

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


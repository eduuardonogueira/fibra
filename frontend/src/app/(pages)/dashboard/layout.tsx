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
        <main className="flex-1 min-w-0 px-6 py-4 box-border">
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


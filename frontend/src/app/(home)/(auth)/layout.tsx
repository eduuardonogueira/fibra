import { AppSidebar } from "@/components/appSidebar";
import { HeaderBreadcrumb } from "@/components/headerBreadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth/authProvider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-6 py-4">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
            <HeaderBreadcrumb />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}

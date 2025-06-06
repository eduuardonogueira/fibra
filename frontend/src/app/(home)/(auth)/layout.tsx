import { cookies } from "next/headers";
import { AppSidebar } from "@/components/appSidebar";
import { HeaderBreadcrumb } from "@/components/headerBreadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth/authProvider";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
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

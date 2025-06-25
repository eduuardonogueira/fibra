"use client";

import { ChevronUp, LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { use } from "react";
import { Button } from "./ui/button";
import { logout } from "@/app/actions";
import { IUser } from "@/types/users";

interface IDashboardSidebarFooterProps {
  userPromise: Promise<IUser | null>;
}

export default function DashboardSidebarFooter({
  userPromise,
}: IDashboardSidebarFooterProps) {
  const user = use(userPromise);

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="hover:cursor-pointer">
                <User2 /> {user?.fullName}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem className="hover:cursor-pointer">
                <span className="flex p-2 px-3">Conta</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action={logout} className="flex w-full">
                  <Button
                    variant="ghost"
                    type="submit"
                    className="p-2 w-full flex justify-start hover:cursor-pointer"
                  >
                    <LogOut />
                    Sair
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

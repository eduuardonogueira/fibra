"use server";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ISidebarItem, sidebarItems } from "@/hooks/useAppSideBar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight } from "lucide-react";

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="mt-2 pl-2">
          <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                {sidebarItems.map((item: ISidebarItem) => (
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex w-full justify-between"
                        >
                          <div className="flex gap-2 items-center">
                            <item.icon size={18} />
                            <span className="capitalize">{item.title}</span>
                          </div>
                          {item.subItems ? (
                            <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          ) : null}
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.subItems
                        ? item.subItems.map((subItem: ISidebarItem) => (
                            <SidebarMenuSub key={item.title + subItem.title}>
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild />
                                <Link
                                  href={subItem.url}
                                  className="flex gap-2 items-center"
                                >
                                  <subItem.icon size={18} />
                                  <span className="capitalize">
                                    {subItem.title}
                                  </span>
                                </Link>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          ))
                        : ""}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                ))}
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

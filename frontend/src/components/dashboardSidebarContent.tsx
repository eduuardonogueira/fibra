import { ISidebarItem, sidebarItems } from "@/hooks/useAppSideBar";
import {
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
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function DashboardSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup className="mt-2 pl-2">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {sidebarItems.map((item: ISidebarItem) => (
              <Collapsible
                defaultOpen
                className="group/collapsible"
                key={item.title}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div>
                      <Link
                        href={item.url}
                        className="flex w-full justify-between"
                      >
                        <div className="flex gap-2 items-center">
                          <item.icon size={18} />
                          <span className="capitalize">{item.title}</span>
                        </div>
                      </Link>
                      <CollapsibleTrigger asChild>
                        {item.subItems ? (
                          <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90 hover:cursor-pointer hover:bg-gray-300 rounded-sm" />
                        ) : null}
                      </CollapsibleTrigger>
                    </div>
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    {item.subItems
                      ? item.subItems.map((subItem: ISidebarItem) => (
                          <SidebarMenuSub key={item.title + subItem.title}>
                            <SidebarMenuSubItem
                              key={item.title}
                              className="hover:bg-gray-100 p-2 rounded-sm"
                            >
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
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

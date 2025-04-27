"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function HeaderBreadcrumb() {
  const path = usePathname();
  const allPages = path === "/" ? [""] : path.split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {Array.from(allPages).map((link: string, index) => (
          <BreadcrumbItem key={link}>
            <BreadcrumbLink className="capitalize" href={`/${link}`}>
              {link === "" ? "home" : link}
            </BreadcrumbLink>
            {index < allPages.length - 1 ? <BreadcrumbSeparator /> : ""}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

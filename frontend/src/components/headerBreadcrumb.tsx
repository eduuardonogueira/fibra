"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { memo, useCallback } from "react";

export const HeaderBreadcrumb = memo(function HeaderBreadcrumb() {
  const path = usePathname();
  const allPages = path.split("/").filter(Boolean);

  const getAbsolutePath = useCallback(
    (pageIndex: number) => {
      const segments = allPages.slice(0, pageIndex + 1);
      return "/" + segments.join("/");
    },
    [allPages]
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="capitalize" href="/">
            home
          </BreadcrumbLink>
          {allPages.length > 0 && <BreadcrumbSeparator />}
        </BreadcrumbItem>

        {allPages.map((segment, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              className="capitalize"
              href={getAbsolutePath(index)}
            >
              {segment.replace(/-/g, " ")}{" "}
            </BreadcrumbLink>
            {index < allPages.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
});

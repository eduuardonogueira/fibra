"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";

import "react-day-picker/dist/style.css";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const ghostButton =
    "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";

  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      navLayout="around"
      className={cn("p-3", className, "")}
      classNames={{
        day: cn(
          ghostButton,
          "p-0 font-normal aria-selected:opacity-100 text-sm rounded-md",
        ),
        selected:
          "!bg-primary !text-primary-foreground hover:!bg-primary/90 !ring-0 !outline-none font-normal",
        today: "bg-accent text-accent-foreground",
        outside:
          "text-muted-foreground opacity-50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };


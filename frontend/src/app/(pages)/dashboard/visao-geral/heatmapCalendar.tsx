"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarClock } from "lucide-react";
import { useState } from "react";

interface IHeatmapCalendarProps {
  monthlyAppointments:
    | {
        date: Date;
        count: number;
      }[];
}

export default function HeatmapCalendar({
  monthlyAppointments,
}: IHeatmapCalendarProps) {
  const [currentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const maxAppointments =
    monthlyAppointments.reduce(
      (max, day) => (day.count > max ? day.count : max),
      0
    ) || 0;

  const getAppointmentCountForDay = (day: Date) => {
    if (!monthlyAppointments) return 0;
    const appointment = monthlyAppointments.find((a) => isSameDay(a.date, day));
    return appointment ? appointment.count : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Distribuição de Agendamentos -{" "}
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <div key={day} className="font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1">
          {calendarDays.map((day) => {
            const count = getAppointmentCountForDay(day);
            const colorClass =
              count === 0
                ? "bg-gray-100"
                : `bg-blue-${Math.min(
                    Math.floor((count / maxAppointments) * 5) + 1,
                    5
                  )}00`;

            return (
              <div
                key={day.toString()}
                className={`aspect-square rounded-md flex items-center justify-center text-xs ${colorClass} ${
                  count > 0 ? "text-white" : "text-gray-500"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{format(day, "d")}</span>
                  {count > 0 && <span className="text-[10px]">{count}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Menos</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            </div>
            <span>Mais</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

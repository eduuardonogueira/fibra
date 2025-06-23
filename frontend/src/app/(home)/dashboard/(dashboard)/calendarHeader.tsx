import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ICalendarHeaderProps {
  weekDays: Date[];
}

export default function CalendarHeader({ weekDays }: ICalendarHeaderProps) {
  return (
    <div className="grid grid-cols-8 border-b">
      <div className="p-4 font-medium text-center bg-muted">Horário</div>
      {weekDays.map((day) => (
        <div key={day.toString()} className="p-4 text-center border-l bg-blue-200">
          <div className="font-medium">
            {format(day, "EEEE", { locale: ptBR })}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(day, "dd/MM")}
          </div>
        </div>
      ))}
    </div>
  );
}

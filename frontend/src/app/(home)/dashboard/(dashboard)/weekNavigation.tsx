import { Button } from "@/components/ui/button";
import { IFormatedAppointment } from "@/types/appointments";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IWeekNavigationProps {
  goToPreviousWeek: () => void;
  goToCurrentWeek: () => void;
  goToNextWeek: () => void;
  filteredAppointments?: IFormatedAppointment[];
}

export default function WeekNavigation({
  goToPreviousWeek,
  goToCurrentWeek,
  goToNextWeek,
  filteredAppointments,
}: IWeekNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousWeek}
          className="hover:cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Semana anterior</span>
        </Button>
        <Button
          variant="outline"
          onClick={goToCurrentWeek}
          className="hover:cursor-pointer"
        >
          Semana Atual
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextWeek}
          className="hover:cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próxima semana</span>
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        {filteredAppointments ? filteredAppointments.length : 0} agendamento(s)
        encontrado(s)
      </div>
    </div>
  );
}

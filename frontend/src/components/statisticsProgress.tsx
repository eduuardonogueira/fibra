import { LucideProps } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface IStatisticsProgressProps {
  title: string;
  statistics: number | string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconClassName?: string | undefined;
  iconBackgroundClassName?: string | undefined;
  progressValue?: number;
}

export default function StatisticsProgress({
  title,
  statistics,
  Icon,
  iconClassName,
  iconBackgroundClassName,
  progressValue,
}: IStatisticsProgressProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{statistics}</p>
          </div>
          <div className={`p-2 ${iconBackgroundClassName} rounded-full`}>
            <Icon className={`h-6 w-6 ${iconClassName}`} />
          </div>
        </div>
        {progressValue ? (
          <div className="mt-4">
            <Progress value={progressValue} className="h-1" />
          </div>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}

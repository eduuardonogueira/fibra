"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UseCalendarLegend from "@/hooks/useCalendarLegend";

export default async function Legend() {
  const { legends } = UseCalendarLegend();
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Legenda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {legends.map((legend) => (
            <div key={legend.label} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 border-l-4 border-l-${legend.color}-500 bg-${legend.color}-50 rounded-sm`}
              />
              <span className="text-sm">{legend.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

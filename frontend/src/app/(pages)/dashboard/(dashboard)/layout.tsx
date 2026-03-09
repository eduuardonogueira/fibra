import { Card } from "@/components/ui/card";
import React from "react";
import Legend from "./legend";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <Card className="p-6 gap-0">
        {children}
        <Legend />
      </Card>
    </div>
  );
}

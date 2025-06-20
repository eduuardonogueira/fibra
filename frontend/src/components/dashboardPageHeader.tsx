"use server";

import { Button } from "@/components/ui/button";
import { APPOINTMENTS_ROUTE, CREATE_CUSTOMER_ROUTE } from "@/constants/routes";
import { Calendar, UserPlus2Icon } from "lucide-react";
import { CardDescription, CardTitle } from "./ui/card";
import Link from "next/link";

interface IDashboardPageHeaderProps {
  title: string;
  text: string;
}

export default async function DashboardPageHeader({
  title,
  text,
}: IDashboardPageHeaderProps) {
  return (
    <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{text}</CardDescription>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Link href={APPOINTMENTS_ROUTE} className="w-full sm:w-fit">
          <Button className="w-full hover:cursor-pointer">
            <Calendar className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </Link>
        <Link href={CREATE_CUSTOMER_ROUTE} className="w-full sm:w-fit">
          <Button variant="outline" className="w-full hover:cursor-pointer">
            <UserPlus2Icon className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>
    </div>
  );
}

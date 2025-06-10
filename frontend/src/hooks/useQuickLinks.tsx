import {
  CUSTOMERS_ROUTE,
  PROFESSIONALS_ROUTE,
  SCHEDULE_APPOINTMENT,
  SERVICES_ROUTE,
} from "@/constants/routes";
import {
  BriefcaseBusiness,
  Hammer,
  Home,
  LucideProps,
  Users,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IQuickLinksItems {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const quickLinksItems: IQuickLinksItems[] = [
  {
    title: "Agendar",
    url: SCHEDULE_APPOINTMENT,
    icon: Home,
  },
  {
    title: "Serviços",
    url: SERVICES_ROUTE,
    icon: Hammer,
  },
  {
    title: "Pacientes",
    url: CUSTOMERS_ROUTE,
    icon: Users,
  },
  {
    title: "Profissionais",
    url: PROFESSIONALS_ROUTE,
    icon: BriefcaseBusiness,
  },
];

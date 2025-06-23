import {
  APPOINTMENTS_ROUTE,
  CUSTOMERS_ROUTE,
  DASHBOARD_ROUTE,
  EXPEDIENTS_ROUTE,
  OVERVIEW_ROUTE,
  PROFESSIONALS_ROUTE,
  SERVICES_ROUTE,
} from "@/constants/routes";
import {
  BriefcaseBusiness,
  CalendarCheck,
  Hammer,
  LayoutDashboard,
  LucideProps,
  Timer,
  Users,
  View,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ISidebarItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  subItems?: ISidebarItem[];
}

export const sidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: DASHBOARD_ROUTE,
    icon: LayoutDashboard,
    subItems: [
      {
        title: "Visão Geral",
        url: OVERVIEW_ROUTE,
        icon: View,
      },
    ],
  },
  {
    title: "Agendamentos",
    url: APPOINTMENTS_ROUTE,
    icon: CalendarCheck,
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
    subItems: [
      {
        title: "Expedientes",
        url: EXPEDIENTS_ROUTE,
        icon: Timer,
      },
    ],
  },
];

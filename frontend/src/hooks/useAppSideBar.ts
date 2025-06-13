import {
  APPOINTMENTS_ROUTE,
  CUSTOMERS_ROUTE,
  DASHBOARD_ROUTER,
  EXPEDIENTS_ROUTE,
  PROFESSIONALS_ROUTE,
  SERVICES_ROUTE,
} from "@/constants/routes";
import {
  BriefcaseBusiness,
  CalendarCheck,
  Hammer,
  Home,
  LucideProps,
  Timer,
  Users,
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
    title: "Home",
    url: DASHBOARD_ROUTER,
    icon: Home,
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

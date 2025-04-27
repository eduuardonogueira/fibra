import { CalendarCheck, Hammer, Home, LucideProps, UserRound } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ISidebarItem {
  title: string,
  url: string,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const sidebarItems: ISidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home
  },
  {
    title: "Agendamentos",
    url: "/agendamentos",
    icon: CalendarCheck
  },
  {
    title: "Serviços",
    url: "/servicos",
    icon: Hammer
  },
  {
    title: "Pacientes",
    url: "/pacientes",
    icon: UserRound
  },

]
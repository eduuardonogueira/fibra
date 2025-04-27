import { IServiceList } from "@/types/services";

export const mockServices: IServiceList[] = [
  {
    id: "1",
    name: "Consulta Regular",
    description:
      "Consulta padrão com duração de 30 minutos para avaliação geral do paciente.",
    users: [
      {
        id: "1",
        fullName: "Dra. Ana Silva",
      },
    ],
  },
  {
    id: "2",
    name: "Primeira Consulta",
    description:
      "Consulta inicial com duração estendida de 45 minutos para novos pacientes.",
    users: [
      {
        id: "2",
        fullName: "Dr. Carlos Mendes",
      },
    ],
  },
  {
    id: "3",
    name: "Consulta de Retorno",
    description:
      "Consulta de acompanhamento após tratamento inicial, com duração de 20 minutos.",
    users: [
      {
        id: "3",
        fullName: "Dra. Mariana Costa",
      },
    ],
  },
  {
    id: "4",
    name: "Consulta Especializada",
    description:
      "Consulta com especialista para casos específicos, com duração de 40 minutos.",
    users: [
      {
        id: "4",
        fullName: "Dr. Paulo Ribeiro",
      },
    ],
  },
  {
    id: "5",
    name: "Consulta Familiar",
    description:
      "Consulta para atendimento de famílias, com duração de 60 minutos.",
    users: [
      {
        id: "1",
        fullName: "Dra. Ana Silva",
      },
    ],
  },
  {
    id: "6",
    name: "Consulta Pediátrica",
    description:
      "Consulta especializada para crianças e adolescentes, com duração de 30 minutos.",
    users: [
      {
        id: "2",
        fullName: "Dr. Carlos Mendes",
      },
    ],
  },
  {
    id: "7",
    name: "Consulta de Emergência",
    description: "Consulta para casos urgentes, com prioridade de atendimento.",
    users: [
      {
        id: "4",
        fullName: "Dr. Paulo Ribeiro",
      },
    ],
  },
  {
    id: "8",
    name: "Consulta de Acompanhamento",
    description:
      "Consulta para monitoramento contínuo de pacientes em tratamento.",
    users: [
      {
        id: "3",
        fullName: "Dra. Mariana Costa",
      },
    ],
  },
  {
    id: "9",
    name: "Consulta de Rotina",
    description: "Consulta periódica para manutenção da saúde e prevenção.",
    users: [
      {
        id: "1",
        fullName: "Dra. Ana Silva",
      },
    ],
  },
];

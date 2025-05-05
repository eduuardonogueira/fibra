import { IServiceList } from "@/types/services";

export const mockServices: IServiceList[] = [
  {
    id: "1",
    name: "Consulta Regular",
    duration: 30,
    description:
      "Consulta padrão com duração de 30 minutos para avaliação geral do paciente.",
    professionals: [
      {
        id: "1",
        fullName: "Dra. Ana Silva",
      },
    ],
  },
  {
    id: "2",
    name: "Primeira Consulta",
    duration: 30,
    description:
      "Consulta inicial com duração estendida de 45 minutos para novos pacientes.",
    professionals: [
      {
        id: "2",
        fullName: "Dr. Carlos Mendes",
      },
    ],
  },
  {
    id: "3",
    name: "Consulta de Retorno",
    duration: 50,
    description:
      "Consulta de acompanhamento após tratamento inicial, com duração de 20 minutos.",
    professionals: [
      {
        id: "3",
        fullName: "Dra. Mariana Costa",
      },
    ],
  },
  {
    id: "4",
    name: "Consulta Especializada",
    duration: 30,
    description:
      "Consulta com especialista para casos específicos, com duração de 40 minutos.",
    professionals: [
      {
        id: "4",
        fullName: "Dr. Paulo Ribeiro",
      },
    ],
  },
  {
    id: "5",
    name: "Consulta Familiar",
    duration: 40,
    description:
      "Consulta para atendimento de famílias, com duração de 60 minutos.",
    professionals: [
      {
        id: "1",
        fullName: "Dra. Ana Silva",
      },
    ],
  },
  {
    id: "6",
    name: "Consulta Pediátrica",
    duration: 30,
    description:
      "Consulta especializada para crianças e adolescentes, com duração de 30 minutos.",
    professionals: [
      {
        id: "2",
        fullName: "Dr. Carlos Mendes",
      },
    ],
  },
  {
    id: "7",
    name: "Consulta de Emergência",
    duration: 60,
    description: "Consulta para casos urgentes, com prioridade de atendimento.",
    professionals: [
      {
        id: "4",
        fullName: "Dr. Paulo Ribeiro",
      },
    ],
  },
  {
    id: "8",
    name: "Consulta de Acompanhamento",
    duration: 30,
    description:
      "Consulta para monitoramento contínuo de pacientes em tratamento.",
    professionals: [
      {
        id: "3",
        fullName: "Dra. Mariana Costa",
      },
    ],
  },
  {
    id: "9",
    name: "Consulta de Rotina",
    duration: 30,
    description: "Consulta periódica para manutenção da saúde e prevenção.",
    professionals: [
      {
        id: "1",
        fullName: "Dra. Ana Silva",
      },
    ],
  },
];

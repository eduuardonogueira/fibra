import { IServiceList } from "@/types/services";
import { IProfessionalCalendar } from "@/types/users";

export const mockServices: IServiceList[] = [
  {
    id: "1",
    name: "Preventivo para mulher",
    duration: 30,
    description:
      "Exame ginecológico preventivo para detecção de doenças como o câncer de colo do útero.",
    professionals: [
      { id: "1", fullName: "Dra. Ana Silva" },
      { id: "3", fullName: "Dra. Mariana Costa" },
    ],
  },
  {
    id: "2",
    name: "Vacinação para criança e adulto",
    duration: 15,
    description:
      "Aplicação de vacinas conforme o calendário nacional para diferentes faixas etárias.",
    professionals: [
      { id: "1", fullName: "Dra. Ana Silva" },
      { id: "2", fullName: "Dr. Carlos Mendes" },
    ],
  },
  {
    id: "3",
    name: "Atendimento nutricional",
    duration: 40,
    description:
      "Consulta com nutricionista para avaliação alimentar e orientação nutricional personalizada.",
    professionals: [{ id: "3", fullName: "Dra. Mariana Costa" }],
  },
  {
    id: "4",
    name: "Atendimento voltado para diabéticos",
    duration: 30,
    description:
      "Acompanhamento clínico e orientações para controle e prevenção de complicações do diabetes.",
    professionals: [
      { id: "2", fullName: "Dr. Carlos Mendes" },
      { id: "4", fullName: "Dr. Paulo Ribeiro" },
    ],
  },
  {
    id: "5",
    name: "Acupuntura",
    duration: 50,
    description:
      "Terapia baseada na medicina tradicional chinesa que utiliza agulhas para aliviar dores e tratar disfunções.",
    professionals: [{ id: "4", fullName: "Dr. Paulo Ribeiro" }],
  },
  {
    id: "6",
    name: "Fisioterapia para sequela do COVID",
    duration: 60,
    description:
      "Tratamento fisioterapêutico para reabilitação respiratória e motora de pacientes pós-COVID.",
    professionals: [{ id: "1", fullName: "Dra. Ana Silva" }],
  },
  {
    id: "7",
    name: "Tratamento odontológico",
    duration: 45,
    description:
      "Procedimentos odontológicos preventivos e corretivos realizados por dentista.",
    professionals: [{ id: "2", fullName: "Dr. Carlos Mendes" }],
  },
  {
    id: "8",
    name: "Atendimento Psiquiátrico",
    duration: 50,
    description:
      "Consulta com psiquiatra para avaliação, diagnóstico e tratamento de transtornos mentais.",
    professionals: [{ id: "3", fullName: "Dra. Mariana Costa" }],
  },
  {
    id: "9",
    name: "Orientações jurídicas",
    duration: 40,
    description:
      "Atendimento com profissional do Direito para esclarecimento de dúvidas e orientações legais.",
    professionals: [{ id: "4", fullName: "Dr. Paulo Ribeiro" }],
  },
  {
    id: "10",
    name: "Atendimento psquiátrico",
    duration: 50,
    description:
      "Consulta com psiquiatra para suporte em saúde mental. (Duplicado do serviço 8, com erro de digitação.)",
    professionals: [{ id: "3", fullName: "Dra. Mariana Costa" }],
  },
];

export const mockProfessionalsCalendar: IProfessionalCalendar[] = [
  {
    id: "1",
    fullName: "Dra. Ana Silva",
    expedient: [
      { id: "1", weekday: 1, startTime: "08:00", endTime: "12:00" },
      { id: "2", weekday: 2, startTime: "08:00", endTime: "12:00" },
      { id: "2", weekday: 2, startTime: "13:00", endTime: "17:00" },
      { id: "3", weekday: 3, startTime: "08:00", endTime: "12:00" },
      { id: "4", weekday: 4, startTime: "13:00", endTime: "17:00" },
      { id: "5", weekday: 5, startTime: "08:00", endTime: "12:00" },
    ],
    timeOffs: [
      {
        id: "1",
        startDateTime: "2025-05-06T10:00:00",
        endDateTime: "2025-05-06T11:00:00",
      },
    ],
    dayOffs: [{ id: "1", dayOff: "2025-05-07T00:00:00" }],
    appointments: [
      { id: "a1", dateTime: "2025-05-05T08:00:00" },
      { id: "a2", dateTime: "2025-05-05T08:30:00" },
    ],
  },
  {
    id: "2",
    fullName: "Dr. Carlos Mendes",
    expedient: [
      { id: "1", weekday: 1, startTime: "09:00", endTime: "13:00" },
      { id: "2", weekday: 2, startTime: "14:00", endTime: "18:00" },
      { id: "3", weekday: 3, startTime: "09:00", endTime: "13:00" },
      { id: "4", weekday: 4, startTime: "14:00", endTime: "18:00" },
      { id: "5", weekday: 5, startTime: "09:00", endTime: "12:00" },
    ],
    timeOffs: [
      {
        id: "1",
        startDateTime: "2025-05-09T09:00:00",
        endDateTime: "2025-05-09T10:30:00",
      },
    ],
    appointments: [
      { id: "a3", dateTime: "2025-05-06T14:00:00" },
      { id: "a4", dateTime: "2025-05-06T14:15:00" },
      { id: "a5", dateTime: "2025-05-06T14:30:00" },
    ],
  },
  {
    id: "3",
    fullName: "Dra. Mariana Costa",
    expedient: [
      { id: "1", weekday: 1, startTime: "08:00", endTime: "12:00" },
      { id: "1", weekday: 1, startTime: "13:00", endTime: "17:00" },
      { id: "2", weekday: 2, startTime: "08:00", endTime: "12:00" },
      { id: "3", weekday: 3, startTime: "13:00", endTime: "17:00" },
      { id: "4", weekday: 4, startTime: "08:00", endTime: "12:00" },
      { id: "5", weekday: 5, startTime: "13:00", endTime: "17:00" },
    ],
    timeOffs: [
      {
        id: "1",
        startDateTime: "2025-05-05T14:00:00",
        endDateTime: "2025-05-05T15:00:00",
      },
      {
        id: "2",
        startDateTime: "2025-05-12T13:00:00",
        endDateTime: "2025-05-12T14:00:00",
      },
      {
        id: "3",
        startDateTime: "2025-05-12T08:00:00",
        endDateTime: "2025-05-12T10:00:00",
      },
      {
        id: "4",
        startDateTime: "2025-05-14T13:00:00",
        endDateTime: "2025-05-14T15:30:00",
      },
    ],
    dayOffs: [
      { id: "1", dayOff: "2025-05-06T00:00:00" },
      { id: "2", dayOff: "2025-05-07T00:00:00" },
    ],
    appointments: [
      { id: "a6", dateTime: "2025-05-05T13:00:00" },
      { id: "a7", dateTime: "2025-05-05T15:00:00" },
      { id: "a7", dateTime: "2025-05-12T15:00:00" },
      { id: "a7", dateTime: "2025-05-12T16:00:00" },
      { id: "a7", dateTime: "2025-05-14T16:00:00" },
    ],
  },
  {
    id: "4",
    fullName: "Dr. Paulo Ribeiro",
    expedient: [
      { id: "1", weekday: 1, startTime: "08:00", endTime: "12:00" },
      { id: "2", weekday: 2, startTime: "13:00", endTime: "17:00" },
      { id: "3", weekday: 3, startTime: "08:00", endTime: "12:00" },
      { id: "4", weekday: 4, startTime: "13:00", endTime: "17:00" },
    ],
    timeOffs: [
      {
        id: "1",
        startDateTime: "2025-05-07T08:00:00",
        endDateTime: "2025-05-07T10:00:00",
      },
    ],
    appointments: [
      { id: "a8", dateTime: "2025-05-06T13:00:00" },
      { id: "a9", dateTime: "2025-05-06T13:50:00" },
    ],
  },
];

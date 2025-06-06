import { IUserWithServicesAndExpedients } from "@/types/users";

export const initialProfessionals: IUserWithServicesAndExpedients[] = [
  {
    id: "1",
    fullName: "Dra. Ana Silva",
    email: "ana.silva@clinic.com",
    role: "PROFESSIONAL",
    services: [
      {
        id: "1",
        name: "Consulta Regular",
        expedients: [
          { id: "1", weekday: 1, startTime: "08:00", endTime: "12:00" },
          { id: "2", weekday: 1, startTime: "14:00", endTime: "18:00" },
          { id: "3", weekday: 3, startTime: "08:00", endTime: "12:00" },
          { id: "4", weekday: 5, startTime: "08:00", endTime: "17:00" },
        ],
      },
      {
        id: "5",
        name: "Consulta Familiar",
        expedients: [
          { id: "5", weekday: 2, startTime: "09:00", endTime: "16:00" },
          { id: "6", weekday: 4, startTime: "09:00", endTime: "16:00" },
        ],
      },
    ],
  },
  {
    id: "2",
    fullName: "Dr. Carlos Mendes",
    email: "carlos.mendes@clinic.com",
    role: "PROFESSIONAL",
    services: [
      {
        id: "2",
        name: "Primeira Consulta",
        expedients: [
          { id: "7", weekday: 1, startTime: "09:00", endTime: "17:00" },
          { id: "8", weekday: 2, startTime: "09:00", endTime: "17:00" },
          { id: "9", weekday: 4, startTime: "09:00", endTime: "17:00" },
        ],
      },
      {
        id: "6",
        name: "Consulta Pediátrica",
        expedients: [
          { id: "10", weekday: 3, startTime: "08:00", endTime: "12:00" },
          { id: "11", weekday: 5, startTime: "14:00", endTime: "18:00" },
        ],
      },
    ],
  },
  {
    id: "3",
    fullName: "Dra. Mariana Costa",
    email: "mariana.costa@clinic.com",
    role: "PROFESSIONAL",
    services: [
      {
        id: "3",
        name: "Consulta de Retorno",
        expedients: [
          { id: "12", weekday: 1, startTime: "08:00", endTime: "16:00" },
          { id: "13", weekday: 3, startTime: "08:00", endTime: "16:00" },
          { id: "14", weekday: 5, startTime: "08:00", endTime: "16:00" },
        ],
      },
      {
        id: "8",
        name: "Consulta de Acompanhamento",
        expedients: [
          { id: "15", weekday: 2, startTime: "10:00", endTime: "15:00" },
          { id: "16", weekday: 4, startTime: "10:00", endTime: "15:00" },
        ],
      },
    ],
  },
  {
    id: "4",
    fullName: "Dr. Paulo Ribeiro",
    email: "paulo.ribeiro@clinic.com",
    role: "PROFESSIONAL",
    services: [
      {
        id: "4",
        name: "Consulta Especializada",
        expedients: [
          { id: "17", weekday: 1, startTime: "07:00", endTime: "15:00" },
          { id: "18", weekday: 3, startTime: "07:00", endTime: "15:00" },
          { id: "19", weekday: 5, startTime: "07:00", endTime: "15:00" },
        ],
      },
      {
        id: "7",
        name: "Consulta de Emergência",
        expedients: [
          { id: "20", weekday: 0, startTime: "08:00", endTime: "20:00" },
          { id: "21", weekday: 6, startTime: "08:00", endTime: "20:00" },
        ],
      },
    ],
  },
];

export const mockStats = {
  totalAppointments: 1248,
  completedAppointments: 876,
  canceledAppointments: 124,
  pendingAppointments: 248,
  totalClients: 532,
  totalServices: 9,
  totalProfessionals: 4,
  appointmentsByStatus: {
    SCHEDULED: 248,
    DELAYED: 248,
    COMPLETED: 876,
    CANCELED: 124,
  },
  appointmentsByService: {
    "Consulta Regular": 450,
    "Primeira Consulta": 210,
    "Consulta de Retorno": 320,
    "Consulta Especializada": 180,
    "Consulta Familiar": 88,
  },
  appointmentsByProfessional: {
    "Dra. Ana Silva": 380,
    "Dr. Carlos Mendes": 320,
    "Dra. Mariana Costa": 290,
    "Dr. Paulo Ribeiro": 258,
  },
  clientsByType: {
    adulto: 310,
    mirim: 142,
    familiar: 80,
  },
  recentActivity: [
    {
      id: 1,
      type: "appointment_created",
      description: "Novo agendamento para João Silva",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      user: "Recepcionista",
    },
    {
      id: 2,
      type: "appointment_completed",
      description: "Consulta de Maria Oliveira finalizada",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      user: "Dra. Ana Silva",
    },
    {
      id: 3,
      type: "appointment_canceled",
      description: "Carlos Mendes cancelou agendamento",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      user: "Sistema",
    },
    {
      id: 4,
      type: "client_registered",
      description: "Novo cliente cadastrado: Fernanda Lima",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      user: "Recepcionista",
    },
    {
      id: 5,
      type: "service_updated",
      description: "Serviço 'Consulta Especializada' atualizado",
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      user: "Administrador",
    },
  ],
  upcomingAppointments: [
    {
      id: 1,
      customerName: "Ana Beatriz",
      dateTime: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
      professional: "Dr. Carlos Mendes",
      serviceType: "Consulta Regular",
      status: "COMPLETED",
    },
    {
      id: 2,
      customerName: "Roberto Santos",
      dateTime: new Date(Date.now() + 1000 * 60 * 90), // 1.5 hours from now
      professional: "Dra. Ana Silva",
      serviceType: "Consulta de Retorno",
      status: "COMPLETED",
    },
    {
      id: 3,
      customerName: "Carla Ferreira",
      dateTime: new Date(Date.now() + 1000 * 60 * 150), // 2.5 hours from now
      professional: "Dra. Mariana Costa",
      serviceType: "Primeira Consulta",
      status: "DELAYED",
    },
    {
      id: 4,
      customerName: "Paulo Henrique",
      dateTime: new Date(Date.now() + 1000 * 60 * 210), // 3.5 hours from now
      professional: "Dr. Paulo Ribeiro",
      serviceType: "Consulta Especializada",
      status: "COMPLETED",
    },
  ],
  monthlyAppointments: [
    { date: new Date(2025, 5, 1), count: 12 },
    { date: new Date(2025, 5, 2), count: 8 },
    { date: new Date(2025, 5, 3), count: 15 },
    { date: new Date(2025, 5, 4), count: 10 },
    { date: new Date(2025, 5, 5), count: 18 },
    { date: new Date(2025, 5, 6), count: 14 },
    { date: new Date(2025, 5, 7), count: 9 },
    { date: new Date(2025, 5, 8), count: 11 },
    { date: new Date(2025, 5, 9), count: 13 },
    { date: new Date(2025, 5, 10), count: 7 },
    { date: new Date(2025, 5, 11), count: 5 },
    { date: new Date(2025, 5, 12), count: 16 },
    { date: new Date(2025, 5, 13), count: 12 },
    { date: new Date(2025, 5, 14), count: 10 },
    { date: new Date(2025, 5, 15), count: 14 },
    { date: new Date(2025, 5, 16), count: 9 },
    { date: new Date(2025, 5, 17), count: 6 },
    { date: new Date(2025, 5, 18), count: 4 },
    { date: new Date(2025, 5, 19), count: 13 },
    { date: new Date(2025, 5, 20), count: 15 },
    { date: new Date(2025, 5, 21), count: 11 },
    { date: new Date(2025, 5, 22), count: 10 },
    { date: new Date(2025, 5, 23), count: 12 },
    { date: new Date(2025, 5, 24), count: 8 },
    { date: new Date(2025, 5, 25), count: 5 },
    { date: new Date(2025, 5, 26), count: 14 },
    { date: new Date(2025, 5, 27), count: 16 },
    { date: new Date(2025, 5, 28), count: 13 },
    { date: new Date(2025, 5, 29), count: 11 },
    { date: new Date(2025, 5, 30), count: 9 },
  ],
};

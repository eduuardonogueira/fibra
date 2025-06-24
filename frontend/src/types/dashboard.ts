export interface IStatistics {
  totalAppointments: number;
  completedAppointments: number;
  canceledAppointments: number;
  pendingAppointments: number;
  totalClients: number;
  totalServices: number;
  totalProfessionals: number;
  appointmentsByStatus: {
    SCHEDULED: number;
    DELAYED: number;
    COMPLETED: number;
    CANCELED: number;
  };
  appointmentsByService: {
    [serviceName: string]: number;
  };
  appointmentsByProfessional: {
    [professionalName: string]: number;
  };
  monthlyAppointments: {
    date: Date;
    count: number;
  }[];
  upcomingAppointments: {
    id: number;
    customerName: string;
    dateTime: Date;
    professional: string;
    serviceType: string;
    status: string;
  }[];
  clientsByType: Record<string, number>;
}

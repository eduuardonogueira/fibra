export interface IExpedient {
  id: string;
  weekday: number; // 0 to 6
  startTime: string;
  endTime: string;
}

export interface ICreateExpedient {
  weekday: number;
  startTime: string;
  endTime: string;
  userId: string;
  serviceId: string;
}

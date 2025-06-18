export const HOME_ROUTER = "/";
export const DASHBOARD_ROUTER = "/dashboard";
export const LOGIN_ROUTE = "/login";

export const APPOINTMENTS_ROUTE = `${DASHBOARD_ROUTER}/agendamentos`;
export const CREATE_APPOINTMENT_ROUTE = `${DASHBOARD_ROUTER}/agendamentos/criar`;

export const CUSTOMERS_ROUTE = `${DASHBOARD_ROUTER}/pacientes`;
export const UPDATE_CUSTOMER_ROUTE = `${CUSTOMERS_ROUTE}/editar`;
export const CREATE_CUSTOMER_ROUTE = `${CUSTOMERS_ROUTE}/criar`;

export const PROFESSIONALS_ROUTE = `${DASHBOARD_ROUTER}/profissionais`;
export const UPDATE_PROFESSIONAL_ROUTE = `${PROFESSIONALS_ROUTE}/editar`;
export const CREATE_PROFESSIONAL_ROUTE = `${PROFESSIONALS_ROUTE}/criar`;

export const SERVICES_ROUTE = `${DASHBOARD_ROUTER}/servicos`;
export const SERVICE_ROUTE = `${DASHBOARD_ROUTER}/servico`;
export const EXPEDIENTS_ROUTE = `${PROFESSIONALS_ROUTE}/expedientes`;

export const SCHEDULE_APPOINTMENT = "/forms/agendamento";
export const CONFIRMATION_APPOINTMENT = `${SCHEDULE_APPOINTMENT}/confirmacao`;

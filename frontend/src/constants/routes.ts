export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";

export const DASHBOARD_ROUTE = "/dashboard";
export const OVERVIEW_ROUTE = `${DASHBOARD_ROUTE}/visao-geral`;

export const APPOINTMENTS_ROUTE = `${DASHBOARD_ROUTE}/agendamentos`;
export const CREATE_APPOINTMENT_ROUTE = `${DASHBOARD_ROUTE}/agendamentos/criar`;

export const CUSTOMERS_ROUTE = `${DASHBOARD_ROUTE}/pacientes`;
export const UPDATE_CUSTOMER_ROUTE = `${CUSTOMERS_ROUTE}/editar`;
export const CREATE_CUSTOMER_ROUTE = `${CUSTOMERS_ROUTE}/criar`;

export const PROFESSIONALS_ROUTE = `${DASHBOARD_ROUTE}/profissionais`;
export const UPDATE_PROFESSIONAL_ROUTE = `${PROFESSIONALS_ROUTE}/editar`;
export const CREATE_PROFESSIONAL_ROUTE = `${PROFESSIONALS_ROUTE}/criar`;

export const SERVICES_ROUTE = `${DASHBOARD_ROUTE}/servicos`;
export const SERVICE_ROUTE = `${DASHBOARD_ROUTE}/servico`;
export const EXPEDIENTS_ROUTE = `${PROFESSIONALS_ROUTE}/expedientes`;

export const SCHEDULE_APPOINTMENT = "/forms/agendamento";
export const CONFIRMATION_APPOINTMENT = `${SCHEDULE_APPOINTMENT}/confirmacao`;

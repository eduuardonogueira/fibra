"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  isSameDay,
} from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentsDetailsModal from "./appointmentsDetailsModal";
import CalendarTimeSlots from "./calendarTimeSlots";
import CalendarHeader from "./calendarHeader";
import WeekNavigation from "./weekNavigation";
import PageHeader from "./pageHeader";
import { getAppointments } from "@/hooks/useAppointments";
import { IFormatedAppointment } from "@/types/appointments";
import { myToast } from "@/components/myToast";
import Loader from "@/components/loader";

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState("all");

  const [appointments, setAppointments] = useState<
    IFormatedAppointment[] | null
  >([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IFormatedAppointment | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 50,
    totalPages: 0,
  });

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await getAppointments(pagination);
        if (!response) return;

        const { data, totalPages } = response;
        setAppointments(data);
        setPagination((prev) => ({ ...prev, totalPages }));
      } catch (error) {
        myToast("Erro", "Erro ao buscar agendamentos");
        console.error("Failed to fetch appointments", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [currentWeek]);

  // Filter appointments by professional and week
  const filteredAppointments = appointments?.filter((appointment) => {
    const appointmentDate = new Date(appointment.dateTime);
    const isInWeek = appointmentDate >= weekStart && appointmentDate <= weekEnd;
    const matchesProfessional =
      selectedProfessional === "all" ||
      appointment.professional.id === selectedProfessional.toString();

    return isInWeek && matchesProfessional;
  });

  // Get appointments for a specific day and time slot
  const getAppointmentsForSlot = (day: Date, timeSlot: string) => {
    return filteredAppointments?.filter((appointment) => {
      const appointmentDate = appointment.dateTime;
      const appointmentTime = format(appointmentDate, "HH:mm");
      return isSameDay(appointmentDate, day) && appointmentTime === timeSlot;
    });
  };

  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  // Open appointment details modal
  const openAppointmentDetails = (appointment: IFormatedAppointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        weekStart={weekStart}
        weekEnd={weekEnd}
        selectedProfessional={selectedProfessional}
        setSelectedProfessional={setSelectedProfessional}
        pagination={pagination}
      />
      <WeekNavigation
        goToPreviousWeek={goToPreviousWeek}
        goToCurrentWeek={goToCurrentWeek}
        goToNextWeek={goToNextWeek}
        filteredAppointments={filteredAppointments}
      />

      {isLoading ? (
        <Loader text="Carregando calendário..." />
      ) : (
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <CalendarHeader weekDays={weekDays} />
                <CalendarTimeSlots
                  weekDays={weekDays}
                  openAppointmentDetails={openAppointmentDetails}
                  getAppointmentsForSlot={getAppointmentsForSlot}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedAppointment ? (
        <AppointmentsDetailsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedAppointment={selectedAppointment}
        />
      ) : (
        ""
      )}
    </>
  );
}

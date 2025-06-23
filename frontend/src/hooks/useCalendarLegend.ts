export default function UseCalendarLegend() {
  const legends = [
    {
      label: "Agendado",
      color: "green",
    },
    {
      label: "Atrasado",
      color: "yellow",
    },
    {
      label: "Completo",
      color: "blue",
    },
    {
      label: "Cancelado",
      color: "red",
    },
  ];
  return { legends };
}

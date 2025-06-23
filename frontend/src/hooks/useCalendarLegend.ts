export default function UseCalendarLegend() {
  const legends = [
    {
      label: "Confirmado",
      color: "green",
    },
    {
      label: "Pendente",
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

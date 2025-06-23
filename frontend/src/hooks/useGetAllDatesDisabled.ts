import { IExpedient } from "@/types/expedient";

export function getAllDatesDisabled(
  date: Date,
  daysOff: Date[] | undefined,
  expedient: IExpedient[] | undefined
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBeforeToday = date < today;

  const isDayOff = Array.isArray(daysOff)
    ? daysOff.some((d) => {
        const off = new Date(d);
        return (
          off.getFullYear() === date.getFullYear() &&
          off.getMonth() === date.getMonth() &&
          off.getDate() === date.getDate()
        );
      })
    : false;

  const isNotJorneyDay = Array.isArray(expedient)
    ? !expedient.some((expedient) => expedient.weekday === date.getDay())
    : true;

  return isBeforeToday || isNotJorneyDay || isDayOff;
}

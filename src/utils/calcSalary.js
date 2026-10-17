import { findPosition } from "../data/positions";
import { addDays, countSundays, daysBetween } from "./dateUtils";
import { money } from "./formatters";

export const OVERTIME_MULTIPLIER = 1.5; // overtime is paid at 1.5x the hourly wage
export const DEFAULT_HOURS = 8;

const num = (x) => Number(x) || 0;

/*
  Calendar days   = payment date - joining date (+1 if the joining day counts)
  Working days    = calendar days - Sundays (only if "Sunday is a weekly off" is on)
  Days worked     = working days - leaves
  Basic pay       = days worked x daily wage (the position's wage, or a custom one)
  Overtime pay    = overtime hours x (daily wage / working hours) x 1.5
  Net salary      = basic + overtime + bonus - deductions
*/
export function calcSalary(v) {
  const position = findPosition(v.positionId);
  if (!v.joinDate || !v.paymentDate) return { ready: false, position };

  const leavesTaken = num(v.leaves);
  const overtimeHours = num(v.overtime);
  const bonus = num(v.bonus);
  const deductions = num(v.deductions);
  const custom = num(v.wage);

  const calendarDays = daysBetween(v.joinDate, v.paymentDate) + (v.countJoinDay ? 1 : 0);
  const firstCounted = v.countJoinDay ? v.joinDate : addDays(v.joinDate, 1);
  const sundays = v.skipSundays && calendarDays > 0 ? countSundays(firstCounted, v.paymentDate) : 0;
  const workingDays = calendarDays - sundays;
  const daysWorked = workingDays - leavesTaken;

  const rate = custom > 0 ? custom : position ? position.ratePerDay : 0;
  const hours = (position && position.hours) || DEFAULT_HOURS;
  const basic = daysWorked * rate;
  const overtimePay = Math.round(overtimeHours * (rate / hours) * OVERTIME_MULTIPLIER);
  const gross = basic + overtimePay + bonus;
  const net = gross - deductions;

  let error = "";
  if (calendarDays < 0) error = "Date of payment must be on or after the date of joining.";
  else if ([leavesTaken, overtimeHours, bonus, deductions, custom].some((x) => x < 0)) error = "Leaves, overtime, bonus, deductions and wage cannot be negative.";
  else if (leavesTaken > workingDays) error = `Leaves (${leavesTaken}) cannot be more than working days (${workingDays}).`;
  else if (net < 0) error = `Deductions (${money(deductions)}) are more than the earnings (${money(gross)}).`;

  return {
    ready: !error && !!position,
    error, position, rate, hours,
    calendarDays, sundays, workingDays, leavesTaken, daysWorked,
    overtimeHours, overtimePay, bonus, deductions, basic, gross, net,
    attendance: workingDays > 0 ? Math.round((daysWorked / workingDays) * 100) : 0,
  };
}

// the form has one optional "extra amount" that is added to the salary
export function salaryFromForm(v) {
  const extra = v.extra;
  return calcSalary({
    ...v,
    wage: "", // no custom wage: always use the position's wage
    skipSundays: false, // every day between the two dates is a paid day
    overtime: "0",
    bonus: extra,
    deductions: "0",
  });
}
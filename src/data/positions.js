// Daily wage per position (in rupees) and normal working hours per day.
// Edit this list to change positions or amounts.
export const POSITIONS = [
  { id: "manager", label: "Manager", ratePerDay: 2200, hours: 8 },
  { id: "jr-manager", label: "Jr. Manager", ratePerDay: 1500, hours: 8 },
  { id: "supervisor", label: "Supervisor", ratePerDay: 1200, hours: 8 },
  { id: "clerk", label: "Clerk", ratePerDay: 900, hours: 8 },
  { id: "sales-executive", label: "Sales Executive", ratePerDay: 700, hours: 8 },
  { id: "helper", label: "Helper", ratePerDay: 600, hours: 8 },
];

export const findPosition = (id) => POSITIONS.find((p) => p.id === id);

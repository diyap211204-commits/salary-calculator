import { useState } from "react";
import { todayISO } from "../utils/dateUtils";

const createInitial = () => ({
  name: "", email: "", phone: "", address: "",
  positionId: "",
  joinDate: "", paymentDate: todayISO(),
  leaves: "0", countJoinDay: false,
  extra: "0",
});

export default function useEmployeeForm() {
  const [values, setValues] = useState(createInitial);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };

  return {
    values,
    handleChange,
    reset: () => setValues(createInitial()),
    // older slips could hold a deduction; it is no longer supported, so drop it
    load: (saved) => {
      const { extraType, ...rest } = saved;
      setValues({ ...createInitial(), ...rest, extra: extraType === "deduct" ? "0" : rest.extra ?? "0" });
    },
  };
}
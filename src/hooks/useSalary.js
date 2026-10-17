import { useMemo } from "react";
import { salaryFromForm } from "../utils/calcSalary";

export default function useSalary(values) {
  return useMemo(() => salaryFromForm(values), [values]);
}

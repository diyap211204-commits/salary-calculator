import Header from "../components/Header/Header";
import EmployeeDetails from "../components/EmployeeDetails/EmployeeDetails";
import PositionSelect from "../components/PositionSelect/PositionSelect";
import DatesLeaves from "../components/DatesLeaves/DatesLeaves";
import Adjustments from "../components/Adjustments/Adjustments";
import SalarySlip from "../components/SalarySlip/SalarySlip";
import SavedSlips from "../components/SavedSlips/SavedSlips";
import useEmployeeForm from "../hooks/useEmployeeForm";
import useSalary from "../hooks/useSalary";
import useSavedSlips from "../hooks/useSavedSlips";
import "./SalaryCalculatorPage.css";

export default function SalaryCalculatorPage() {
  const { values, handleChange, reset, load } = useEmployeeForm();
  const result = useSalary(values);
  const { slips, save, remove, clear } = useSavedSlips();

  const open = (saved) => {
    load(saved);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page">
      <Header />
      <main className="layout">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <EmployeeDetails values={values} onChange={handleChange} />
          <PositionSelect values={values} onChange={handleChange} />
          <DatesLeaves values={values} onChange={handleChange} error={result.error} />
          <Adjustments values={values} onChange={handleChange} />
          <div className="actions">
            <button type="button" className="btn ghost" onClick={reset}>Reset form</button>
          </div>
        </form>
        <SalarySlip values={values} result={result} onSave={save} />
      </main>
      <SavedSlips slips={slips} onOpen={open} onRemove={remove} onClear={clear} />
    </div>
  );
}
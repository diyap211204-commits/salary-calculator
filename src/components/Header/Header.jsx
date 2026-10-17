import { POSITIONS } from "../../data/positions";
import { money } from "../../utils/formatters";
import "./Header.css";

export default function Header() {
  return (
    <header className="hero">
      <div className="hero-text">
        <span className="badge">Payroll made simple</span>
        <h1>Daily Wage Salary Calculator</h1>
        <p>Pick a position, enter the dates and get a ready-to-print salary slip in seconds.</p>
      </div>
      <div className="rates" aria-label="Daily wages by position">
        <span className="rates-title">Daily wages</span>
        <div className="rate-list">
          {POSITIONS.map((p) => (
            <span key={p.id}><b>{money(p.ratePerDay)}</b>{p.label}</span>
          ))}
        </div>
      </div>
    </header>
  );
}

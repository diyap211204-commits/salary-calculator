import SectionHeader from "../SectionHeader/SectionHeader";
import { POSITIONS, findPosition } from "../../data/positions";
import { money } from "../../utils/formatters";

export default function PositionSelect({ values, onChange }) {
  const chosen = findPosition(values.positionId);

  return (
    <section className="card">
      <SectionHeader step="2" title="Position" hint="Pick a role. Its daily wage is used for the salary." />

      <label className="field">Select position
        <select name="positionId" value={values.positionId} onChange={onChange}>
          <option value="">Choose a position…</option>
          {POSITIONS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label} — {money(p.ratePerDay)}/day · {p.hours} hrs
            </option>
          ))}
        </select>
      </label>

      {chosen && (
        <div className="pos-info">
          <span className="av">{chosen.label[0]}</span>
          <div>
            <b>{chosen.label}</b>
            <small>{chosen.hours} working hours per day</small>
          </div>
          <span className="pos-rate">{money(chosen.ratePerDay)}<small> / day</small></span>
        </div>
      )}

    </section>
  );
}
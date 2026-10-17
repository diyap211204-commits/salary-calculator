import { formatDate } from "../../utils/dateUtils";
import { initials, money } from "../../utils/formatters";
import "./SavedSlips.css";

export default function SavedSlips({ slips, onOpen, onRemove, onClear }) {
  return (
    <section className="saved">
      <div className="saved-head">
        <div>
          <h2>Saved slips</h2>
          <p>Stored in this browser. Open one to edit or print it again.</p>
        </div>
        {slips.length > 0 && <button type="button" className="link" onClick={onClear}>Clear all</button>}
      </div>
      {slips.length === 0 ? (
        <p className="saved-empty">Nothing saved yet. Press Save on a salary slip to keep it here.</p>
      ) : (
        <ul className="saved-grid">
          {slips.map((s) => (
            <li key={s.id}>
              <button type="button" className="saved-open" onClick={() => onOpen(s.values)}>
                <span className="avatar">{initials(s.values.name || "")}</span>
                <span className="saved-info">
                  <b>{s.values.name || "Employee"}</b>
                  <small>{s.role} · paid {formatDate(s.values.paymentDate)}</small>
                </span>
                <span className="saved-net">{money(s.net)}</span>
              </button>
              <button type="button" className="saved-x" onClick={() => onRemove(s.id)} aria-label={`Delete saved slip for ${s.values.name || "employee"}`}>×</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

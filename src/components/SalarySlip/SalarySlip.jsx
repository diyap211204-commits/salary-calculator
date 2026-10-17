import { useState } from "react";
import { formatDate, todayISO } from "../../utils/dateUtils";
import { amountInWords, initials, money } from "../../utils/formatters";
import { isValidPhone } from "../../utils/validators";
import useCountUp from "../../hooks/useCountUp";
import "./SalarySlip.css";

const summaryText = (values, r) =>
  [
    `Salary slip - ${values.name || "Employee"} (${r.position.label})`,
    `Period: ${formatDate(values.joinDate)} to ${formatDate(values.paymentDate)}`,
    `Days worked: ${r.daysWorked} of ${r.workingDays} (leaves: ${r.leavesTaken})`,
    `Basic pay: ${money(r.basic)} (${r.daysWorked} x ${money(r.rate)})`,
    r.overtimePay ? `Overtime (${r.overtimeHours} hrs): ${money(r.overtimePay)}` : null,
    r.bonus ? `Extra added: ${money(r.bonus)}` : null,
    r.deductions ? `Deducted: -${money(r.deductions)}` : null,
    `Net salary: ${money(r.net)}`,
  ].filter(Boolean).join("\n");

export default function SalarySlip({ values, result, onSave }) {
  const [note, setNote] = useState("");
  const r = result;
  const net = useCountUp(r.ready ? r.net : 0);

  const flash = (text) => {
    setNote(text);
    setTimeout(() => setNote(""), 1800);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText(values, r));
      flash("Copied to clipboard");
    } catch {
      flash("Copy not allowed here");
    }
  };
  const whatsapp = () => {
    const to = isValidPhone(values.phone) ? `91${values.phone}` : "";
    window.open(`https://wa.me/${to}?text=${encodeURIComponent(summaryText(values, r))}`, "_blank", "noopener");
  };
  const save = () => {
    onSave(values, r);
    flash("Slip saved");
  };

  return (
    <aside className="slip" aria-live="polite">
      <div className="slip-head">
        <span className="slip-title">Salary slip</span>
        <span className="slip-date">Issued {formatDate(todayISO())}</span>
      </div>

      {!r.ready ? (
        <div className="slip-empty">
          <div className="ring" aria-hidden="true">₹</div>
          <p>{r.error ? "Fix the highlighted issue to see the salary." : "Choose a position and enter both dates. Your salary slip will appear here."}</p>
        </div>
      ) : (
        <>
          <div className="slip-body">
            <div className="who-row">
              <span className="avatar">{initials(values.name)}</span>
              <div>
                <p className="who">{values.name || "Employee"}</p>
                <p className="role">{r.position.label} · {money(r.rate)}/day</p>
              </div>
            </div>

            <div className="attend">
              <div className="attend-top"><span>Attendance</span><b>{r.attendance}%</b></div>
              <div className="attend-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={r.attendance} aria-label="Attendance">
                <i className={r.attendance === 100 ? "full" : ""} style={{ width: r.attendance + "%" }} />
              </div>
              <p>{r.daysWorked} of {r.workingDays} working days worked</p>
            </div>

            <dl className="lines">
              <div><dt>Date of joining</dt><dd>{formatDate(values.joinDate)}</dd></div>
              <div><dt>Date of payment</dt><dd>{formatDate(values.paymentDate)}</dd></div>
              <div><dt>Total days</dt><dd>{r.calendarDays}</dd></div>
              {r.sundays > 0 && <div><dt>Sundays off</dt><dd>− {r.sundays}</dd></div>}
              <div><dt>Leaves taken</dt><dd>− {r.leavesTaken}</dd></div>
              <div className="em"><dt>Days worked</dt><dd>{r.daysWorked}</dd></div>
            </dl>
          </div>

          <div className="tear" />

          <div className="slip-body">
            <dl className="lines pay">
              <div><dt>Basic pay <small>{r.daysWorked} × {money(r.rate)}</small></dt><dd>{money(r.basic)}</dd></div>
              {r.overtimePay > 0 && <div><dt>Overtime <small>{r.overtimeHours} hrs</small></dt><dd className="plus">+ {money(r.overtimePay)}</dd></div>}
              {r.bonus > 0 && <div><dt>Extra added</dt><dd className="plus">+ {money(r.bonus)}</dd></div>}
              {r.deductions > 0 && <div><dt>Deducted</dt><dd className="minus">− {money(r.deductions)}</dd></div>}
            </dl>
          </div>

          <div className="net">
            <span className="net-label">Net salary payable</span>
            <p className="net-amount">{money(net)}</p>
            <p className="net-words">{amountInWords(r.net)}</p>
          </div>

          {(values.email || values.phone || values.address) && (
            <p className="contact">{[values.email, values.phone, values.address].filter(Boolean).join("  |  ")}</p>
          )}

          <div className="slip-actions">
            <button type="button" className="sbtn primary" onClick={() => window.print()}>Print slip</button>
            <button type="button" className="sbtn" onClick={save}>Save</button>
            <button type="button" className="sbtn" onClick={copy}>Copy</button>
            <button type="button" className="sbtn wa" onClick={whatsapp}>WhatsApp</button>
          </div>
          <p className="flash" role="status">{note}</p>
        </>
      )}
    </aside>
  );
}

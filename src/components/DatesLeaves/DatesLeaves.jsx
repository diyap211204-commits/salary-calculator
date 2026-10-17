import SectionHeader from "../SectionHeader/SectionHeader";

export default function DatesLeaves({ values, onChange, error }) {
  return (
    <section className="card">
      <SectionHeader step="3" title="Dates and leaves" hint="Total days are counted from joining date to payment date." />
      <div className="fields">
        <label className="field">Date of joining
          <input name="joinDate" type="date" value={values.joinDate} max={values.paymentDate || undefined} onChange={onChange} />
        </label>
        <label className="field">Date of payment
          <input name="paymentDate" type="date" value={values.paymentDate} min={values.joinDate || undefined} onChange={onChange} />
        </label>
        <label className="field">Total leaves taken (days)
          <input name="leaves" type="number" min="0" value={values.leaves} onChange={onChange} />
        </label>
        <div className="switches">
          <label className="switch">
            <input name="countJoinDay" type="checkbox" checked={values.countJoinDay} onChange={onChange} />
            <span className="sw" aria-hidden="true" />
            Count the joining day as worked
          </label>
        </div>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}
import SectionHeader from "../SectionHeader/SectionHeader";

const QUICK = [100, 200, 500, 1000];

export default function Adjustments({ values, onChange }) {
  // quick buttons reuse the same change handler as the input
  const setAmount = (value) => onChange({ target: { name: "extra", type: "text", value: String(value) } });

  return (
    <section className="card">
      <SectionHeader step="4" title="Extra amount" hint="Optional. Add a bonus or extra payment to the salary." />

      <label className="field">Amount
        <div className="money">
          <span>₹</span>
          <input name="extra" type="number" min="0" inputMode="numeric" value={values.extra} onChange={onChange} placeholder="0" />
        </div>
      </label>

      <div className="quick" aria-label="Quick amounts">
        {QUICK.map((n) => (
          <button key={n} type="button" onClick={() => setAmount(n)}>₹{n}</button>
        ))}
        <button type="button" className="clear" onClick={() => setAmount(0)}>Clear</button>
      </div>
    </section>
  );
}
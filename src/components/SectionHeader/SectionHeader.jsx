export default function SectionHeader({ step, title, hint }) {
  return (
    <div className="sec-head">
      <span className="num">{step}</span>
      <div>
        <h2>{title}</h2>
        {hint && <p>{hint}</p>}
      </div>
    </div>
  );
}

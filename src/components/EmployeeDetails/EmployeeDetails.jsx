import SectionHeader from "../SectionHeader/SectionHeader";
import { isValidEmail, isValidPhone } from "../../utils/validators";

export default function EmployeeDetails({ values, onChange }) {
  const emailBad = values.email && !isValidEmail(values.email);
  const phoneBad = values.phone && !isValidPhone(values.phone);

  return (
    <section className="card">
      <SectionHeader step="1" title="Employee details" hint="Who is this salary for?" />
      <div className="fields">
        <label className="field full">Full name
          <input name="name" value={values.name} onChange={onChange} placeholder="e.g. Rahul Sharma" />
        </label>
        <label className="field">Email
          <input name="email" type="email" value={values.email} onChange={onChange}
            placeholder="name@example.com" className={emailBad ? "bad" : ""} />
          {emailBad && <small>Enter a valid email address.</small>}
        </label>
        <label className="field">Phone
          <input name="phone" inputMode="numeric" maxLength={10} value={values.phone} onChange={onChange}
            placeholder="10-digit mobile number" className={phoneBad ? "bad" : ""} />
          {phoneBad && <small>Phone must be 10 digits.</small>}
        </label>
        <label className="field full">Address
          <textarea name="address" rows="2" value={values.address} onChange={onChange}
            placeholder="House no., street, city, state" />
        </label>
      </div>
    </section>
  );
}

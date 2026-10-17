export const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven",
  "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const below100 = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : ""));
const below1000 = (n) => {
  const hundreds = Math.floor(n / 100), rest = n % 100;
  return [hundreds ? ONES[hundreds] + " Hundred" : "", rest ? below100(rest) : ""].filter(Boolean).join(" ");
};

// 22450 -> "Rupees Twenty Two Thousand Four Hundred Fifty Only" (Indian crore/lakh system)
export function amountInWords(amount) {
  const n = Math.round(amount);
  if (!n) return "Zero Rupees Only";
  const parts = [
    [Math.floor(n / 1e7), "Crore"],
    [Math.floor((n % 1e7) / 1e5), "Lakh"],
    [Math.floor((n % 1e5) / 1e3), "Thousand"],
  ]
    .filter(([v]) => v)
    .map(([v, unit]) => `${below1000(v)} ${unit}`);
  if (n % 1e3) parts.push(below1000(n % 1e3));
  return `Rupees ${parts.join(" ")} Only`;
}

export const initials = (name) =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "E";

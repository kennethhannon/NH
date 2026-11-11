// Simple client-side estimates; tax rules differ by jurisdiction and trade.
const nonnegative = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0 || n > 100_000_000) throw Error('Enter a valid, nonnegative amount.');
  return n;
};
const cents = v => Math.round((v + Number.EPSILON) * 100) / 100;
export function quoteMath({items = [], discountPercent = 0, taxPercent = 0, depositPercent = 0}) {
  if (!Array.isArray(items) || items.length > 200) throw Error('Quotes support 200 items or fewer.');
  const d=nonnegative(discountPercent),t=nonnegative(taxPercent),p=nonnegative(depositPercent);
  if (d > 100 || t > 30 || p > 100) throw Error('Check the discount, tax, and deposit percentages.');
  let subtotal = 0, taxable = 0;
  const lines = items.map(item => {
    const qty=nonnegative(item.qty),rate=nonnegative(item.rate),total=cents(qty*rate);
    if (total > 100_000_000) throw Error('A line item exceeds the supported amount.');
    subtotal+=total;
    if (item.taxable) taxable+=total;
    return {...item,qty,rate,total};
  });
  subtotal=cents(subtotal);taxable=cents(taxable);
  const discount=cents(subtotal*d/100);
  const taxableAfterDiscount=cents(taxable*(1-d/100));
  const salesTax=cents(taxableAfterDiscount*t/100);
  const total=cents(subtotal-discount+salesTax);
  const deposit=cents(total*p/100);
  return {lines,subtotal,discount,taxableAfterDiscount,salesTax,total,deposit,balance:cents(total-deposit)};
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("₱", "₱ "); 
}

export function formatCompactCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    notation: "compact",       
    maximumFractionDigits: 1,   
  })
    .format(amount)
    .replace("₱", "₱ "); 
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 
export const months = monthNames.map((name, index) => ({
  value: String(index + 1),
  label: name,
})); 

export const monthOrder = Object.fromEntries(
  monthNames.map((name, index) => [name, index])
) as Record<string, number>;

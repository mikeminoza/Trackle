export const categories = [
  // Expense Categories
  { value: "food", label: "Food & Dining", type: "expense" },
  { value: "groceries", label: "Groceries", type: "expense" },
  { value: "restaurants", label: "Restaurants / Cafes", type: "expense" },
  { value: "transport", label: "Transportation", type: "expense" },
  { value: "fuel", label: "Fuel / Gas", type: "expense" },
  { value: "taxi", label: "Taxi / Ride-sharing", type: "expense" },
  { value: "public_transport", label: "Public Transport", type: "expense" },
  { value: "shopping", label: "Shopping", type: "expense" },
  { value: "clothing", label: "Clothing & Accessories", type: "expense" },
  { value: "electronics", label: "Electronics / Gadgets", type: "expense" },
  { value: "entertainment", label: "Entertainment", type: "expense" },
  { value: "movies", label: "Movies / Shows", type: "expense" },
  { value: "games", label: "Games / Hobbies", type: "expense" },
  { value: "bills", label: "Bills & Utilities", type: "expense" },
  { value: "electricity", label: "Electricity", type: "expense" },
  { value: "water", label: "Water", type: "expense" },
  { value: "internet", label: "Internet / Phone", type: "expense" },
  { value: "housing", label: "Housing / Rent", type: "expense" },
  { value: "mortgage", label: "Mortgage", type: "expense" },
  { value: "health", label: "Health & Fitness", type: "expense" },
  { value: "medical", label: "Medical / Pharmacy", type: "expense" },
  { value: "gym", label: "Gym / Fitness", type: "expense" },
  { value: "education", label: "Education", type: "expense" },
  { value: "books", label: "Books / Courses", type: "expense" },
  { value: "personal", label: "Personal Care", type: "expense" },
  { value: "insurance", label: "Insurance", type: "expense" },
  { value: "travel", label: "Travel / Vacation", type: "expense" },
  { value: "savings", label: "Savings & Investments", type: "expense" },
  { value: "debt", label: "Debt Payments", type: "expense" },
  { value: "emergency", label: "Emergency Fund", type: "expense" },
  { value: "donations", label: "Charity / Donations", type: "expense" },
  { value: "pets", label: "Pets / Animals", type: "expense" },
  { value: "gifts", label: "Gifts & Occasions", type: "expense" },
  { value: "other_expense", label: "Other Expenses", type: "expense" },

  // Income Categories
  { value: "salary", label: "Salary / Wages", type: "income" },
  { value: "bonus", label: "Bonus / Incentives", type: "income" },
  { value: "business", label: "Business Income", type: "income" },
  { value: "freelance", label: "Freelance / Side Hustle", type: "income" },
  { value: "investments", label: "Investments / Dividends", type: "income" },
  { value: "interest", label: "Bank Interest", type: "income" },
  { value: "gifts", label: "Gifts & Allowances", type: "income" },
  { value: "rental", label: "Rental Income", type: "income" },
  { value: "refunds", label: "Refunds / Rebates", type: "income" },
  { value: "other_income", label: "Other Income", type: "income" },
];

export function getCategoryLabel(value: string) {
  const category = categories.find((c) => c.value === value);
  return category ? category.label : value;  
}

export const expenseCategoryString = categories
  .filter((c) => c.type === "expense")
  .map((c) => c.value)
  .join(", ");

export const incomeCategoryString = categories
  .filter((c) => c.type === "income")
  .map((c) => c.value)
  .join(", ");
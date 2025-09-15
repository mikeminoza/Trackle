# Trackle – Personal Finance & Budgeting Web App

**Trackle** is a modern personal finance tracker designed to help you take control of your money.  
Easily log expenses, set and manage budgets, track savings goals, and gain clear insights into your financial health — all without connecting banks or third-party wallets.

---

## Features

### Transaction Management

- Manually add, edit, and delete income and expenses.
- **Voice Input**
  - Quickly log transactions using speech.
    - Example: Say “Spent 250 pesos on food yesterday” and Trackle will automatically create a transaction

### Budgets

- Set monthly budget limits by category.
- Track spending in real time with visual progress indicators.
- **Budget Carryover**
  - Carry over unspent funds or overspending into the next cycle.
  - Example: If your Food budget is ₱5,000 and you only spend ₱4,000, the remaining ₱1,000 rolls over, making next month’s Food budget ₱6,000.
  - Overspending reduces the available budget for the next month.
- **Recurring Budgets**
  - Automatically renew budgets on a chosen cycle (e.g., monthly, weekly).
  - Combine with carryover to either reset budgets cleanly or continue with leftover/overspent amounts.

### Reports & Dashboards

- View a summary of total income, expenses, and balance.
- Analyze category-wise spending for smarter financial decisions.

### AI-Powered Insights

- Personalized spending insights such as:
  - "You spent 40% more on food this week compared to last week."
  - "Cutting ₱500 from subscriptions could save you ₱6,000 per year."
- Predictive forecasting to alert you when you are close to exceeding a budget.

### Chat Assistant

- Ask natural language questions about your finances, for example:
  - "How much did I spend on transport last week?"
- Get instant answers powered by your local data and Gemini AI.

### Settings & Personalization

- Update your profile details (e.g., name, theme).
- Manage reminders and notifications.
- Reset or clear all data at any time.

---

## Tech Stack

- **Frontend**: Next.js
- **UI Components**: shadcn/ui, TailwindCSS
- **State Management**: Zustand
- **AI Integration**: Google Gemini API
- **Database**: Supabase

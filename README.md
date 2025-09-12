# Trackle – Personal Finance & Budgeting WebApp

Trackle is a modern personal finance tracker that helps you take control of your money.  
Log expenses, set budgets, track savings goals, and gain financial clarity – all without connecting banks or third-party wallets.

---

## Features

### Transaction Management
- Add, edit, and delete income & expenses manually.

### Budgets
- Assign monthly budget limits per category.
- Visual progress bars show spending vs. budget in real-time.
- ### Budget Carryover
  - Option to carry over unspent funds or overspending to the next month.  
  - **Example**: If Food budget is ₱5,000 and you only spend ₱4,000, the remaining ₱1,000 adds to next month’s Food budget (₱6,000).  
  - If overspent, the negative balance reduces next month’s available budget.  
- ### Recurring Budgets
  - Automatically renew budgets every cycle (e.g., monthly, weekly).  
  - **Example**: Food ₱5,000 resets every 1st of the month.  
  - **Combine with carryover**: users can choose whether a recurring budget resets cleanly or rolls over leftover/overspent amounts.  


### Reports & Dashboards
- Dashboard summary: total income, expenses, and balance.
- Category-wise breakdown for smarter spending decisions.

### AI-Powered Insights 
- Spending Insights:  
  - "You spent 40% more on food this week than last week."  
  - "Cutting ₱500 from subscriptions saves ₱6,000/year."  
- Predictive Forecasting: warns when you’re close to exceeding a budget.

### Chat Assistant
- Ask plain-text financial questions such as:  
  - "How much did I spend on transport last week?"  
- AI responds with insights using local data and Gemini AI.

### Settings & Personalization
- Update profile details (name, theme).
- Manage reminders and notifications.
- Option to reset or clear all data.

---

## Tech Stack
- Frontend: Next.js
- UI Components: shadcn/ui + TailwindCSS
- State Management: Zustand
- AI Integration: Google Gemini API
- Database: Supabase

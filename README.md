# Trackle – Personal Finance & Budgeting WebApp  

**Trackle** is a modern personal finance tracker with **AI-powered insights**.  
It helps you log expenses, set budgets, plan savings goals, and gain financial clarity – all without needing banks or third-party wallets.  

---

## Features  

### 1. Transaction Management  
- Add, edit, and delete income & expenses manually.  
- **Quick Entry**: Type `₱350 Jollibee lunch` → Trackle auto-extracts the amount & category with AI.  

### 2. Categories & Budgets  
- Create unlimited custom categories (Food, Rent, Subscriptions, etc.).  
- Assign monthly budget limits per category.  
- Visual progress bars show spending vs. budget in real time.  

### 3. Recurring Reminders  
- Add recurring bills (e.g., Rent ₱5,000 every 30 days).  
- In-app reminders for upcoming payments.  
- Option to auto-log recurring expenses after confirmation.  

### 4. Reports & Dashboards  
- **Dashboard Summary**: total income, expenses, and balance.  
- **Charts & Graphs**:  
  - Pie chart → spending by category.  
  - Line chart → income vs. expenses trend.  
- **Net Worth Tracker**: record assets & liabilities manually.  

### 5. AI-Powered Insights (MVP-friendly)  
- **Smart Categorization**: AI suggests categories when you log expenses.  
- **Spending Insights**:  
  - “You spent 40% more on food this week than last week.”  
  - “Cutting ₱500 from subscriptions saves ₱6,000/year.”  
- **Predictive Forecasting**: AI warns when you’re close to exceeding a budget.  

### 6. Goal Planning  
- Create savings goals (e.g., ₱20k in 6 months).  
- Track progress visually toward each goal.  
- AI suggests a monthly savings plan (e.g., ₱3,333/month).  

### 7. Chat Assistant  
- Ask plain-text financial questions such as:  
  - “How much did I spend on transport last week?”  
- AI responds with insights or charts.  
- MVP implementation uses local data + lightweight AI integration.  

### 8. Settings & Personalization  
- Set profile details (name, currency, theme).  
- Manage reminders & notifications.  
- Reset/clear all local data.  

---

## Tech Stack  

- **Frontend**: Next.js  
- **UI Components**: shadcn/ui + TailwindCSS  
- **State Management**: React Context or Zustand  
- **Charts**: Recharts or Chart.js  
- **AI Integration**: Google Gemini API (free tier for MVP)  
- **Database (optional upgrade)**: Supabase  
- **Storage (MVP)**: LocalStorage (works fully offline)  

---

## MVP Scope  

- Fully functional without sign-up or external services  
- Local-first: all data stored in browser  
- Responsive, mobile-friendly UI built with shadcn/ui  
- Export/Import JSON for manual backup  
- Lightweight AI features for categorization & insights  

---

## Future Enhancements  

- Cloud sync with Supabase or Firebase  
- Advanced AI financial coach (budget optimization, predictive cashflow)  
- Multi-user accounts & shared household budgets  
- SaaS subscription model with premium features (unlimited goals, advanced reports, AI chat)  

---

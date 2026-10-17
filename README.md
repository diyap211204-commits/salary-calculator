# Daily Wage Salary Calculator

```
npm install
npm run dev
```

## Features
- Position cards with daily wages, plus an optional custom daily wage
- Total days from joining date to payment date, minus leaves
- Optional: Sunday as weekly off, count the joining day
- Overtime (1.5x hourly wage), bonus and deductions
- Net salary with amount in words (Indian lakh/crore system) and an attendance bar
- Print the slip, copy a summary, send on WhatsApp
- Save slips in the browser and reopen them later
- "Try sample data" button for a quick demo

## Folder structure
```
src/
  pages/        page layout
  components/   UI pieces (each in its own folder)
  hooks/        useEmployeeForm, useSalary, useSavedSlips, useCountUp
  data/         positions and daily wages  <- edit amounts here
  utils/        calcSalary (all salary maths), dates, money and validation helpers
  styles/       variables, global and shared form styles
```

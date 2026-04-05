# Zorvyn Finance Dashboard

Zorvyn is a modern, responsive Finance Dashboard built with React, Vite, and TailwindCSS. It serves as a comprehensive system for managing and visualizing personal or business transactions.

## Features

* **Interactive Dashboard:** View total balances, income versus expenses, and spending breakdown charts (Recharts).
* **Transaction Management:** Add and delete records via a modal interface.
* **Advanced Data Table:** Fully functional transaction history with support for:
  * Searching by description or category.
  * Filtering via transaction type (Income/Expense).
  * Advanced sorting (Date and Amount).
* **Role-Based Access Control (RBAC):** Simulate Admin viewing vs. Viewer access directly from the UI toolbar. Viewers cannot add or delete data.
* **Data Persistence:** API service layer that mocks network calls and persists data locally to `localStorage`.
* **Dark / Light Mode:** A dynamic CSS variable-based design system that transitions between dark and light themes. 
* **Export Capabilities:** Export transaction grids into local `.csv` and `.json` files.

## Setup Instructions

### Prerequisites
Make sure you have Node.js and npm installed.

### 1. Clone & Install
Navigate into the repository directory and run the following command to download dependencies:

```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Build for Production
To bundle the dashboard for a production environment:
```bash
npm run build
```

## Technology Stack

- **Framework:** React 19 + Vite  
- **Styling:** CSS + Tailwind CSS  
- **Charts:** Recharts  
- **Animations:** Framer Motion  
- **Utilities:** `date-fns` (time parsing), `uuid` (unique IDs)

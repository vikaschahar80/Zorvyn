# Zorvyn Finance Dashboard

Zorvyn is a modern, responsive, and robust Finance Dashboard built with React, Vite, and TailwindCSS. It serves as a comprehensive system for managing and visualizing personal or business transactions, highlighting the best practices of modern web development including state management, fluid animations, dynamic theming, and an architecturally sound front-end structure.

## Features

* **Interactive Dashboard:** View total balances, income versus expenses, spending breakdown charts (Recharts), and automatic identification of your highest spending category.
* **Transaction Management:** Admins can seamlessly add and delete records via an intuitive, animated modal.
* **Advanced Data Table:** Fully functional transaction history with support for:
  * Fuzzy searching by description or category.
  * Rapid filtering via transaction exact type (Income/Expense).
  * Advanced multi-tier sorting (Sort chronologically or by transaction amounts).
* **Role-Based Access Control (RBAC):** Simulate Admin viewing vs. Viewer access directly from the UI toolbar. Viewers cannot add or delete data.
* **Mock API & Data Persistence:** Employs a local simulated asynchronous API service layer to mimic true network lifecycle events (loading states, dynamic rendering) while actually persisting all user data locally to `localStorage`.
* **Dark / Light Mode & Theming:** A dynamic CSS variable-based design system that elegantly transitions between dark and light themes. 
* **Export Capabilities:** Instantly export your currently filtered and sorted transaction grid into local `.csv` and `.json` files respectively at the click of a button.
* **Fluid UI/UX:** Powered by `framer-motion`, providing elegant page transitions, staggering list animations, and smooth mounting.

## Setup Instructions

### Prerequisites
Make sure you have Node.js and npm installed on your device.

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

## Overview of Approach

The application was built following a structured, component-driven approach designed to decouple data logic from UI layers:

1. **Global State Context:** All financial logic, role management, and theme management are wrapped cleanly inside `FinanceContext.jsx`. The context computes expensive insights utilizing React's `useMemo` hooks before dispatching them down to the presentation components, guaranteeing exceptional performance. 
2. **API Mocking Layer:** Rather than tying components directly to browser APIs (`localStorage`), data transactions are funneled through `mockApi.js`. This creates a fake delay using `Promises`, demonstrating exactly how physical asynchronous endpoint logic would work on the frontend before transitioning to `localStorage`. 
3. **Design System & Aesthetics:** The layout structure avoids inline color coding. Instead, `index.css` acts as the single source of truth for semantic design tokens (`--color-main`, `--color-card`) allowing theme changes simply by swapping `data-theme` tags on the document body.
4. **Modularity:** Heavy lifting operations (like CSV JSON exports) are neatly abstracted into pure functional utility files (`export.js`) so that UI components remain laser-focused exclusively on reacting to state updates. 

## Technology Stack

- **Framework:** React 19 + Vite  
- **Styling:** Vanilla CSS Variables + Tailwind CSS  
- **Charts:** Recharts  
- **Animations:** Framer Motion  
- **Utilities:** `date-fns` (time parsing), `uuid` (unique IDs)

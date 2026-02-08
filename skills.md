# Required Skills & Tech Stack for Dashboard Generation

## Core Technologies
* **Framework:** React 18+ (Use Vite or Next.js App Router, depending on user preference; default to Vite for a simple SPA).
* **Language:** TypeScript (Strict mode enabled for type safety).
* **Styling:** Tailwind CSS (for all styling, ensuring a clean, modern, and responsive UI).
* **Icons:** Lucide-React (for UI elements like arrows, calendar icons, etc.).

## Data Processing & Visualization
* **Data Parser:** `xlsx` (SheetJS) to read and parse local Excel files (`DashboardData.xlsx`) directly in the browser.
* **Charts:** `recharts` (Highly customizable, integrates perfectly with React, supports Line, Bar, and Composed/Combo charts).
* **Date Handling:** `date-fns` (for calculating "last week" vs "previous week", parsing dates, and handling the Date Filter logic).

## Key Development Capabilities Expected
* **File Parsing:** Ability to fetch a local `.xlsx` file, read multiple sheets, and extract specific cell values (like E2) or column arrays.
* **State Management:** React hooks (`useState`, `useEffect`, `useMemo`) to manage the global Date Filter, active Tab state, and derived/filtered chart data.
* **Responsive Design:** CSS Grid/Flexbox to ensure the 3-box highlight section and the 2x2 graph grids look beautiful on both desktop and tablet.
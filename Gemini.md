# Project Specification: Gaur Nitai Home Preaching Dashboard

## Overview
A professional, data-driven dashboard visualizing preaching activities for **Gaur Nitai Home**.
The app fetches data directly from a **Google Sheets workbook** (exported as `.xlsx` at runtime) and renders metrics across **three tabs** via a sidebar navigation.

- **Google Sheet ID**: `1GaG2OMMg1TG7avyQpxjwfaVWv2-SVRcQbGurorWtsYg`
- **Fetch URL**: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=xlsx`
- **Parser**: SheetJS (`xlsx` package) — parses the downloaded workbook in-browser (`src/utils/dataParser.ts`)

## Data Source Map
The Google Sheet contains the following critical sheets:
1. **Summary**: Daily tracking (Day, Attendance, New Attendees, New Contacts).
2. **Mentorship**: Mentor/Mentee mapping. Cell `E2` = Mentors Allotted count.
3. **Cumulative Attendance**: Session-wise breakdown (columns: `number of sessions attended in Jan` / `Sessions`, `Number of people` / `People`).
4. **Chanting**: Chanting rounds distribution (columns: `Chanting status` / `Rounds`, `Number`).
5. **BD**: Book Distribution daily stats (columns: Day, Small, Medium, Big, Arjuna, Total).
6. **BD Leaderboard**:
   - Columns A–C: `Name of Devotee`, `Points` → used for Top 10 bar chart.
   - Columns D–K: Devotee names (col D) + weekly point values (cols E–K) → used for BD Time Series chart.
7. **WorkSheets**: Worksheet completion stats (columns: `Worksheets` / `Worsheets`, `Number`).

## Functional Requirements

### 1. Layout & Navigation
- **Sidebar**: Icon-based vertical nav on the left with tooltip labels on hover.
  - Tab 1: `Sessions` (icon: LayoutDashboard) — **default**
  - Tab 2: `Book Distribution` (icon: BookOpen)
  - Tab 3: `Mentoring` (icon: Users)
- **Header**:
  - Logo (`GNHLogo.png`) — Left.
  - Title — Center.
  - Date Range Picker (Start Date, End Date) — Right.
- **Date Range Filter**: Applied to all time-series charts across all tabs.

### 2. Tab 1: Sessions
**KPI Cards (Top):**
1. **Attendance Trend**:
   - *Value*: Last non-empty cell in `Summary[Attendance]`.
   - *Comparison*: % change vs. previous entry → `(Current - Prev) / Prev`.
   - *Visual*: Green Arrow Up if > 0, Red Arrow Down if < 0.
2. **Mentors Allotted**:
   - *Value*: `Mentorship!E2`.
3. **First Timers**:
   - *Value*: Last non-empty cell in `Summary[New Attendees]`.

**Charts (Filtered by Date Range):**
1. **Attendance Line**: `Summary` → X: Day, Y: Attendance.
2. **New Attendees & Contacts (Growth Combo)**: `Summary` → X: Day, Y1: New Attendees (Line), Y2: New Contacts (Line).
3. **Session Popularity**: `Cumulative Attendance` → X: Sessions, Y: People (Bar).
4. **Chanting Stats**: `Chanting` → X: Rounds, Y: Number (Bar).

### 3. Tab 2: Book Distribution
**Charts (Filtered by Date Range):**
1. **Book Trends**: `BD` Sheet → X: Day, Lines: Small, Medium, Big, Arjuna, Total.
2. **Top 10 Distributors (Leaderboard)**: `BD Leaderboard` (cols A–C) → Sort by Points DESC → Top 10 → Bar Chart.
3. **New Attendees & Contacts**: Duplicate of the Growth Combo chart from Sessions tab (`Summary` sheet).
4. **Book Distribution Time Series**: `BD Leaderboard` (cols D–K) → X: Week date, Lines: one per devotee.
   - Title: "Book Distribution Time Series", Subtitle: "Weekly points per devotee".
   - Checkbox legend — defaults to showing only the **top 4** devotees by total points.

### 4. Tab 3: Mentoring
**Charts:**
1. **Mentor Load**: `Mentorship` → X: Mentor name, Y: No. of Mentees (Bar).
2. **Worksheet Progress**: `WorkSheets` → X: Worksheet name, Y: Number (Bar).

## Tech Stack
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS (custom config in `tailwind.config.js`)
- **Charts**: Recharts
- **Excel Parser**: SheetJS (`xlsx`)
- **Icons**: Lucide React

## Design Constraints
- **Color Palette**: Professional Blues, Whites, and soft Grays. Accent: Purple.
- **Typography**: Inter / Roboto (sans-serif, clean).
- **Responsiveness**: Charts must resize automatically; sidebar collapses gracefully on mobile.
- **Animations**: Subtle scroll-in animations (`animate-on-scroll`, staggered with `stagger-1` through `stagger-4`).
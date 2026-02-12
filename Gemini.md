# Project Specification: Gaur Nitai Home Preaching Dashboard

## Overview
A professional, data-driven dashboard visualizing preaching activities. The app reads data from a local file `DashboardData.xlsx` and renders metrics across two tabs.

## Data Source Map
The Excel file contains the following critical sheets:
1. **Summary**: Daily tracking (Day, Attendance, New Attendees, New Contacts).
2. **Mentorship**: Mentor/Mentee mapping.
3. **Cumulative Attendance**: Session-wise breakdown.
4. **Chanting**: Chanting rounds distribution.
5. **BD**: Book Distribution daily stats.
6. **BD Leaderboard**: Points per devotee.
7. **WorkSheets**: Worksheet completion stats.

## Functional Requirements

### 1. Layout & Navigation
- **Header**: 
  - Logo (`GNHLogo.jpeg`) Left.
  - Title Center.
  - Date Range Picker Right (Start Date, End Date).
- **Tabs**: "Sessions" (Default), "Book Distribution and Mentoring".

### 2. Tab 1: Sessions Logic
**KPI Cards (Top):**
1.  **Attendance Trend**: 
    - *Value*: Last non-empty cell in `Summary[Attendance]`.
    - *Comparison*: Calculate % change vs. the previous entry (or 7 days prior, logic: `(Current - Prev) / Prev`). 
    - *Visual*: Green Arrow Up if > 0, Red Arrow Down if < 0.
2.  **Mentors Allotted**: 
    - *Value*: `Mentorship!E2`.
3.  **First Timers**: 
    - *Value*: Last non-empty cell in `Summary[New Attendees]`.

**Charts (Filtered by Date Range):**
1.  **Attendance Line**: `Summary` Sheet -> X: Day, Y: Attendance.
2.  **Growth Combo**: `Summary` Sheet -> X: Day, Y1: New Attendees (Line), Y2: New Contacts (Line).
3.  **Session Popularity**: `Cumulative Attendance` Sheet -> X: Sessions, Y: People.
4.  **Chanting Stats**: `Chanting` Sheet -> X: Rounds, Y: Number.

### 3. Tab 2: BD & Mentoring Logic
**Book Distribution Section:**
1.  **Book Trends (Combo)**: `BD` Sheet -> X: Day, Lines: Small, Medium, Big, Arjuna.
2.  **Top 10 Distributors**: `BD Leaderboard` Sheet -> Sort by Points DESC -> Take Top 10 -> Bar Chart.

**Mentoring Section:**
1.  **Mentor Load**: `Mentorship` Sheet -> X: Mentor, Y: Mentees.
2.  **Worksheet Progress**: `WorkSheets` Sheet -> X: Worsheets, Y: Number.

## Design Constraints
- Color Palette: Professional Blues, Whites, and soft Grays. 
- Typography: Sans-serif, clean (Inter or Roboto).
- Responsiveness: Charts must resize automatically.
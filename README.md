# MelloMinds Dashboard

A modern React TypeScript dashboard application that matches the exact UI design from the provided screenshot, featuring the Urbanist font family and MelloMinds branding.

## Features

- **Responsive Dashboard Layout** - Clean, modern interface with sidebar navigation
- **Project Analytics** - Visual charts showing project data over time
- **Team Collaboration** - Team member management with status tracking
- **Project Progress** - Circular progress chart with completion percentages
- **Time Tracker** - Built-in time tracking with play/pause controls
- **Task Reminders** - Meeting and task reminder system
- **Project Management** - Project listing with due dates and status
- **Urbanist Typography** - Modern, clean font throughout the application
- **Custom Branding** - MelloMinds logo and custom color scheme (#082421)

## Tech Stack

- React 18
- TypeScript
- CSS3 with modern features
- Urbanist Google Font
- SVG icons from the Iconly icon set

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Design & Branding

### **Logo & Identity**
- **MelloMinds Logo** - Custom SVG logo from Frame 2 1 (1).svg
- **Favicon** - Uses the same logo file for browser tab icon
- **Color Scheme** - Primary color: #082421 (deep teal/dark green)

### **Color Palette**
- **Primary:** #082421 (buttons, active states, progress indicators)
- **Secondary:** #064e3b (hover states, darker accents)
- **Background:** #f8f9fa (main background)
- **Cards:** #ffffff (component backgrounds)
- **Text:** #1f2937 (primary text), #6b7280 (secondary text)

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx         # Main dashboard container
│   ├── Sidebar.tsx           # Left navigation sidebar
│   ├── Header.tsx            # Top header with search and user profile
│   ├── MainContent.tsx       # Main content area container
│   ├── StatsCards.tsx        # Project statistics cards
│   ├── ProjectAnalytics.tsx  # Bar chart analytics
│   ├── Reminders.tsx         # Meeting reminders component
│   ├── ProjectList.tsx       # Project list with icons
│   ├── TeamCollaboration.tsx # Team member list
│   ├── ProjectProgress.tsx   # Circular progress chart
│   └── TimeTracker.tsx       # Time tracking widget
├── contexts/
│   └── AuthContext.tsx       # Authentication context and state management
├── App.tsx                   # Root application component with routing
├── index.tsx                 # Application entry point
├── index.css                 # Global styles with Urbanist font
└── react-app-env.d.ts        # TypeScript declarations
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Design Features

The dashboard includes all elements from the original design:

- **Sidebar Navigation** with active states and task counters
- **Search Bar** with keyboard shortcut indicator
- **User Profile** section with avatar and email
- **Statistics Cards** with trend indicators
- **Project Analytics Chart** with interactive bars
- **Meeting Reminders** with video call integration
- **Project List** with colored icons and due dates
- **Team Collaboration** with member avatars and status badges
- **Progress Chart** with completion percentage
- **Time Tracker** with play/pause controls and visual patterns

## Typography

The application uses the **Urbanist** font family throughout:
- Loaded via Google Fonts CDN
- Multiple weights available (300, 400, 500, 600, 700, 800)
- Optimized loading with preconnect links
- Consistent typography across all components

## Assets

The project uses the provided icon assets from the `public` folder:
- Bold Icons (PNG format)
- Bulk Icons (SVG format)
- Light Icons (SVG format) - Primary choice for UI
- Two-tone Icons (SVG format)
- Logo and favicon assets

## Error Resolution

All TypeScript errors are resolved once dependencies are installed:
- React 18 with proper JSX runtime
- TypeScript declarations for React
- Proper tsconfig.json configuration
- React app environment declarations

## Browser Support

This project supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
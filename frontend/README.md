# MelloMinds Dashboard - Frontend

React-based admin dashboard for MelloMinds with real-time notifications and user management.

## 🚀 Features

- User management and analytics
- Real-time notifications via Socket.IO
- Demographic analytics with charts
- Responsive design
- TypeScript support
- Authentication system

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend/README.md)

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. Configure API endpoint:
The frontend is configured to connect to `http://localhost:5001` for the backend API.

To change this, update the API URLs in:
- `src/components/Header.tsx`
- `src/components/NotificationModal.tsx`
- `src/components/AnalyticsCards.tsx`
- `src/components/AllUsers.tsx`
- `src/components/RecentUsersTable.tsx`
- `src/components/UserProfile.tsx`

## 🏃 Running the App

### Development mode:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for production:
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
│   ├── Bold-Icons/
│   ├── Bulk-Icon/
│   └── Light-Icon/
├── src/
│   ├── components/      # React components
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AllUsers.tsx
│   │   ├── NotificationModal.tsx
│   │   └── ...
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── App.tsx          # Main app component
│   ├── App.css
│   ├── index.tsx        # Entry point
│   └── index.css
├── package.json
└── tsconfig.json
```

## 🎨 Key Components

### Dashboard
Main dashboard view with analytics cards and recent users.

### Header
Top navigation with notifications bell and user profile.

### Sidebar
Left navigation menu with page links.

### AllUsers
User management table with search, filters, and pagination.

### NotificationModal
Real-time notification center with Socket.IO integration.

### Analytics
Demographic analytics with location-based insights.

### UserProfile
Detailed user view with edit capabilities.

## 🔌 Real-time Features

The frontend uses Socket.IO client to receive real-time updates:

- **New notifications** appear instantly
- **Badge counts** update automatically
- **Multi-tab sync** - changes reflect across all open tabs

## 🚀 Deployment

### Deploy to Vercel:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
- Update API URLs to point to your production backend

### Deploy to Netlify:

1. Build the app:
```bash
npm run build
```

2. Deploy the `build` folder to Netlify

3. Configure environment variables for production API URLs

### Deploy to AWS S3 + CloudFront:

1. Build the app:
```bash
npm run build
```

2. Upload `build` folder to S3 bucket

3. Configure CloudFront distribution

4. Update API URLs for production

## 🔧 Configuration

### API Endpoints
Update these files to change backend API URL:
- All components making API calls use `http://localhost:5001`
- For production, replace with your production API URL

### Socket.IO Connection
Update Socket.IO connection in:
- `src/components/Header.tsx` - Line with `io('http://localhost:5001')`
- `src/components/NotificationModal.tsx` - Line with `io('http://localhost:5001')`

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🎨 Styling

- CSS Modules for component-specific styles
- Global styles in `index.css`
- Custom fonts: Urbanist
- Icon library: Iconly (Light, Bold, Bulk variants)

## 🧪 Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

## 📝 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 🔒 Authentication

The app uses a context-based authentication system:
- `AuthContext` provides login/logout functionality
- Protected routes redirect to login
- Session management via localStorage

## 📞 Support

For issues or questions, please contact the development team.

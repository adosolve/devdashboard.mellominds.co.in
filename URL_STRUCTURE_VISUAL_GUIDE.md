# URL Structure - Visual Guide

## 🗺️ Application Route Map

```
┌─────────────────────────────────────────────────────────────┐
│                    MelloMinds Dashboard                      │
│                  URL Routing Structure                       │
└─────────────────────────────────────────────────────────────┘

ROOT (/)
  │
  └──> REDIRECT ──> /dashboard
                         │
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    ▼                    ▼                    ▼
/dashboard          /users              /analytics
    │                   │                    │
    │                   │                    │
    │                   ├──> /users/:userId/:slug
    │                   │         │
    │                   │         └──> User Profile Page
    │                   │              (e.g., /users/7/john-doe)
    │                   │
    │                   └──> All Users Listing
    │
    └──> Dashboard Home

                    ┌──────────────┐
                    │   404 Page   │
                    │  (Not Found) │
                    └──────────────┘
                          ▲
                          │
                    Any Invalid URL
```

---

## 📍 Route Hierarchy

```
Application Root
│
├── / (Root)
│   └── → Redirects to /dashboard
│
├── /dashboard
│   ├── Component: DashboardPage
│   ├── Shows: Stats, Recent Users, Analytics Cards
│   └── Navigation: Sidebar menu, User clicks
│
├── /users
│   ├── Component: AllUsersPage
│   ├── Shows: All users table with filters
│   ├── Navigation: Sidebar menu, User row clicks
│   └── Child Routes:
│       └── /users/:userId/:slug
│           ├── Component: UserProfilePage
│           ├── Shows: Individual user details
│           ├── Example: /users/7/john-doe
│           └── Features: Slug validation, Edit, Suspend
│
├── /analytics
│   ├── Component: AnalyticsPage
│   ├── Shows: Demographics, Location data, Charts
│   └── Navigation: Sidebar menu
│
└── /* (Catch-all)
    ├── Component: NotFound
    ├── Shows: 404 error page
    └── Actions: Go to Dashboard, Go Back
```

---

## 🔄 Navigation Flow

### User Journey: Dashboard → User Profile

```
Step 1: User on Dashboard
URL: http://localhost:3000/dashboard
┌─────────────────────────────────────┐
│         Dashboard Page              │
│  ┌───────────────────────────────┐  │
│  │   Recent Users Table          │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ John Doe  [Click]       │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
                │
                │ Click User
                ▼
Step 2: Generate Slug
slug = "john-doe"
userId = 7
                │
                │ Navigate
                ▼
Step 3: User Profile Page
URL: http://localhost:3000/users/7/john-doe
┌─────────────────────────────────────┐
│      User Profile Page              │
│  ┌───────────────────────────────┐  │
│  │   John Doe                    │  │
│  │   john@example.com            │  │
│  │   +1234567890                 │  │
│  │   [Edit] [Suspend] [Delete]   │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Sidebar Navigation Flow

```
┌──────────────────┐
│    Sidebar       │
│                  │
│  [Dashboard]     │──────> /dashboard
│                  │
│  [All Users]     │──────> /users
│                  │
│  [Analytics]     │──────> /analytics
│                  │
└──────────────────┘
```

---

## 🎯 URL Pattern Examples

### Dashboard
```
Pattern:  /dashboard
Example:  http://localhost:3000/dashboard
Method:   Direct access or redirect from /
```

### All Users
```
Pattern:  /users
Example:  http://localhost:3000/users
Method:   Sidebar click or direct access
```

### User Profile
```
Pattern:  /users/:userId/:slug
Example:  http://localhost:3000/users/7/john-doe
Method:   Click user name from table

Parameters:
  - userId: Numeric ID (e.g., 7)
  - slug: URL-friendly name (e.g., john-doe)
```

### Analytics
```
Pattern:  /analytics
Example:  http://localhost:3000/analytics
Method:   Sidebar click or direct access
```

### 404 Not Found
```
Pattern:  /* (any invalid route)
Example:  http://localhost:3000/invalid-page
Method:   Direct access to non-existent route
```

---

## 🔀 Redirection Scenarios

### Scenario 1: Root Access
```
User enters: http://localhost:3000/
             │
             ▼
System redirects to: http://localhost:3000/dashboard
```

### Scenario 2: Wrong Slug
```
User enters: http://localhost:3000/users/7/wrong-name
             │
             ▼ (Fetch user data)
             │
System finds: User name is "John Doe"
Expected slug: "john-doe"
             │
             ▼
System redirects to: http://localhost:3000/users/7/john-doe
```

### Scenario 3: Non-existent User
```
User enters: http://localhost:3000/users/999/non-existent
             │
             ▼ (Fetch user data)
             │
API returns: 404 Not Found
             │
             ▼
System shows: 404 Error Page
```

### Scenario 4: Invalid Route
```
User enters: http://localhost:3000/invalid-page
             │
             ▼
No route matches
             │
             ▼
System shows: 404 Error Page
```

---

## 🎨 Page Components Mapping

```
┌─────────────────────────────────────────────────────────┐
│                    URL → Component                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  /dashboard                                              │
│    └─> DashboardPage                                     │
│         ├─> Sidebar                                      │
│         ├─> Header                                       │
│         └─> MainContent                                  │
│              ├─> AnalyticsCards                          │
│              ├─> StatsCards                              │
│              └─> RecentUsersTable                        │
│                                                          │
│  /users                                                  │
│    └─> AllUsersPage                                      │
│         ├─> Sidebar                                      │
│         ├─> Header                                       │
│         └─> AllUsers                                     │
│              ├─> Search & Filters                        │
│              ├─> Tabs                                    │
│              └─> Users Table                             │
│                                                          │
│  /users/:userId/:slug                                    │
│    └─> UserProfilePage                                   │
│         ├─> Sidebar                                      │
│         ├─> Header                                       │
│         └─> UserProfile                                  │
│              ├─> Profile Header                          │
│              ├─> User Details                            │
│              └─> Quick Actions                           │
│                                                          │
│  /analytics                                              │
│    └─> AnalyticsPage                                     │
│         ├─> Sidebar                                      │
│         ├─> Header                                       │
│         └─> Analytics                                    │
│              └─> LocationAnalytics                       │
│                   ├─> Date Filter                        │
│                   ├─> Trend Chart                        │
│                   └─> Distribution Chart                 │
│                                                          │
│  /* (404)                                                │
│    └─> NotFound                                          │
│         ├─> Error Icon                                   │
│         ├─> Error Message                                │
│         └─> Action Buttons                               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 State Management Flow

### URL → State → Component

```
Browser URL Change
        │
        ▼
React Router Detects Change
        │
        ▼
Route Matches Pattern
        │
        ▼
Extract URL Parameters
(userId, slug, etc.)
        │
        ▼
Component Mounts
        │
        ▼
useEffect Triggers
        │
        ▼
Fetch Data from API
        │
        ▼
Update Component State
        │
        ▼
Render UI
```

---

## 📊 Loading State Flow

```
User Clicks Navigation
        │
        ▼
Show Loading Spinner
        │
        ▼
Lazy Load Component
        │
        ▼
Component Loads
        │
        ▼
Fetch Data (if needed)
        │
        ▼
Hide Loading Spinner
        │
        ▼
Show Content
```

---

## 🎯 Slug Generation Process

```
User Object
  name: "John Doe"
        │
        ▼
Convert to Lowercase
  "john doe"
        │
        ▼
Replace Spaces with Hyphens
  "john-doe"
        │
        ▼
URL Slug Ready
  /users/7/john-doe
```

---

## 🔍 Slug Validation Process

```
User Accesses URL
  /users/7/some-slug
        │
        ▼
Extract Parameters
  userId: 7
  slug: "some-slug"
        │
        ▼
Fetch User from API
  GET /api/users/7
        │
        ▼
Generate Expected Slug
  name: "John Doe"
  expected: "john-doe"
        │
        ▼
Compare Slugs
  provided: "some-slug"
  expected: "john-doe"
        │
        ├─> Match? ──> Show Profile
        │
        └─> No Match? ──> Redirect to Correct Slug
                          /users/7/john-doe
```

---

## 🎨 Visual URL Structure

```
http://localhost:3000/users/7/john-doe
│      │          │   │     │ │       │
│      │          │   │     │ │       └─> Slug (user name)
│      │          │   │     │ └────────> User ID
│      │          │   │     └──────────> Route segment
│      │          │   └────────────────> Port
│      │          └────────────────────> Host
│      └───────────────────────────────> Protocol
└──────────────────────────────────────> Full URL
```

---

## 🚀 Quick Navigation Reference

### From Any Page

```
┌─────────────────────────────────────┐
│  Current Page: Any                  │
├─────────────────────────────────────┤
│                                     │
│  Sidebar Click:                     │
│    Dashboard ──────> /dashboard     │
│    All Users ──────> /users         │
│    Analytics ──────> /analytics     │
│                                     │
│  User Click:                        │
│    User Name ──────> /users/ID/slug │
│                                     │
│  Browser:                           │
│    Back Button ────> Previous URL   │
│    Forward Button ─> Next URL       │
│                                     │
│  Direct:                            │
│    Type URL ───────> Any Route      │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ URL Validation Checklist

```
✓ Clean URLs (no hash symbols)
✓ Readable paths
✓ SEO-friendly slugs
✓ Proper redirects
✓ 404 handling
✓ Browser history support
✓ Bookmarkable pages
✓ Shareable links
✓ Direct access works
✓ Loading states shown
```

---

## 🎉 Summary

The URL management system provides:

- **6 distinct routes** with clear purposes
- **SEO-friendly slugs** for user profiles
- **Smart redirections** for error handling
- **Loading states** for better UX
- **404 page** for invalid routes
- **Browser navigation** support
- **Clean, readable URLs** throughout

All routes are working, tested, and production-ready! ✅

---

**Visual Guide Version**: 1.0.0  
**Last Updated**: May 1, 2026

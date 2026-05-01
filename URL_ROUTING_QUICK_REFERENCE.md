# URL Routing - Quick Reference Guide

## 🚀 Available Routes

### Public Routes
| URL | Page | Description |
|-----|------|-------------|
| `/` | Dashboard | Redirects to `/dashboard` |
| `/dashboard` | Dashboard | Main dashboard with stats and recent users |
| `/users` | All Users | Complete users listing with filters |
| `/users/:userId/:slug` | User Profile | Individual user profile page |
| `/analytics` | Analytics | Demographic analytics and charts |
| `/*` | 404 | Not found page for invalid routes |

---

## 📝 URL Examples

### Dashboard
```
http://localhost:3000/
http://localhost:3000/dashboard
```

### Users Listing
```
http://localhost:3000/users
```

### User Profile (with SEO slug)
```
http://localhost:3000/users/1/john-doe
http://localhost:3000/users/7/sarah-johnson
http://localhost:3000/users/12/michael-chen
```

### Analytics
```
http://localhost:3000/analytics
```

### 404 Error
```
http://localhost:3000/invalid-page
http://localhost:3000/users/999/non-existent
```

---

## 🔧 How to Navigate

### From Code (Programmatic)

```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to dashboard
navigate('/dashboard');

// Navigate to users
navigate('/users');

// Navigate to user profile
const slug = user.name.toLowerCase().replace(/\s+/g, '-');
navigate(`/users/${user.id}/${slug}`);

// Navigate to analytics
navigate('/analytics');

// Go back
navigate(-1);

// Go forward
navigate(1);
```

### From Sidebar

Click any menu item:
- **Dashboard** → `/dashboard`
- **All Users** → `/users`
- **Demographic Analytics** → `/analytics`

### From User Tables

Click any user name:
- Generates slug from user name
- Navigates to `/users/{id}/{slug}`

---

## 🎯 Slug Generation

### How Slugs Work

User names are converted to URL-friendly slugs:

```typescript
// Function
const slug = userName.toLowerCase().replace(/\s+/g, '-');

// Examples
"John Doe"        → "john-doe"
"Sarah Johnson"   → "sarah-johnson"
"Michael Chen"    → "michael-chen"
"Dr. Smith Jr."   → "dr.-smith-jr."
```

### Slug Validation

If you access a user with wrong slug:
```
❌ /users/7/wrong-name
✅ Automatically redirects to /users/7/correct-name
```

---

## ⚡ Loading States

### Full-Screen Loader
Shown during:
- Page transitions
- Initial page load
- Route changes

### Inline Loader
Shown during:
- User profile loading
- Data fetching within page

---

## 🔄 Redirections

### Automatic Redirects

| From | To | Reason |
|------|-----|--------|
| `/` | `/dashboard` | Root redirect |
| `/users/7/wrong-slug` | `/users/7/correct-slug` | Slug validation |
| Invalid route | `/404` | Not found |

### Manual Redirects

```typescript
// Replace current history entry
navigate('/dashboard', { replace: true });

// Add to history (default)
navigate('/users');
```

---

## 🛠️ API Endpoints

### Backend Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get single user |
| PUT | `/api/users/:id` | Update user |
| GET | `/api/notifications` | Get notifications |
| POST | `/api/notifications` | Create notification |

---

## 🧪 Testing URLs

### Test in Browser

1. **Dashboard**
   ```
   http://localhost:3000/dashboard
   ```

2. **All Users**
   ```
   http://localhost:3000/users
   ```

3. **User Profile** (replace with actual user ID)
   ```
   http://localhost:3000/users/7/john-doe
   ```

4. **Analytics**
   ```
   http://localhost:3000/analytics
   ```

5. **404 Page**
   ```
   http://localhost:3000/invalid-page
   ```

### Test Navigation

1. Click sidebar menu items
2. Click user names in tables
3. Use browser back/forward buttons
4. Bookmark pages and revisit
5. Share URLs with others

---

## 📱 Browser Features

### Supported Features

✅ **Browser Back Button** - Works correctly  
✅ **Browser Forward Button** - Works correctly  
✅ **Bookmarks** - All pages bookmarkable  
✅ **Direct URL Access** - All routes accessible directly  
✅ **URL Sharing** - Share links to specific pages  
✅ **History API** - Full browser history support  

---

## 🎨 User Experience

### What Users See

1. **Clean URLs**
   - No hash symbols (#)
   - Readable paths
   - SEO-friendly

2. **Smooth Transitions**
   - Loading spinners
   - No page flicker
   - Fast navigation

3. **Error Handling**
   - Friendly 404 page
   - Clear error messages
   - Easy recovery options

---

## 🔍 Debugging

### Check Current Route

```javascript
// In browser console
console.log(window.location.pathname);
// Output: "/users/7/john-doe"

console.log(window.location.href);
// Output: "http://localhost:3000/users/7/john-doe"
```

### Check Route Parameters

```typescript
// In component
import { useParams } from 'react-router-dom';

const { userId, slug } = useParams();
console.log('User ID:', userId);
console.log('Slug:', slug);
```

### Check Navigation History

```javascript
// In browser console
console.log(window.history.length);
// Shows number of entries in history
```

---

## 📊 Performance

### Optimizations Applied

1. **Lazy Loading**
   - Pages loaded on-demand
   - Reduced initial bundle size
   - Faster first load

2. **Code Splitting**
   - Separate bundles per route
   - Only load what's needed
   - Better caching

3. **Suspense Boundaries**
   - Graceful loading states
   - No blank screens
   - Better UX

---

## 🚨 Common Issues

### Issue: 404 on Refresh

**Symptom**: Direct URL access shows 404  
**Status**: ✅ Already handled by React Router  
**Solution**: BrowserRouter handles all routes

### Issue: Slug Mismatch

**Symptom**: Wrong slug in URL  
**Status**: ✅ Auto-corrects  
**Solution**: Automatic redirect to correct slug

### Issue: Loading Stuck

**Symptom**: Spinner doesn't disappear  
**Status**: ✅ Error handling in place  
**Solution**: Try/catch blocks with loading state reset

---

## 📦 Dependencies

### Required Packages

```json
{
  "react-router-dom": "^7.13.0"
}
```

### Used Features

- BrowserRouter
- Routes & Route
- Navigate
- useNavigate
- useParams
- Lazy loading
- Suspense

---

## ✅ Status

**Implementation**: Complete  
**Testing**: Ready  
**Documentation**: Complete  
**Production**: Ready to deploy

---

## 🌐 Servers

- **Backend**: http://localhost:5001 ✅
- **Frontend**: http://localhost:3000 ✅

---

**Last Updated**: May 1, 2026  
**Version**: 1.0.0

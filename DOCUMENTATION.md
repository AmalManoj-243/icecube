# Ice Cube POS Application - Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features Implemented](#features-implemented)
5. [API Integration](#api-integration)
6. [User Management](#user-management)
7. [Orders Management](#orders-management)
8. [Authentication & Authorization](#authentication--authorization)
9. [UI Components](#ui-components)
10. [Configuration](#configuration)
11. [Build & Deployment](#build--deployment)

---

## Overview

Ice Cube is a mobile Point of Sale (POS) application built with React Native and Expo, integrated with Odoo 19 ERP system. The application is designed for ice cream shops and retail businesses to manage sales, inventory, users, and orders through a mobile interface.

**Package Information:**
- App Name: icecube
- Slug: vendingmachine
- Version: 1.1.0
- Package: com.danat.alphalize
- Owner: mightyraju

---

## Technology Stack

### Frontend
- **React Native** - Mobile application framework
- **Expo** - Development platform and build service
- **React Navigation** - Navigation library (Stack Navigator)
- **Zustand** - State management
- **FlashList** (@shopify/flash-list) - High-performance list rendering
- **React Native Snap Carousel** - Image carousel component
- **React Native Toast Message** - Toast notifications
- **React Native Vector Icons** - Material Icons

### Backend Integration
- **Odoo 19** - ERP backend system
- **Axios** - HTTP client for API requests
- **JSON-RPC 2.0** - Communication protocol with Odoo

### Development Tools
- **EAS (Expo Application Services)** - Build and deployment
- **AsyncStorage** - Local data persistence

---

## Architecture

### Project Structure
```
Ice-Cube-main/
├── src/
│   ├── api/
│   │   └── services/
│   │       └── generalApi.js          # Odoo API integration
│   ├── components/
│   │   ├── Home/
│   │   │   ├── CarouselPagination.js  # Home carousel
│   │   │   └── Header.js              # Home header
│   │   ├── Header/                    # Navigation headers
│   │   ├── Loader/                    # Loading components
│   │   ├── Toast/                     # Toast notifications
│   │   ├── containers/                # Layout containers
│   │   └── common/                    # Reusable components
│   ├── screens/
│   │   ├── Home/
│   │   │   └── HomeScreen.js          # Main home screen
│   │   ├── Users/
│   │   │   ├── UsersScreen.js         # User management
│   │   │   └── index.js
│   │   ├── MyOrders/
│   │   │   ├── MyOrdersScreen.js      # POS orders screen
│   │   │   └── index.js
│   │   ├── Products/                  # Product management
│   │   └── POSRegister/               # POS register
│   ├── stores/
│   │   └── auth/
│   │       └── useAuthStore.js        # Authentication store
│   ├── hooks/                         # Custom React hooks
│   ├── navigation/
│   │   └── StackNavigator.js          # App navigation
│   └── constants/
│       └── theme.js                   # Theme constants
├── assets/                            # Images and resources
├── app.json                           # Expo configuration
├── eas.json                           # EAS build configuration
└── package.json                       # Dependencies
```

### Design Patterns
- **Component-Based Architecture** - Modular, reusable components
- **Custom Hooks** - Shared business logic (useDataFetching, useDebouncedSearch)
- **State Management** - Zustand for global state (authentication)
- **API Service Layer** - Centralized API calls in generalApi.js

---

## Features Implemented

### 1. Home Screen Dashboard
**Location:** `src/screens/Home/HomeScreen.js`

Features:
- Image carousel with auto-play (3-second intervals)
- Six main action buttons:
  - **POS** - Point of Sale register
  - **Sales Report** - Sales analytics
  - **Products** - Product catalog management
  - **Users** - User management (admin only)
  - **Orders** - POS order history
- Custom purple theme (#461c8aff)
- Double-tap back button to exit app
- Admin permission checks for restricted features

#### Action Buttons Layout
```
Row 1: [POS] [Sales Report] [Products]
Row 2: [Users] [Orders]
```

#### Button Images
- POS: `@assets/images/Home/section/possss.png`
- Sales Report: `@assets/images/Home/section/salesreportbtn.png`
- Products: `@assets/images/Home/section/productsbutton.png`
- Users: `@assets/images/Home/section/userbtnhome.png`
- Orders: `@assets/images/Home/section/ordersbtnhome.png`

### 2. Carousel Component
**Location:** `src/components/Home/CarouselPagination.js`

Features:
- 5 slideshow images (slideshow1.png - slideshow5.png)
- Auto-play with 3-second intervals
- Smooth transitions with scale/opacity effects
- Pagination dots indicator
- `resizeMode: 'contain'` - Displays full images without cropping
- Card-style design with shadows and rounded corners

Configuration:
```javascript
sliderWidth: screenWidth
itemWidth: screenWidth - 60
autoplayInterval: 3000
inactiveSlideScale: 0.9
inactiveSlideOpacity: 0.7
```

### 3. User Management System
**Location:** `src/screens/Users/UsersScreen.js`

#### Features:
- **View Users** - List all Odoo users with search
- **Create Users** - Add new users via modal form
- **Admin-Only Access** - Two-layer permission system
- **Search Functionality** - Real-time search with 500ms debounce
- **Pagination** - Load 50 users per page with infinite scroll
- **Empty State** - Visual feedback when no users found

#### User Card Display:
- User icon with purple theme
- Name (bold, primary)
- Login username (@username)
- Email address
- Phone number
- Active/Inactive status badge

#### Create User Form Fields:
- **Name*** (required) - Full name
- **Login*** (required) - Username
- **Password*** (required) - User password
- **Email** (optional) - Email address
- **Phone** (optional) - Phone number

#### Admin Permission Logic:
```javascript
const isAdmin = authUser?.uid === 2 ||
                authUser?.is_admin === true ||
                authUser?.is_superuser === true;
```

#### Security Layers:
1. **HomeScreen Navigation Check** - Shows toast message if non-admin clicks Users button
2. **UsersScreen Component Check** - Displays "Access Denied" screen with lock icon

### 4. Orders Management System
**Location:** `src/screens/MyOrders/MyOrdersScreen.js`

#### Features:
- **View POS Orders** - Display orders from pos.order model
- **Search Orders** - Search by order name, customer, or salesperson
- **Pagination** - 50 orders per page with infinite scroll
- **Status Color Coding** - Visual status indicators
- **Date Formatting** - Human-readable date display
- **Amount Formatting** - Currency display with 2 decimal places

#### Order Card Display:
- Order icon (receipt icon)
- Order number/name
- Status badge with color
- Total amount (right-aligned, bold, purple)
- Customer name (with person icon)
- Salesperson name
- Order date (formatted: MMM DD, YYYY)

#### POS Order States:
| State | Label | Color |
|-------|-------|-------|
| draft | New | Gray (#9e9e9e) |
| paid | Paid | Green (#4caf50) |
| done | Posted | Light Green (#8bc34a) |
| invoiced | Invoiced | Blue (#2196f3) |
| cancel | Cancelled | Red (#f44336) |

### 5. Authentication & Session Management
**Location:** `src/stores/auth/useAuthStore.js`

#### Zustand Store Structure:
```javascript
{
  isLoggedIn: boolean,
  user: {
    uid: number,
    name: string,
    login: string,
    is_admin: boolean,
    is_superuser: boolean,
    // ... other user fields
  },
  login: async (userData) => void,
  logout: () => void
}
```

#### Features:
- Persistent user session (AsyncStorage)
- User authentication state
- Admin status tracking
- Session management

### 6. POS Session Management
**Location:** Integrated in generalApi.js

#### Close POS Session:
- Function: `closePOSSesionOdoo`
- Validates session ID
- Calls Odoo's `action_pos_session_close` method
- Returns error if draft orders exist
- Proper error handling for business rules

---

## API Integration

### Base Configuration
**Location:** `src/api/services/generalApi.js`

#### Odoo Connection:
```javascript
const ODOO_BASE_URL = "http://your-odoo-server.com"
// Communication endpoint
POST ${ODOO_BASE_URL}/web/dataset/call_kw
```

### API Functions Implemented

#### 1. Create User in Odoo
**Function:** `createUserOdoo`

**Parameters:**
```javascript
{
  name: string (required),
  login: string (required),
  password: string (required),
  email: string (optional),
  phone: string (optional),
  groups: array (optional)
}
```

**Odoo Model:** `res.users`
**Method:** `create`

**Returns:**
```javascript
{
  result: userId,  // On success
  error: object    // On failure
}
```

**Implementation Details:**
- Validates required fields (name, login, password)
- Supports optional group assignments
- Error handling for duplicate users
- Returns Odoo-generated user ID

#### 2. Fetch Users from Odoo
**Function:** `fetchUsersOdoo`

**Parameters:**
```javascript
{
  offset: number (default: 0),
  limit: number (default: 50),
  searchText: string (default: '')
}
```

**Odoo Model:** `res.users`
**Method:** `search_read`

**Fields Retrieved:**
- id
- name
- login
- email
- phone
- active

**Search Logic:**
```javascript
domain = [
  '|',
  ['name', 'ilike', searchTerm],
  ['login', 'ilike', searchTerm]
]
```

**Sorting:** `name asc`

**Returns:** Array of user objects

#### 3. Fetch POS Orders from Odoo
**Function:** `fetchOrdersOdoo`

**Parameters:**
```javascript
{
  offset: number (default: 0),
  limit: number (default: 50),
  searchText: string (default: '')
}
```

**Odoo Model:** `pos.order`
**Method:** `search_read`

**Fields Retrieved:**
- id
- name (order reference)
- partner_id (customer)
- user_id (salesperson)
- date_order
- amount_total
- state

**Search Logic:**
```javascript
domain = [
  '|',
  '|',
  ['name', 'ilike', searchTerm],
  ['partner_id', 'ilike', searchTerm],
  ['user_id', 'ilike', searchTerm]
]
```

**Sorting:** `date_order desc` (newest first)

**Returns:** Array of order objects

#### 4. Close POS Session
**Function:** `closePOSSesionOdoo`

**Parameters:**
```javascript
{
  sessionId: number (required)
}
```

**Odoo Model:** `pos.session`
**Method:** `action_pos_session_close`

**Returns:**
```javascript
{
  success: true,
  result: object     // On success
}
// OR
{
  error: object      // On failure (e.g., draft orders exist)
}
```

**Validation:**
- Checks for draft orders
- Validates session state
- Returns Odoo business rule errors

### Error Handling Pattern
All API functions follow this pattern:
```javascript
try {
  const response = await axios.post(ODOO_BASE_URL, payload);

  if (response.data && response.data.error) {
    console.error('[FUNCTION] Odoo error:', response.data.error);
    return { error: response.data.error };
  }

  return response.data.result;
} catch (error) {
  console.error('[FUNCTION] error:', error);
  throw error;
}
```

---

## Custom Hooks

### 1. useDataFetching
**Purpose:** Generic data fetching with pagination

**Features:**
- Initial data fetch
- Load more (pagination)
- Loading states
- Error handling
- Data accumulation

**Usage:**
```javascript
const { data, loading, fetchData, fetchMoreData } = useDataFetching(fetchFunction);
```

### 2. useDebouncedSearch
**Purpose:** Debounced search input

**Features:**
- 500ms debounce delay
- Prevents excessive API calls
- Automatic cleanup

**Usage:**
```javascript
const { searchText, handleSearchTextChange } = useDebouncedSearch(
  (text) => fetchData({ searchText: text }),
  500
);
```

### 3. useLoader
**Purpose:** Loading state management

**Features:**
- Boolean loading state
- Overlay loader integration

---

## UI Components

### Common Components

#### 1. NavigationHeader
**Location:** `@components/Header`

**Features:**
- Back button with navigation
- Title text
- Consistent styling
- Purple theme integration

#### 2. SearchContainer
**Location:** `@components/containers`

**Features:**
- Search input field
- Icon integration
- Placeholder text
- onChange handler
- Debounced input support

#### 3. RoundedContainer
**Location:** `@components/containers`

**Features:**
- Rounded top corners
- White background
- Standard padding
- Shadow effects

#### 4. SafeAreaView
**Location:** `@components/containers`

**Features:**
- Safe area insets
- Status bar handling
- Background color support

#### 5. EmptyState
**Location:** `@components/common/empty`

**Features:**
- Empty data illustration
- Customizable message
- Centered layout

#### 6. OverlayLoader
**Location:** `@components/Loader`

**Features:**
- Full-screen overlay
- Spinner animation
- Blocks user interaction
- Visibility toggle

#### 7. TextInput (FormInput)
**Location:** `@components/common/TextInput`

**Features:**
- Label support
- Error message display
- Placeholder text
- Keyboard type options
- Secure text entry (passwords)
- Auto-capitalization control

### Styling Theme

#### Primary Colors:
- **Primary Purple:** #461c8aff
- **Background:** #f5f0ff (light purple)
- **White:** #ffffff
- **Text Dark:** #2d2d2d
- **Text Gray:** #666666
- **Text Light Gray:** #999999

#### Status Colors:
- **Success/Paid:** #4caf50 (green)
- **Posted:** #8bc34a (light green)
- **Info/Invoiced:** #2196f3 (blue)
- **Draft/New:** #9e9e9e (gray)
- **Error/Cancelled:** #f44336 (red)

#### Button Styles:
```javascript
{
  width: 90,
  height: 90,
  borderRadius: 22,
  backgroundColor: '#fff',
  borderWidth: 2.5,
  borderColor: '#461c8aff',
  elevation: 5,
  shadowColor: '#461c8aff'
}
```

#### Icon Circle:
```javascript
{
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#f5f0ff'
}
```

---

## Navigation

### Stack Navigator
**Location:** `src/navigation/StackNavigator.js`

#### Key Screens Registered:
```javascript
<Stack.Navigator initialRouteName="LoginScreenOdoo">
  {/* Authentication */}
  <Stack.Screen name="LoginScreenOdoo" />

  {/* Home */}
  <Stack.Screen name="HomeScreen" />

  {/* POS */}
  <Stack.Screen name="POSRegister" />

  {/* Products */}
  <Stack.Screen name="Products" />

  {/* Users */}
  <Stack.Screen name="UsersScreen" />

  {/* Orders */}
  <Stack.Screen name="MyOrdersScreen" />

  {/* Sales Reports */}
  <Stack.Screen name="SalesReport" />
</Stack.Navigator>
```

#### Navigation Pattern:
```javascript
navigation.navigate('ScreenName', { params });
navigation.goBack();
```

---

## Configuration

### App Configuration (app.json)

#### Essential Settings:
```json
{
  "expo": {
    "name": "icecube",
    "slug": "vendingmachine",
    "version": "1.1.0",
    "orientation": "portrait",
    "owner": "mightyraju",
    "android": {
      "package": "com.danat.alphalize",
      "usesCleartextTraffic": true,
      "permissions": [
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE"
      ]
    },
    "extra": {
      "eas": {
        "projectId": "672318f3-54a2-429d-bf40-18e9900d1fb0"
      }
    }
  }
}
```

#### Important Notes:
- **usesCleartextTraffic: true** - Allows HTTP connections (required for Odoo)
- **Owner** - Set to your EAS account username
- **ProjectId** - Generated by EAS, links to your Expo account

### EAS Build Configuration (eas.json)

#### Build Profiles:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

## Build & Deployment

### Prerequisites
1. **Node.js** - v16 or higher
2. **Expo CLI** - `npm install -g expo-cli`
3. **EAS CLI** - `npm install -g eas-cli`
4. **Expo Account** - Sign up at expo.dev

### Setup Steps

#### 1. Install Dependencies
```bash
cd Ice-Cube-main
npm install
```

#### 2. Configure EAS
```bash
eas login
eas build:configure
```

#### 3. Update Configuration
Ensure `app.json` has correct owner:
```json
"owner": "your-expo-username"
```

### Build Commands

#### Development Build (APK):
```bash
eas build -p android --profile preview
```

#### Production Build (AAB):
```bash
eas build -p android --profile production
```

#### Check Build Status:
```bash
eas build:list
```

### Build Process
1. EAS uploads your code to Expo servers
2. Builds the Android APK/AAB
3. Provides download link when complete
4. Typically takes 10-20 minutes

### Installation
1. Download APK from EAS dashboard
2. Transfer to Android device
3. Enable "Install from Unknown Sources"
4. Install APK

---

## Performance Optimizations

### 1. FlashList Implementation
- Used instead of FlatList for better performance
- Optimized for large lists (users, orders, products)
- RecyclerView-based rendering
- Reduced memory footprint

### 2. Debounced Search
- 500ms delay on search input
- Prevents excessive API calls
- Improves user experience
- Reduces server load

### 3. Pagination
- 50 items per page
- Infinite scroll implementation
- Lazy loading of data
- Memory efficient

### 4. Memoization
- useCallback for functions
- useMemo for computed values
- Prevents unnecessary re-renders
- Optimizes component updates

### 5. Ref-Based State Tracking
```javascript
const hasLoadedRef = useRef(false);
const lastParamsRef = useRef({ searchText: '' });
```
- Prevents duplicate API calls
- Tracks parameter changes
- Avoids unnecessary fetches

---

## Security Considerations

### 1. Admin Access Control
**Two-Layer Protection:**
- Navigation-level check (toast warning)
- Component-level check (access denied screen)

### 2. Authentication
- Persistent session storage
- Token-based authentication (when implemented)
- Secure password handling

### 3. Input Validation
- Required field validation
- Form error handling
- XSS prevention in text inputs

### 4. API Security
- HTTPS recommended (currently HTTP for development)
- Error message sanitization
- Request/response logging

---

## Testing

### Manual Testing Checklist

#### Home Screen:
- [ ] Carousel auto-plays correctly
- [ ] All buttons navigate properly
- [ ] Admin check works for Users button
- [ ] Back button exits app on double-tap

#### Users Screen:
- [ ] Non-admin users see access denied
- [ ] Admin can view user list
- [ ] Search filters users correctly
- [ ] Create user form validates inputs
- [ ] New users appear in list after creation
- [ ] Pagination loads more users

#### Orders Screen:
- [ ] POS orders load correctly
- [ ] Search filters orders
- [ ] Status colors display properly
- [ ] Dates format correctly
- [ ] Amounts display with currency
- [ ] Pagination works

---

## Troubleshooting

### Common Issues

#### 1. EAS Build Permission Error
**Error:** "Entity not authorized"

**Solution:**
```bash
# Check logged-in user
eas whoami

# Update app.json owner
"owner": "your-username"

# Reconfigure EAS
eas build:configure
```

#### 2. Odoo Connection Error
**Error:** Network request failed

**Solution:**
- Check ODOO_BASE_URL in generalApi.js
- Verify Odoo server is accessible
- Check network connectivity
- Ensure usesCleartextTraffic: true for HTTP

#### 3. Empty User/Order Lists
**Possible Causes:**
- API endpoint incorrect
- Authentication expired
- No data in Odoo
- Permission issues

**Debug Steps:**
1. Check console logs for API errors
2. Verify Odoo credentials
3. Test API endpoint directly
4. Check Odoo user permissions

#### 4. Carousel Images Not Displaying
**Solution:**
- Verify image files exist in assets/images/Home/Banner/
- Check require() paths are correct
- Rebuild app after adding images

---

## Future Enhancements

### Planned Features:
1. **Order Details Screen** - View full order information
2. **User Editing** - Update existing user information
3. **User Deletion** - Remove users from system
4. **Advanced Search** - Filter by date range, status, etc.
5. **Export Reports** - PDF/Excel export functionality
6. **Push Notifications** - Order updates and alerts
7. **Offline Mode** - Work without internet connection
8. **Multi-language Support** - Internationalization
9. **Dark Mode** - Theme switching
10. **Barcode Scanner** - Product scanning in POS

### Technical Improvements:
1. **Unit Tests** - Jest/React Native Testing Library
2. **E2E Tests** - Detox or Appium
3. **CI/CD Pipeline** - Automated builds and testing
4. **Error Tracking** - Sentry integration
5. **Analytics** - User behavior tracking
6. **Performance Monitoring** - Crash reporting
7. **Code Splitting** - Lazy loading screens
8. **GraphQL** - Consider for API optimization

---

## Maintenance

### Regular Tasks:
1. **Update Dependencies** - Monthly security updates
2. **Odoo Compatibility** - Test with Odoo updates
3. **Performance Monitoring** - Check app metrics
4. **User Feedback** - Address reported issues
5. **Backup Configurations** - Version control

### Version Updates:
```bash
# Update version in app.json
"version": "1.2.0"

# Create new build
eas build -p android --profile production
```

---

## Support & Resources

### Documentation:
- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev/docs
- **Odoo Docs:** https://www.odoo.com/documentation/19.0/

### Community:
- **Expo Discord:** https://chat.expo.dev
- **React Native Community:** https://reactnative.dev/community/overview
- **Odoo Forum:** https://www.odoo.com/forum

### Contact:
- **Owner:** mightyraju
- **Project:** Ice Cube POS Application
- **Platform:** Android (iOS support pending)

---

## Changelog

### Version 1.1.0 (Current)
- ✅ Added User Management System
- ✅ Added Orders Management System
- ✅ Implemented Admin Access Control
- ✅ Added POS Session Close Functionality
- ✅ Updated Carousel with Contain Mode
- ✅ Fixed EAS Build Configuration
- ✅ Improved Search with Debouncing
- ✅ Added Pagination Support
- ✅ Enhanced Error Handling
- ✅ Updated UI Theme Consistency

### Version 1.0.0 (Base)
- Initial Release
- POS Register Functionality
- Product Management
- Sales Reports
- Basic Authentication

---

## Conclusion

The Ice Cube POS Application is a fully-featured mobile solution for managing ice cream shop operations. With seamless Odoo integration, intuitive UI, and robust user/order management, it provides a complete business management tool on mobile devices.

**Key Achievements:**
- ✅ Odoo 19 Integration
- ✅ User Management with Admin Controls
- ✅ POS Order Tracking
- ✅ Responsive UI with Purple Theme
- ✅ Performance Optimizations
- ✅ EAS Build Configuration

**Next Steps:**
1. Deploy to production
2. Gather user feedback
3. Implement planned enhancements
4. Expand to iOS platform

---

*Documentation Last Updated: January 19, 2026*
*Version: 1.1.0*
*Author: Development Team*

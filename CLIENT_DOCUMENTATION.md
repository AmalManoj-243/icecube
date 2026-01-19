# Ice Cube POS - User Guide

## 📱 What is Ice Cube POS?

Ice Cube is a mobile application that helps you run your ice cream shop or retail business right from your phone. It connects to your Odoo business system to manage sales, products, users, and orders.

---

## 🎯 Key Features at a Glance

| Feature | What it Does | Who Can Use |
|---------|--------------|-------------|
| **POS Register** | Process sales and take payments | All Users |
| **Sales Report** | View daily sales and revenue | All Users |
| **Products** | Browse and manage product catalog | All Users |
| **Users** | Add and manage staff accounts | Admins Only |
| **Orders** | View order history and status | All Users |

---

## 📊 Application Flow Chart

```
┌─────────────────────────────────────────────────────────────┐
│                        START APP                             │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                     LOGIN SCREEN                             │
│  • Enter Username                                            │
│  • Enter Password                                            │
│  • Connect to Odoo Server                                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                     HOME SCREEN                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │   POS    │  │  Sales   │  │ Products │                  │
│  │ Register │  │  Report  │  │          │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
│  ┌──────────┐  ┌──────────┐                                │
│  │  Users   │  │  Orders  │                                │
│  │ (Admin)  │  │          │                                │
│  └──────────┘  └──────────┘                                │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│  ALL USERS    │   │  ADMIN ONLY   │
│               │   │               │
│ • POS         │   │ • Users       │
│ • Sales       │   │               │
│ • Products    │   │               │
│ • Orders      │   │               │
└───────────────┘   └───────────────┘
```

---

## 🏠 Home Screen Guide

### What You See:

```
┌─────────────────────────────────────────┐
│         🏪 Ice Cube POS                 │
├─────────────────────────────────────────┤
│                                         │
│     [Image Carousel - Auto Slides]     │
│              • • • • •                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │  💰    │  │  📊    │  │  📦    │   │
│  │  POS   │  │ Sales  │  │Product │   │
│  │Register│  │ Report │  │   s    │   │
│  └────────┘  └────────┘  └────────┘   │
│                                         │
│  ┌────────┐  ┌────────┐               │
│  │  👥    │  │  📋    │               │
│  │ Users  │  │ Orders │               │
│  │(Admin) │  │        │               │
│  └────────┘  └────────┘               │
│                                         │
└─────────────────────────────────────────┘
```

### How to Use:
1. **Swipe left/right** on images to browse promotions
2. **Tap any button** to go to that section
3. **Press back twice** to exit the app

---

## 👥 User Management (Admin Only)

### Flow Chart:

```
┌─────────────────────────────────────────────────────────────┐
│              TAP "USERS" BUTTON ON HOME                      │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
        ┌─────────┴─────────┐
        │  Are you Admin?   │
        └─────────┬─────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
    NO  ▼               YES ▼
┌──────────────┐   ┌──────────────────────────────────┐
│ ACCESS       │   │   USERS SCREEN                   │
│ DENIED       │   │                                  │
│              │   │  [Search Users...]               │
│ 🔒 Message:  │   │                                  │
│ "Only admins │   │  ┌────────────────────┐         │
│  can access" │   │  │ 👤 John Doe        │         │
│              │   │  │ @johndoe           │         │
│ Auto-returns │   │  │ john@email.com     │         │
│ to Home      │   │  │ [Active]           │         │
└──────────────┘   │  └────────────────────┘         │
                   │                                  │
                   │  ┌────────────────────┐         │
                   │  │ 👤 Jane Smith      │         │
                   │  │ @janesmith         │         │
                   │  │ jane@email.com     │         │
                   │  │ [Active]           │         │
                   │  └────────────────────┘         │
                   │                                  │
                   │         [+ ADD USER]             │
                   └─────────────┬────────────────────┘
                                 │
                                 ▼
                   ┌─────────────────────────────────┐
                   │   CREATE NEW USER FORM          │
                   │                                 │
                   │  Name: [____________]  *        │
                   │  Login: [___________]  *        │
                   │  Password: [________]  *        │
                   │  Email: [___________]           │
                   │  Phone: [___________]           │
                   │                                 │
                   │  [Cancel]  [Create User]        │
                   └─────────────────────────────────┘
```

### Step-by-Step: Adding a New User

**Step 1:** Open Users Screen
- Tap "Users" button on home
- Only works if you're an admin

**Step 2:** Tap the "+" Button
- Located at bottom-right corner
- Opens create user form

**Step 3:** Fill in User Details
- **Name*** (Required) - Employee's full name
- **Login*** (Required) - Username for login
- **Password*** (Required) - Their password
- **Email** (Optional) - Email address
- **Phone** (Optional) - Phone number

**Step 4:** Create User
- Tap "Create User" button
- Wait for confirmation message
- New user appears in the list

### Searching Users:
```
┌────────────────────────────┐
│ 🔍 Search Users...         │
└────────────────────────────┘
        │
        ▼
Type name or username
        │
        ▼
Results filter automatically
(500ms delay for smooth typing)
```

---

## 📋 Orders Management

### Flow Chart:

```
┌─────────────────────────────────────────────────────────────┐
│              TAP "ORDERS" BUTTON ON HOME                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    ORDERS SCREEN                             │
│                                                              │
│  [Search Orders...]                                          │
│                                                              │
│  ┌────────────────────────────────────────────────┐         │
│  │ 📋 Order #POS/2024/001              $45.50    │         │
│  │ [Paid] ✓                                      │         │
│  │ 👤 John Customer                              │         │
│  │ 👔 Salesperson: Jane                          │         │
│  │ 📅 Jan 15, 2026                               │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  ┌────────────────────────────────────────────────┐         │
│  │ 📋 Order #POS/2024/002              $32.00    │         │
│  │ [New] ⏳                                      │         │
│  │ 👤 Sarah Client                               │         │
│  │ 👔 Salesperson: John                          │         │
│  │ 📅 Jan 15, 2026                               │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  ... scroll for more orders ...                             │
└─────────────────────────────────────────────────────────────┘
```

### Order Status Explained:

| Status Badge | Color | What it Means |
|-------------|-------|---------------|
| **New** | Gray | Order just created |
| **Paid** | Green | Payment received ✓ |
| **Posted** | Light Green | Order completed & recorded |
| **Invoiced** | Blue | Invoice generated |
| **Cancelled** | Red | Order cancelled |

### Understanding Order Cards:

```
┌────────────────────────────────────────────────┐
│ 📋 Order #POS/2024/001         [Paid] $45.50  │ ← Order # and Total
│                                                │
│ 👤 John Customer                               │ ← Customer name
│ 👔 Salesperson: Jane Smith                     │ ← Who made the sale
│ 📅 Jan 15, 2026                                │ ← Order date
└────────────────────────────────────────────────┘
```

### Searching Orders:
- Search by **order number** (e.g., "POS/2024/001")
- Search by **customer name** (e.g., "John")
- Search by **salesperson** (e.g., "Jane")

---

## 🔄 Data Sync Flow

### How the App Connects to Your Business:

```
┌─────────────────┐
│   YOUR PHONE    │
│   Ice Cube App  │
└────────┬────────┘
         │
         │ Internet
         │ Connection
         │
         ▼
┌─────────────────┐
│  ODOO SERVER    │
│  (Your Business │
│   Database)     │
└────────┬────────┘
         │
         ├─── Users Data
         ├─── Orders Data
         ├─── Products Data
         ├─── Sales Data
         └─── Reports
```

### What Gets Synced:

| Action | Data Flow | Time |
|--------|-----------|------|
| Open Users | Phone ← Server | Instant |
| Create User | Phone → Server | 1-2 seconds |
| Open Orders | Phone ← Server | Instant |
| Search | Phone ← Server | Real-time |
| Make Sale (POS) | Phone → Server | Instant |

---

## 🎨 Color Guide

### What Colors Mean:

```
🟣 Purple (#461c8a) - Main theme color
   • Buttons
   • Headers
   • Important elements

⚪ White (#ffffff) - Background
   • Cards
   • Forms
   • Clean areas

🟢 Green - Success & Positive
   • Paid orders
   • Active status
   • Completed actions

🔵 Blue - Information
   • Invoiced status
   • Info messages

⚫ Gray - Neutral
   • New/Draft items
   • Disabled elements

🔴 Red - Alert & Cancelled
   • Cancelled orders
   • Errors
   • Important warnings
```

---

## 👨‍💼 User Roles & Permissions

### Admin Users

**Can Do Everything:**
- ✅ Use POS Register
- ✅ View Sales Reports
- ✅ Manage Products
- ✅ **Create & Manage Users** (Exclusive)
- ✅ View Orders

**How to Know You're Admin:**
- System checks three things:
  1. User ID is 2 (Super Admin)
  2. Account has "Admin" flag
  3. Account has "Superuser" flag

### Regular Users

**Can Do Most Things:**
- ✅ Use POS Register
- ✅ View Sales Reports
- ✅ Manage Products
- ❌ Cannot access Users section
- ✅ View Orders

**What Happens When Regular User Tries to Access Users:**
1. Tap "Users" button → Toast message appears
2. Message: "Only administrators can access this feature"
3. If they somehow enter → See "Access Denied" screen
4. Automatically returned to Home after 2 seconds

---

## 📱 Screen Navigation Map

```
                    [HOME SCREEN]
                         |
        ┌────────────────┼────────────────┐
        |                |                |
        ▼                ▼                ▼
   [POS Register]   [Sales Report]   [Products]
        |                |                |
        |                ▼                |
        |         [View Charts &    ]    |
        |         [ Analytics      ]     |
        |                                 |
        |                                 ▼
        |                           [Product List]
        |                                 |
        |                                 ▼
        |                           [Add to Cart]
        |
        ▼
   [Process Sale]
        |
        ▼
   [Payment]
        |
        ▼
   [Receipt]


               [HOME SCREEN]
                    |
        ┌───────────┼───────────┐
        |           |           |
        ▼           ▼           ▼
   [USERS*]    [ORDERS]    [Back to POS]
        |           |
        ▼           ▼
  [User List] [Order List]
        |           |
        ▼           ▼
  [Add User]  [Search Orders]
        |           |
        ▼           ▼
  [Form]      [Filter Results]

*Admin Only
```

---

## 🔍 Search Functionality

### How Search Works:

```
1. You Type:
   ┌──────────────────┐
   │ 🔍 john         │
   └──────────────────┘

2. App Waits (500ms):
   [Waiting...] ⏱️

3. Searches Server:
   [Connecting to Odoo] 🔄

4. Shows Results:
   ┌──────────────────┐
   │ John Doe         │
   │ John Smith       │
   │ Johnny Walker    │
   └──────────────────┘
```

**Why the Wait?**
- The app waits 500 milliseconds (0.5 seconds) after you stop typing
- This prevents searching with every letter
- Saves data and makes it faster
- Called "debouncing" in technical terms

---

## 📊 Data Loading

### Pagination Explained Simply:

```
┌────────────────────────────────┐
│  First 50 items load            │
│  ↓ ↓ ↓ ↓ ↓                      │
│  1. Item 1                       │
│  2. Item 2                       │
│  ...                             │
│  50. Item 50                     │
│                                  │
│  Scroll down ↓                   │
│  ↓ ↓ ↓ ↓ ↓                      │
│  Next 50 items load              │
│  51. Item 51                     │
│  52. Item 52                     │
│  ...                             │
│  100. Item 100                   │
│                                  │
│  Keep scrolling for more...      │
└────────────────────────────────┘
```

**Benefits:**
- App loads faster (only 50 at a time)
- Uses less phone memory
- Smooth scrolling experience
- Automatic loading (just scroll down)

---

## ⚙️ System Requirements

### What You Need:

| Requirement | Details |
|------------|---------|
| **Device** | Android Phone/Tablet |
| **OS Version** | Android 8.0 or higher |
| **Internet** | WiFi or Mobile Data (3G/4G/5G) |
| **Storage** | 100 MB free space |
| **RAM** | 2 GB minimum |
| **Odoo** | Odoo 19 server running |

### Network Requirements:

```
Your Phone ←→ Internet ←→ Odoo Server

Required:
• Stable connection
• Access to Odoo server URL
• Port access (usually 8069 or 80/443)
```

---

## 🚀 Getting Started Guide

### First Time Setup:

**Step 1: Install App**
```
1. Download APK file
2. Enable "Install from Unknown Sources"
3. Tap APK file to install
4. Open Ice Cube app
```

**Step 2: Login**
```
┌──────────────────────────┐
│  🏪 Ice Cube POS         │
│                          │
│  Server: [odoo.url.com]  │
│  Username: [__________]  │
│  Password: [__________]  │
│                          │
│     [LOGIN BUTTON]       │
└──────────────────────────┘
```

**Step 3: Start Using**
```
• Home screen appears
• Tap any feature to start
• POS for sales
• Products to browse
• Orders to see history
```

---

## 💡 Tips & Best Practices

### For Admins:

✅ **DO:**
- Create unique usernames for each employee
- Use strong passwords (mix of letters, numbers, symbols)
- Regularly review user list
- Remove access for departed employees
- Keep admin credentials secure

❌ **DON'T:**
- Share admin password
- Use simple passwords like "123456"
- Create multiple accounts for same person
- Forget to remove old accounts

### For All Users:

✅ **DO:**
- Log out when finished
- Keep login credentials private
- Report any issues immediately
- Double-check order amounts
- Use search to find items quickly

❌ **DON'T:**
- Share your login with others
- Leave app open unattended
- Force close during transactions
- Skip payment confirmation

---

## 🔧 Troubleshooting

### Common Issues & Solutions:

#### 1. Can't Access Users Section

**Problem:** "Access Denied" message appears

**Solution:**
```
Check your role:
• Are you an admin? → Ask admin to upgrade
• Just logged in? → Try logging out and back in
• Still not working? → Contact system admin
```

#### 2. Orders Not Loading

**Problem:** Empty screen or loading forever

**Solution:**
```
1. Check internet connection
2. Pull down to refresh
3. Try searching for specific order
4. Restart app if needed
5. Contact support if persists
```

#### 3. Can't Create User

**Problem:** Error when clicking "Create User"

**Solution:**
```
Check:
• All required fields filled (marked with *)
• Username not already taken
• Password meets requirements
• Internet connection stable
```

#### 4. Search Not Working

**Problem:** Results don't appear

**Solution:**
```
• Wait 1 second after typing
• Check spelling
• Try different search terms
• Refresh the screen
• Ensure internet connection
```

---

## 📞 Support Information

### Need Help?

**For App Issues:**
- Check this guide first
- Try troubleshooting steps
- Contact your system administrator
- Report bugs on GitHub

**For Business/Odoo Issues:**
- Contact Odoo support
- Check Odoo documentation
- Reach out to your IT team

---

## 📚 Glossary

**Simple Terms Explained:**

| Term | Simple Explanation |
|------|-------------------|
| **POS** | Point of Sale - The checkout/register where you make sales |
| **Odoo** | The business software that stores all your data |
| **Admin** | A user with special permissions to manage other users |
| **Order** | A completed sale with customer and payment info |
| **Sync** | When the app updates with latest data from server |
| **Pagination** | Loading data in small chunks (50 at a time) |
| **Debounce** | Short wait time before searching (0.5 seconds) |
| **Session** | The time you're logged in and using the app |
| **Status** | Current state of an order (New, Paid, etc.) |

---

## 📈 Quick Reference

### Common Tasks:

| I Want To... | Click Here | Notes |
|-------------|-----------|-------|
| Make a sale | POS Register | Main sales screen |
| Check sales | Sales Report | View analytics |
| Find product | Products → Search | Use search bar |
| Add new user | Users → + Button | Admin only |
| View orders | Orders | All POS sales |
| Find order | Orders → Search | Type order # or name |
| Log out | Menu → Logout | Always logout when done |

---

## 🎓 Training Checklist

### For New Users:

- [ ] Understand home screen layout
- [ ] Learn to process a sale (POS)
- [ ] Know how to search products
- [ ] Can view sales reports
- [ ] Understand order status colors
- [ ] Know how to search orders
- [ ] Remember to logout

### For New Admins:

- [ ] Everything in "New Users" above
- [ ] Can access Users section
- [ ] Know how to create a user
- [ ] Understand user roles
- [ ] Can search for users
- [ ] Know when to give admin access
- [ ] Understand security best practices

---

## 📋 Version Information

- **App Version:** 1.1.0
- **Platform:** Android
- **Odoo Version:** 19
- **Last Updated:** January 2026

---

## 🎯 Summary

**Ice Cube POS is Your Mobile Business Hub:**

```
┌────────────────────────────────────┐
│  ONE APP - COMPLETE SOLUTION       │
├────────────────────────────────────┤
│                                    │
│  ✓ Process Sales Anywhere          │
│  ✓ Manage Your Team                │
│  ✓ Track All Orders                │
│  ✓ View Sales Reports              │
│  ✓ Control Products                │
│                                    │
│  All Synced with Your Odoo System  │
│                                    │
└────────────────────────────────────┘
```

**Key Takeaways:**
1. Easy to use with big, clear buttons
2. Admin controls who can access what
3. Everything syncs automatically with Odoo
4. Search makes finding anything quick
5. Color-coded status keeps things clear
6. Works on any Android device

---

*Need more help? Contact your system administrator or refer to the technical documentation.*

**Happy Selling! 🎉**

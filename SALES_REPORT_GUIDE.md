# Sales Report Feature - User Guide

## 📊 Overview

The Sales Report feature provides comprehensive analytics about your POS sales, including daily/weekly/monthly totals, top-selling products, and salesperson performance.

---

## 🚀 How to Access

### From Home Screen:
1. Open Ice Cube app
2. Tap **"Sales Report"** button on home screen
3. Report loads automatically

---

## 📅 Date Filters

Choose from 4 time periods:

| Filter | Shows Data For |
|--------|----------------|
| **Today** | Current day only |
| **Last 7 Days** | Past week |
| **Last 30 Days** | Past month |
| **All Time** | Complete history |

**How to Change Period:**
- Tap any filter button at the top
- Report updates automatically
- Purple button shows selected period

---

## 📈 Summary Cards

### 1. Total Sales 💰
- **Primary Card** (Purple background)
- Shows total revenue for selected period
- Includes all completed orders (Paid, Posted, Invoiced)

### 2. Orders 📋
- **Blue Card**
- Total number of completed orders
- Quick count of transactions

### 3. Average Order 📈
- **Orange Card**
- Average sale amount per order
- Calculated as: Total Sales ÷ Total Orders

### 4. Total Tax 🏦
- **Purple Card**
- Total tax collected
- Useful for tax reporting

---

## ⭐ Top Products Section

### What It Shows:
- Top 5 best-selling products
- Ranked by total revenue
- For selected time period

### Information Displayed:
```
┌────────────────────────────────────────┐
│ 1  Vanilla Ice Cream                   │
│    Qty: 45                     $234.50 │
├────────────────────────────────────────┤
│ 2  Chocolate Cone                      │
│    Qty: 38                     $189.00 │
└────────────────────────────────────────┘
```

**Each Product Shows:**
- Rank (1-5)
- Product name
- Total quantity sold
- Total revenue generated

---

## 👥 Sales by Salesperson Section

### What It Shows:
- Performance ranking of all salespeople
- Sorted by total sales amount
- For selected time period

### Information Displayed:
```
┌────────────────────────────────────────┐
│ 1  Jane Smith                          │
│    45 orders                   $1,234  │
├────────────────────────────────────────┤
│ 2  John Doe                            │
│    38 orders                   $1,089  │
└────────────────────────────────────────┘
```

**Each Salesperson Shows:**
- Rank (by sales amount)
- Salesperson name
- Number of orders processed
- Total sales amount

---

## 🔄 Refresh Data

### Pull to Refresh:
1. Scroll to top of screen
2. Pull down
3. Release to refresh
4. Latest data loads

### Auto-Refresh:
- Data refreshes when changing time period
- Data refreshes when screen loads

---

## 📊 Sample Report View

```
┌─────────────────────────────────────────┐
│         📊 Sales Report        [←]      │
├─────────────────────────────────────────┤
│                                         │
│ [Today] [Week] [Month] [All Time]      │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ 💰 Total Sales                  │    │
│ │ $1,234.50                       │    │
│ └─────────────────────────────────┘    │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ 📋 Orders: 45                   │    │
│ └─────────────────────────────────┘    │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ 📈 Avg Order: $27.43            │    │
│ └─────────────────────────────────┘    │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ 🏦 Total Tax: $98.76            │    │
│ └─────────────────────────────────┘    │
│                                         │
│ ━━━━━━━ ⭐ Top Products ━━━━━━━━       │
│                                         │
│ 1  Vanilla Ice Cream      $234.50      │
│    Qty: 45                              │
│                                         │
│ 2  Chocolate Cone         $189.00      │
│    Qty: 38                              │
│                                         │
│ 3  Strawberry Shake       $156.75      │
│    Qty: 29                              │
│                                         │
│ ━━━━ 👥 Sales by Salesperson ━━━━      │
│                                         │
│ 1  Jane Smith             $678.90      │
│    28 orders                            │
│                                         │
│ 2  John Doe               $555.60      │
│    17 orders                            │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 Use Cases

### Daily Operations:
- Check today's sales at end of day
- See which products are selling best
- Monitor staff performance

### Weekly Review:
- Compare week-over-week performance
- Identify trending products
- Plan inventory based on sales

### Monthly Analysis:
- Generate monthly sales reports
- Track salesperson commissions
- Review top-performing items

### Business Intelligence:
- View all-time best sellers
- Analyze long-term trends
- Make strategic decisions

---

## 💡 Tips & Best Practices

### For Managers:
✅ Check daily reports at closing time
✅ Review top products to plan inventory
✅ Use salesperson data for performance reviews
✅ Compare different time periods to spot trends

### For Sales Staff:
✅ View your personal performance
✅ See which products to promote
✅ Track your order count

### For Owners:
✅ Monitor overall business health
✅ Identify revenue trends
✅ Make data-driven decisions
✅ Plan promotions based on top sellers

---

## 🔧 Technical Details

### Data Source:
- Fetches from Odoo POS system
- Only includes completed orders:
  - Paid orders
  - Posted orders
  - Invoiced orders
- Excludes draft and cancelled orders

### Calculations:
```javascript
Total Sales = Sum of all order amounts
Total Orders = Count of completed orders
Average Order = Total Sales ÷ Total Orders
Total Tax = Sum of all tax amounts
```

### Product Ranking:
- Aggregates all order lines
- Groups by product
- Sorts by total revenue (not quantity)
- Shows top 5 products

### Salesperson Ranking:
- Aggregates all orders by user
- Sorts by total sales amount
- Shows all salespeople with sales

---

## 📱 Screen Features

### Pull-to-Refresh:
- Swipe down to reload data
- Shows loading indicator
- Updates all sections

### Responsive Cards:
- Cards auto-resize for different screens
- Touch-friendly button sizes
- Clear visual hierarchy

### Color Coding:
- **Purple** - Primary metrics (total sales)
- **Blue** - Order counts
- **Orange** - Averages/trends
- **Green** - Product rankings
- **Purple** - Salesperson rankings

---

## ❓ Troubleshooting

### No Data Showing?

**Possible Causes:**
1. No sales in selected period
2. Internet connection issue
3. Odoo server offline

**Solutions:**
- Try different time period (e.g., "All Time")
- Check internet connection
- Pull to refresh
- Contact admin if persists

### Wrong Data?

**Check:**
- Selected time period (top buttons)
- Odoo server time zone settings
- Date/time on your device

**Fix:**
- Tap correct time period
- Pull to refresh
- Restart app if needed

### Slow Loading?

**Causes:**
- Large date range (All Time)
- Slow internet connection
- Many orders in system

**Tips:**
- Use shorter periods (Today/Week)
- Wait for initial load
- Subsequent loads are cached

---

## 🎨 Visual Elements

### Icons Used:
- 💰 **attach-money** - Total sales
- 📋 **receipt** - Orders count
- 📈 **trending-up** - Average order
- 🏦 **account-balance** - Total tax
- ⭐ **star** - Top products
- 👥 **people** - Salespeople

### Color Scheme:
- **Primary Purple**: #461c8aff
- **Success Green**: #4caf50
- **Info Blue**: #2196f3
- **Warning Orange**: #ff9800
- **Accent Purple**: #9c27b0

---

## 📊 Export Options (Future)

### Coming Soon:
- PDF export
- Excel/CSV export
- Email reports
- Scheduled reports
- Custom date ranges
- More chart types

---

## 🔐 Permissions

### Who Can Access:
- All users can view sales reports
- No admin restriction
- Part of standard app features

### Data Privacy:
- Shows aggregated data only
- Individual order details not shown
- Salesperson names visible to all

---

## 📞 Support

### Need Help?
- Check this guide first
- Try pull-to-refresh
- Check different time periods
- Contact your system administrator

### Report Issues:
- Note: Date period selected
- Note: What data is missing
- Take screenshot if possible
- Contact IT support

---

## 📝 Summary

The Sales Report feature gives you instant insights into:

✅ **Revenue** - How much you're making
✅ **Orders** - How many sales you're processing
✅ **Products** - What's selling best
✅ **Performance** - Who's selling the most

**Quick Actions:**
1. Tap Sales Report button
2. Choose time period (Today/Week/Month/All)
3. View summary cards
4. Check top products
5. Review salesperson performance
6. Pull to refresh anytime

---

*Last Updated: January 19, 2026*
*Version: 1.1.0*
*Feature: Sales Report Analytics*

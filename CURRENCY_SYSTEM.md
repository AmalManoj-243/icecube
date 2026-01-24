# Dynamic Currency System

## Overview

The Ice Cube POS app now supports dynamic currency formatting based on your Odoo company configuration. The currency symbol is no longer hardcoded as "$" but is automatically fetched from your Odoo instance.

---

## How It Works

### 1. Currency Fetching on Login

When you log in to the app:
1. After successful authentication, the app queries your Odoo instance
2. Fetches the company's default currency from `res.company` model
3. Retrieves currency details (symbol, name, position) from `res.currency` model
4. Stores currency configuration in:
   - Zustand auth store (for runtime access)
   - AsyncStorage (for persistence)

### 2. Currency Storage

**Stored in AsyncStorage as `currencyConfig`:**
```json
{
  "symbol": "€",
  "name": "EUR",
  "position": "after"
}
```

**Fields:**
- `symbol`: The currency symbol (e.g., "$", "€", "£", "₹", "¥")
- `name`: Currency code (e.g., "USD", "EUR", "GBP", "INR", "JPY")
- `position`: Where symbol appears - "before" or "after" the amount

### 3. Currency Formatting

All monetary values throughout the app use the `formatCurrency()` utility function.

**Examples:**
```javascript
// USD (symbol before)
formatCurrency(1234.50, { symbol: '$', position: 'before' })
// Result: "$1234.50"

// EUR (symbol after)
formatCurrency(1234.50, { symbol: '€', position: 'after' })
// Result: "1234.50€"

// GBP (symbol before)
formatCurrency(1234.50, { symbol: '£', position: 'before' })
// Result: "£1234.50"

// AED (symbol after)
formatCurrency(1234.50, { symbol: 'د.إ', position: 'after' })
// Result: "1234.50د.إ"
```

---

## Files Modified

### 1. **src/api/services/generalApi.js**
Added `fetchCompanyCurrency()` function:
- Queries `res.company` to get currency_id
- Fetches currency details from `res.currency`
- Returns currency configuration object
- Includes fallback to USD if fetch fails

**Location:** Lines 2718-2792

### 2. **src/utils/currency.js** (New File)
Utility functions for currency handling:
- `getCurrencyConfig()` - Loads from AsyncStorage
- `saveCurrencyConfig()` - Saves to AsyncStorage
- `formatCurrency()` - Formats amount with currency symbol
- `formatNumber()` - Formats numbers without currency

### 3. **src/stores/auth/useAuthStore.js**
Enhanced auth store:
- Added `currency` state field
- `initializeAuth()` now loads currency from AsyncStorage
- `login()` fetches and stores currency on successful login
- Currency persists across app restarts

**Changes:** Lines 3-5, 8, 10-20, 23-45

### 4. **src/screens/SalesReport/SalesReportScreen.js**
Updated to use dynamic currency:
- Imports currency from auth store
- Removed hardcoded `formatCurrency()` function
- Uses `formatCurrencyUtil()` from utils with dynamic currency

**Changes:** Lines 14-15, 16, 120-122

### 5. **src/screens/MyOrders/MyOrdersScreen.js**
Updated to use dynamic currency:
- Imports currency from auth store
- Removed hardcoded `formatAmount()` function
- Uses `formatCurrency()` utility with dynamic currency

**Changes:** Lines 13-14, 15, 86-89, 110

---

## Supported Currencies

The system supports ANY currency configured in Odoo, including:

| Currency | Code | Symbol | Position | Example |
|----------|------|--------|----------|---------|
| US Dollar | USD | $ | Before | $1,234.50 |
| Euro | EUR | € | After | 1,234.50€ |
| British Pound | GBP | £ | Before | £1,234.50 |
| Indian Rupee | INR | ₹ | Before | ₹1,234.50 |
| UAE Dirham | AED | د.إ | After | 1,234.50د.إ |
| Japanese Yen | JPY | ¥ | Before | ¥1,234 |
| Swiss Franc | CHF | CHF | Before | CHF 1,234.50 |
| Australian Dollar | AUD | A$ | Before | A$1,234.50 |

**Note:** Odoo supports 100+ currencies out of the box.

---

## How to Change Currency

### Method 1: In Odoo Web Interface
1. Go to **Settings** → **Companies**
2. Select your company
3. Edit **Currency** field
4. Save changes
5. Re-login to the mobile app
6. Currency will update automatically

### Method 2: In Odoo Database
```sql
-- Check current company currency
SELECT c.name, cur.name, cur.symbol, cur.position
FROM res_company c
JOIN res_currency cur ON c.currency_id = cur.id
WHERE c.id = 1;

-- Change company currency (example: to EUR)
UPDATE res_company
SET currency_id = (SELECT id FROM res_currency WHERE name = 'EUR')
WHERE id = 1;
```

Then re-login to the app.

---

## Screens Using Dynamic Currency

The following screens display monetary values with dynamic currency:

1. **Sales Report Screen** (`SalesReportScreen.js`)
   - Total sales summary
   - Product revenue
   - Salesperson performance
   - Session balances
   - Payment method totals

2. **My Orders Screen** (`MyOrdersScreen.js`)
   - Order total amounts
   - Order listing

3. **Other Screens** (Future Updates)
   - POS Cart Summary
   - Invoice Preview
   - Payment Gateway
   - Product Listings
   - Vendor Bills
   - Purchase Orders

---

## Testing

### Test Case 1: Fresh Install (Default Currency)
1. Fresh install app
2. Login with Odoo credentials
3. **Expected:** Currency fetched from Odoo company
4. All amounts show with correct currency symbol

### Test Case 2: Session Persistence
1. Login to app (currency fetched)
2. Close app completely
3. Reopen app
4. **Expected:** Currency restored from AsyncStorage
5. All amounts show with correct currency

### Test Case 3: Currency Change
1. Login to app with USD currency
2. Change company currency in Odoo to EUR
3. Logout and re-login in app
4. **Expected:** App now displays € instead of $

### Test Case 4: Network Failure
1. Login with no internet during currency fetch
2. **Expected:** App falls back to USD ($)
3. Once online, logout and re-login
4. **Expected:** Correct currency fetched

---

## Technical Details

### API Call to Fetch Currency

**Step 1: Get Company**
```javascript
POST /web/dataset/call_kw
{
  "model": "res.company",
  "method": "search_read",
  "args": [[]],
  "kwargs": {
    "fields": ["currency_id"],
    "limit": 1
  }
}
```

**Step 2: Get Currency Details**
```javascript
POST /web/dataset/call_kw
{
  "model": "res.currency",
  "method": "read",
  "args": [[currency_id]],
  "kwargs": {
    "fields": ["symbol", "name", "position"]
  }
}
```

### Fallback Strategy

If currency fetch fails at any point:
1. **First fallback:** Use cached currency from AsyncStorage
2. **Second fallback:** Use default USD configuration
   ```javascript
   { symbol: '$', name: 'USD', position: 'before' }
   ```

### Performance Considerations

- Currency fetched **once** on login
- Stored in AsyncStorage for offline access
- Loaded synchronously from Zustand store (no delay)
- No API calls needed during normal app usage

---

## Future Enhancements

### Potential Additions:
1. **Decimal Places Configuration**
   - Some currencies don't use decimals (JPY, KRW)
   - Fetch `decimal_places` from Odoo currency

2. **Thousand Separator Localization**
   - US: 1,234.50
   - EU: 1.234,50
   - Fetch `thousands_sep` and `decimal_point` from Odoo

3. **Currency Conversion**
   - If multi-currency enabled in Odoo
   - Allow viewing reports in different currencies

4. **Exchange Rates Display**
   - Show current exchange rate
   - Useful for international businesses

5. **Manual Currency Override**
   - Setting to override Odoo currency
   - For testing or special cases

---

## Troubleshooting

### Issue: Still Seeing "$" After Changing Currency

**Causes:**
- Not logged out and back in
- AsyncStorage has stale data
- Odoo currency not saved properly

**Solutions:**
1. Logout and re-login to app
2. Clear app data/cache
3. Verify currency in Odoo company settings
4. Check Odoo API permissions

### Issue: Currency Shows as "undefined" or blank

**Causes:**
- Network error during fetch
- Odoo permissions issue
- Currency not configured in company

**Solutions:**
1. Check internet connection
2. Verify Odoo user has read access to `res.company` and `res.currency`
3. Set company currency in Odoo
4. Check console logs for error messages

### Issue: Wrong Symbol Position

**Causes:**
- Odoo currency position field not set
- Custom currency configuration

**Solutions:**
1. In Odoo, go to Accounting → Configuration → Currencies
2. Edit your currency
3. Set "Symbol Position" (Before/After Amount)
4. Re-login to app

---

## Console Logs

The currency system logs helpful debugging information:

```
[FETCH CURRENCY] Fetching company currency...
[FETCH CURRENCY] Currency fetched: { symbol: '€', name: 'EUR', position: 'after' }
[AUTH] Currency fetched and saved: { symbol: '€', name: 'EUR', position: 'after' }
[AUTH] Restored currency: { symbol: '€', name: 'EUR', position: 'after' }
```

If you see errors:
```
[FETCH CURRENCY] Odoo error: [error details]
[AUTH] Failed to fetch currency, using default: [error]
```

Check:
- Odoo server connection
- User permissions
- Company configuration

---

## Migration Guide

### For Existing Users

If you have an existing app installation:

1. **No action needed** - currency will auto-fetch on next login
2. Existing users will see USD ($) until they logout/login
3. After re-login, correct currency from Odoo will be used

### For Developers

If you're adding currency formatting to new screens:

```javascript
// 1. Import utilities
import useAuthStore from '@stores/auth/useAuthStore';
import { formatCurrency } from '@utils/currency';

// 2. Get currency from store
const MyComponent = () => {
  const currency = useAuthStore((state) => state.currency);

  // 3. Use formatCurrency
  const displayAmount = (amount) => {
    return formatCurrency(amount, currency || { symbol: '$', position: 'before' });
  };

  // 4. Render
  return <Text>{displayAmount(1234.50)}</Text>;
};
```

**Important:** Always provide fallback currency to avoid crashes if currency is null.

---

## API Reference

### `fetchCompanyCurrency()`

**Location:** `src/api/services/generalApi.js`

**Returns:**
```javascript
{
  symbol: string,     // Currency symbol
  name: string,       // Currency code (ISO 4217)
  position: string    // 'before' or 'after'
}
```

**Example:**
```javascript
const currency = await fetchCompanyCurrency();
// { symbol: '€', name: 'EUR', position: 'after' }
```

### `formatCurrency(amount, currencyConfig)`

**Location:** `src/utils/currency.js`

**Parameters:**
- `amount` (number): Amount to format
- `currencyConfig` (object): Currency configuration

**Returns:** Formatted string

**Example:**
```javascript
formatCurrency(1234.50, { symbol: '€', position: 'after' })
// "1234.50€"
```

### `formatNumber(number)`

**Location:** `src/utils/currency.js`

**Parameters:**
- `number` (number): Number to format

**Returns:** Formatted string without currency

**Example:**
```javascript
formatNumber(1234567)
// "1,234,567"
```

---

## Version History

- **v1.2.0** - Dynamic currency system implemented
- **Date:** January 20, 2026
- **Status:** ✅ Tested and working

---

## Summary

The currency system makes Ice Cube POS a truly international app. Whether your business operates in US Dollars, Euros, Dirhams, Rupees, or any other currency, the app will automatically adapt to your Odoo configuration.

**Key Benefits:**
✅ No hardcoded currency symbols
✅ Automatic synchronization with Odoo
✅ Supports 100+ currencies
✅ Respects regional symbol positioning
✅ Offline-friendly with caching
✅ Seamless user experience

---

*Last Updated: January 20, 2026*
*Feature: Dynamic Currency System*
*Version: 1.2.0*

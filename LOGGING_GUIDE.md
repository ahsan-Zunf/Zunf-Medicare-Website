# Logging Guide - Email Integration

## Where to Check Logs

### Frontend Logs (Browser Console)
1. Open your browser's Developer Tools (F12 or Right-click → Inspect)
2. Go to the **Console** tab
3. Make sure console filters are set to show **All** or **Verbose** (not just Errors)
4. Look for logs starting with:
   - 🚀 [FRONTEND]
   - 🛒 [FRONTEND]
   - 📡 [API]
   - ✅ [FRONTEND]
   - ❌ [FRONTEND]

### Backend Logs (Server Console/Terminal)
1. Open your terminal where the backend server is running
2. Look for logs starting with:
   - 🌐 [SERVER]
   - 🔵 [ROUTE]
   - 🚀 [BACKEND]
   - 🛒 [ORDER]
   - 📧 [EMAIL SERVICE]

## Log Flow When Order is Placed

### Step 1: Frontend (Browser Console)
```
🚀 [FRONTEND] ===== ORDER PLACEMENT STARTED =====
🚀 [FRONTEND] Button clicked - handlePlaceOrder called
🔍 [FRONTEND] Validating form data...
✅ [FRONTEND] All required fields present
✅ [FRONTEND] Email format valid
✅ [FRONTEND] Mobile number valid
🛒 [FRONTEND] Starting order creation process...
📡 [API] Making POST request to: https://zunf-client-production.up.railway.app/orders
```

### Step 2: Backend (Server Console)
```
🌐 [SERVER] Incoming request: POST /orders
🔵 [ROUTE] Order route hit: POST /
🔵 [ROUTE] POST /orders - Request received
🚀 [BACKEND] ===== ORDER REQUEST RECEIVED =====
🛒 [ORDER] Creating new order...
✅ [ORDER] Order created successfully!
📧 [EMAIL SERVICE] Starting to send admin notification email...
✅ [EMAIL SERVICE] Admin notification email sent successfully!
```

## Troubleshooting

### If you see NO logs at all:

1. **Frontend not logging?**
   - Check browser console is open
   - Check console filters (should show "All" not just "Errors")
   - Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Check if JavaScript errors are blocking execution

2. **Backend not logging?**
   - Verify server is running: `npm run dev` or `npm start`
   - Check terminal/console where server was started
   - Verify server is listening on correct port
   - Check if server crashed (look for error messages)

3. **API call not reaching backend?**
   - Check network tab in browser DevTools
   - Look for POST request to `/orders`
   - Check if request is being blocked (CORS, network error)
   - Verify API_BASE_URL is correct

### Test the Connection

1. Open browser console
2. Type: `console.log("Test log")` - you should see it immediately
3. If that works, the console is fine
4. Check if the button click is registered by looking for the first log: `🚀 [FRONTEND] ===== ORDER PLACEMENT STARTED =====`

## Quick Test

1. Fill out the cart form
2. Click "Place Order" button
3. Immediately check:
   - Browser Console (F12 → Console tab)
   - Server Terminal (where backend is running)
4. You should see logs starting with emojis (🚀, 🛒, 📡, etc.)

If you still see no logs, the issue might be:
- Server not running
- Frontend build not updated
- Console filters hiding logs
- JavaScript errors preventing execution

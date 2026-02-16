# API Endpoints for Testing

Base URL: `http://localhost:3000`

## Labs Endpoints

### 1. Get All Labs
**GET** `/labs`

Returns a list of all available labs with their basic information.

**Response:**
```json
{
  "labs": [
    {
      "id": "chughtai-lab",
      "name": "Chughtai Lab",
      "description": "A nationwide diagnostic network in Pakistan...",
      "totalTests": 1234
    },
    {
      "id": "test-zone",
      "name": "Test Zone Diagnostic Center",
      "description": "A trusted diagnostic center...",
      "totalTests": 567
    }
  ]
}
```

**Postman Example:**
- Method: `GET`
- URL: `http://localhost:3000/labs`

---

### 2. Get Lab Tests
**GET** `/labs/:labId`

Returns all tests available for a specific lab.

**Available Lab IDs:**
- `chughtai-lab`
- `test-zone`
- `jinnah-mri`
- `esthetique-canon`
- `ayzal-lab`
- `biotech-lahore`

**Response (Success):**
```json
{
  "lab": {
    "id": "chughtai-lab",
    "name": "Chughtai Lab",
    "description": "A nationwide diagnostic network...",
    "totalTests": 1234
  },
  "tests": [
    {
      "id": "complete-blood-count-cbc-blood-test-at-chughtai-la-0",
      "name": "Complete Blood Count (CBC) (Blood Test) at Chughtai Lab",
      "description": "Known as: CBC, Blood For Analysis...",
      "price": 800,
      "discounted_price": 640
    },
    ...
  ]
}
```

**Response (Lab Not Found - 404):**
```json
{
  "message": "Lab not found"
}
```

**Postman Examples:**
- Method: `GET`
- URL: `http://localhost:3000/labs/chughtai-lab`
- URL: `http://localhost:3000/labs/test-zone`
- URL: `http://localhost:3000/labs/jinnah-mri`
- URL: `http://localhost:3000/labs/esthetique-canon`

---

## Messages Endpoints

### 3. Send Message
**POST** `/messages/send`

Sends a message via SMS (requires VeevoTech API configuration) and enforces a limit of **3 messages per mobile number per calendar month**. When the limit is exceeded the API responds with HTTP `429` and the client should ask the user to contact support.

**Request Body:**
```json
{
  "receivernum": "+923001234567",
  "sendernum": "ZUNF",
  "textmessage": "Your test results are ready!"
}
```

**Postman Example:**
- Method: `POST`
- URL: `http://localhost:3000/messages/send`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "receivernum": "+923001234567",
  "textmessage": "Test message"
}
```

---

## Orders Endpoints

### 4. Create Order
**POST** `/orders`

Stores a new lab booking with patient details and selected tests. As soon as an order is accepted, the backend:

- Ensures the customer's mobile number has **received fewer than 3 SMS messages during the current month** (otherwise returns HTTP `429` with `You cannot do booking right now. Please contact support.`).
- Sends an SMS confirmation to the customer.
- If any of the ordered tests belong to `chughtai-lab`, allocates the next unused coupon code from the backend pool and includes it in the confirmation SMS. Each coupon is reserved and cannot be reused once sent.

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "+923001234567",
    "age": "32",
    "city": "Lahore"
  },
  "preferredDate": "2025-12-01",
  "preferredTime": "10:30",
  "items": [
    {
      "testId": "cbc-test-1",
      "testName": "Complete Blood Count",
      "labId": "chughtai-lab",
      "labName": "Chughtai Lab",
      "quantity": 1,
      "price": 800,
      "discountedPrice": 640
    }
  ],
  "totals": {
    "original": 800,
    "final": 640,
    "planCoverage": 160
  }
}
```

### 5. List Orders
**GET** `/orders`

Returns all stored orders sorted by newest first.

**Response:**
```json
{
  "orders": [
    {
      "_id": "676fa...",
      "customer": {
        "name": "John Doe",
        "email": "john@example.com",
        "mobile": "+923001234567",
        "age": "32",
        "city": "Lahore"
      },
      "preferredDate": "2025-12-01",
      "preferredTime": "10:30",
      "items": [
        {
          "testId": "cbc-test-1",
          "testName": "Complete Blood Count",
          "labId": "chughtai-lab",
          "labName": "Chughtai Lab",
          "quantity": 1,
          "price": 800,
          "discountedPrice": 640
        }
      ],
      "totals": {
        "original": 800,
        "final": 640,
        "planCoverage": 160
      },
      "status": "Pending",
      "createdAt": "2025-11-28T10:30:00.123Z"
    }
  ]
}
```

---

## Testing in Postman

1. **Start the backend server:**
   ```bash
   cd Backend
   npm run dev
   ```

2. **Import these endpoints:**
   - Create a new collection in Postman
   - Add the above endpoints
   - Test each endpoint

3. **For labs without data:**
   - Labs like `hum-lab`, `lahore-pcr`, `dr-essa-lab`, `biotech-lahore` will return 404
   - Only the 4 labs listed above have backend data

---

## CORS Configuration

The backend is configured to accept requests from any origin. For production, update the CORS configuration in `server.js` to restrict origins.


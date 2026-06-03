# Security Specification: Ugomenz Global Real-Time Sync Rules

## 1. Data Invariants
1. **Products**: Must have a valid string `id`, reasonable positive numeric cost `price`, standard `stockStatus`, and valid schema.
2. **Gallery Items**: Require unique `id`, `title`, non-empty `category`, and valid media url `image`.
3. **Leads**: Customer records containing emails and phone numbers must have standard email pattern format, valid purpose fields, and new/contacted status.
4. **Orders**: Sourced checkout lists with customer tracking information, positive payment totals, and standard pending/paid state keys.
5. **Service Bookings**: Technical installations details with valid customer data, location references, and status codes.
6. **Support Tickets**: Must contain verified ticket reference trackers, issue descriptions, and dynamic timestamp updates.

---

## 2. The "Dirty Dozen" Exploitation Payloads (Blocked)
These payloads attempt to poison variables, bypass schemas, or perform state shortcuts:

### Payload 1: Product Cost Inflation injection
```json
{
  "id": "prod-1",
  "name": "Sony 4K UHD TV",
  "brand": "Sony",
  "category": "TVs",
  "price": -5000000,
  "description": "Exploit price calculation vulnerabilities",
  "image": "https://img.unsplash/test.png",
  "stockStatus": "In Stock",
  "quantity": 10
}
```

### Payload 2: Gallery Image Poisoning (HUGE Payload Attack)
```json
{
  "id": "gal-test",
  "title": "Hack Showcase",
  "category": "Installations",
  "image": "data:image/png;base64,AAAA...[1.2MB String Inject to deplete cloud storage/denial of wallet]...",
  "caption": "Malicious base64 overloading"
}
```

### Payload 3: Lead Status Bypass
```json
{
  "id": "lead-1",
  "name": "Attacker",
  "phone": "08012345678",
  "email": "hacker@test.com",
  "purpose": "Book a Service",
  "message": "Direct Injection",
  "date": "2026-06-03",
  "status": "Contacted"
}
```

### Payload 4: Invalid Order Subtotal
```json
{
  "id": "ord-999",
  "customerName": "Spoofer",
  "customerPhone": "08012345555",
  "items": [],
  "subtotal": -1000,
  "status": "Paid",
  "date": "2026-06-03"
}
```

### Payload 5: Scurrilous ID Character Injection
Doc ID: `gal/../admin/passwords` attempting directory traversal.

### Payload 6: Invalid Category Injection
`category: "NONSENSE_ROOM_VALUE"` in gallery database.

### Payload 7: Missing Required Parameter on Products
Missing the name parameter while attempting product publishing.

### Payload 8: Immutable Timestamp tampering
Attempting to modify `createdAt` once stored.

### Payload 9: Empty/Malformed Phone Numbers
`customerPhone: ""` in order submissions.

### Payload 10: State Short-circuiting on Support Ticket
Creating ticket directly in `Resolved` state.

### Payload 11: Malicious Script Injection in Description
```json
{
  "id": "prod-x",
  "name": "<script>alert(1)</script>",
  "category": "TVs",
  "price": 10000,
  "image": "https://img.unsplash/test.png",
  "stockStatus": "In Stock",
  "quantity": 1
}
```

### Payload 12: Super-sized description injection (Denial of Wallet)
`description: "[10MB random text]"` to balloon indexing costs.

---

## 3. Test Runner Blueprint (`firestore.rules.test.ts`)
```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe('Ugomenz Firestore Fortress Rules Suite', () => {
  let testEnv;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'gen-lang-client-0703315353',
    });
  });

  after(async () => {
    await testEnv.cleanup();
  });

  it('rejects malicious negative prices in products', async () => {
    const context = testEnv.unauthenticatedContext();
    const db = context.firestore();
    await assertFails(db.collection('products').add({
      id: 'prod-evil',
      name: 'Bad Product',
      brand: 'Samsung',
      category: 'TVs',
      price: -1000,
      image: 'https://images.unsplash.com/test',
      stockStatus: 'In Stock',
      quantity: 1
    }));
  });
});
```

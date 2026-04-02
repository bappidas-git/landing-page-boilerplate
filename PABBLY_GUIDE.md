# Pabbly Connect Integration Guide

## 1. Overview

This boilerplate uses **Pabbly Connect** to capture form leads via webhook.
When a visitor submits any lead form, the data flows through a single utility function
and lands in your Pabbly workflow for processing.

**Flow:**
```
Form Submit → webhookSubmit.js → Pabbly Webhook → Google Sheets / Email / CRM
```

All forms (hero, contact, drawer variants, secondary CTA) use the same webhook endpoint configured in `src/utils/webhookSubmit.js`.

---

## 2. Quick Setup

1. **Create a Pabbly workflow** — Go to [Pabbly Connect](https://www.pabbly.com/connect/) → Create Workflow → Select **Webhook** as the trigger.
2. **Copy the webhook URL** — Pabbly generates a unique URL like `https://connect.pabbly.com/webhook-listener/webhook/...`
3. **Configure `src/utils/webhookSubmit.js`:**
   ```js
   const WEBHOOK_URL = "https://connect.pabbly.com/webhook-listener/webhook/YOUR_URL_HERE";
   const USE_PABBLY = true;
   const DUMMY_MODE = false;
   ```
4. **Test with a form submission** — Fill out any form on your landing page and submit.
5. **Check Pabbly** — Open your workflow history and confirm the webhook received the payload.

---

## 3. Lead Data Fields

Every submission sends these fields to the webhook:

| Field Name            | Example                              | Description                        |
|-----------------------|--------------------------------------|------------------------------------|
| `name`                | `John Doe`                           | Applicant's full name              |
| `mobile`              | `9876543210`                         | Mobile number                      |
| `email`               | `john@example.com`                   | Email address                      |
| `investment_interest` | `Premium Plan`                       | Selected investment/plan option    |
| `current_occupation`  | `Business Owner`                     | Applicant's occupation             |
| `source`              | `hero-form`                          | Form identifier (see Section 4)   |
| `lead_id`             | `a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3` | Auto-generated UUID                |
| `status`              | `new`                                | Initial lead status                |
| `submitted_at`        | `2026-04-01T10:30:00.000Z`          | ISO 8601 timestamp                 |
| `page_url`            | `https://example.com/?utm_source=google` | Full page URL at submission   |
| `user_agent`          | `Mozilla/5.0 ...`                    | Browser user-agent string          |
| `utm_source`          | `google`                             | UTM source parameter               |
| `utm_medium`          | `cpc`                                | UTM medium parameter               |
| `utm_campaign`        | `spring_sale`                        | UTM campaign parameter             |
| `utm_term`            | `buy+plan`                           | UTM term parameter                 |
| `utm_content`         | `ad_variant_a`                       | UTM content parameter              |
| `gclid`               | `EAIaIQobChMI...`                    | Google Click ID (from URL or stored) |

---

## 4. Form Sources

The `source` field identifies which form generated the lead:

| Source Value                       | Form Location                              |
|------------------------------------|--------------------------------------------|
| `hero-form`                        | HeroSection — right-side desktop form      |
| `contact-form`                     | ContactSection — enquiry form              |
| `unified-lead-form`               | UnifiedLeadForm — default (no formId prop) |
| `foundation-course`               | SecondaryCTASection — inline CTA form      |
| `drawer-form-apply-now`           | LeadFormDrawer — Hero/Features/CTA apply   |
| `drawer-form-download-brochure`   | LeadFormDrawer — brochure download         |
| `drawer-form-request-callback`    | LeadFormDrawer — callback request          |
| `drawer-form-schedule-site-visit` | LeadFormDrawer — site visit booking        |
| `drawer-form-get-course-details`  | LeadFormDrawer — course details request    |
| `drawer-form-get-details`         | LeadFormDrawer — general details request   |
| `drawer-form-book-free-demo`      | LeadFormDrawer — free demo booking         |

---

## 5. Google Sheets Mapping

In Pabbly, add a **Google Sheets** action and map columns like this:

| Column | Header               | Pabbly Field             |
|--------|----------------------|--------------------------|
| A      | Name                 | `{{name}}`               |
| B      | Mobile               | `{{mobile}}`             |
| C      | Email                | `{{email}}`              |
| D      | Investment Interest  | `{{investment_interest}}`|
| E      | Occupation           | `{{current_occupation}}` |
| F      | Source               | `{{source}}`             |
| G      | Lead ID              | `{{lead_id}}`            |
| H      | Status               | `{{status}}`             |
| I      | Submitted At         | `{{submitted_at}}`       |
| J      | Page URL             | `{{page_url}}`           |
| K      | UTM Source           | `{{utm_source}}`         |
| L      | UTM Medium           | `{{utm_medium}}`         |
| M      | UTM Campaign         | `{{utm_campaign}}`       |
| N      | UTM Term             | `{{utm_term}}`           |
| O      | UTM Content          | `{{utm_content}}`        |
| P      | GCLID                | `{{gclid}}`              |
| Q      | User Agent           | `{{user_agent}}`         |

> Create the header row manually in your Google Sheet first, then map each column in Pabbly.

---

## 6. Email Notification Setup

Add an **Email** action step in your Pabbly workflow after the webhook trigger:

1. **Action:** Select "Send Email" (use Pabbly's built-in SMTP or connect Gmail/Outlook).
2. **Subject:**
   ```
   New Lead: {{name}} - {{investment_interest}}
   ```
3. **Body:**
   ```
   New lead received from {{source}}

   Name: {{name}}
   Mobile: {{mobile}}
   Email: {{email}}
   Investment Interest: {{investment_interest}}
   Occupation: {{current_occupation}}

   Submitted: {{submitted_at}}
   Page: {{page_url}}
   UTM Source: {{utm_source}} | Campaign: {{utm_campaign}}
   ```

---

## 7. Testing

### DUMMY_MODE (Local Development)

Set in `src/utils/webhookSubmit.js`:
```js
const DUMMY_MODE = true;
const USE_PABBLY = false;
```
Submissions are logged to the browser console and stored in localStorage (no network requests).

### Manual Webhook Test

```bash
curl -X POST "YOUR_PABBLY_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "mobile": "9876543210",
    "email": "test@example.com",
    "investment_interest": "Premium Plan",
    "current_occupation": "Developer",
    "source": "hero-form",
    "lead_id": "test-001",
    "status": "new",
    "submitted_at": "2026-04-01T10:00:00.000Z",
    "page_url": "http://localhost:3000",
    "user_agent": "curl/test",
    "utm_source": "test",
    "utm_medium": "",
    "utm_campaign": "",
    "utm_term": "",
    "utm_content": "",
    "gclid": ""
  }'
```

### Check localStorage for Test Leads

Open browser DevTools console and run:
```js
// Test leads (DUMMY_MODE)
JSON.parse(localStorage.getItem("lp_test_leads"))

// Production leads (stored locally as backup)
JSON.parse(localStorage.getItem("lp_submitted_leads"))
```

---

## 8. Admin Panel Webhooks

When `USE_PABBLY = true` and `DUMMY_MODE = false`, the admin panel can sync status updates, notes, and deletions back to Pabbly via a second webhook.

### Setup

1. **Create a second Pabbly workflow** — Go to Pabbly Connect → Create Workflow → Select **Webhook** as the trigger.
2. **Copy the webhook URL** — Pabbly generates a unique URL.
3. **Set the URL in `.env`:**
   ```env
   REACT_APP_ADMIN_PABBLY_WEBHOOK_URL="https://connect.pabbly.com/webhook-listener/webhook/YOUR_ADMIN_WEBHOOK_ID"
   ```

### Payload Formats

The admin webhook sends JSON payloads with an `action` field to identify the event type.

**Status Update** — fired when a lead's status is changed:
```json
{
  "action": "status_update",
  "lead_id": "a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3",
  "new_status": "contacted",
  "old_status": "new",
  "timestamp": "2026-04-01T10:30:00.000Z"
}
```

**Note Added** — fired when a note is added to a lead:
```json
{
  "action": "note_added",
  "lead_id": "a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3",
  "note_text": "Called and left voicemail",
  "timestamp": "2026-04-01T11:00:00.000Z"
}
```

**Lead Deleted** — fired when a lead is deleted:
```json
{
  "action": "lead_deleted",
  "lead_id": "a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3",
  "timestamp": "2026-04-01T11:30:00.000Z"
}
```

### Google Sheets Mapping for Admin Actions

Create a separate Google Sheet (or a new tab) and map columns:

| Column | Header      | Pabbly Field        |
|--------|-------------|---------------------|
| A      | Action      | `{{action}}`        |
| B      | Lead ID     | `{{lead_id}}`       |
| C      | New Status  | `{{new_status}}`    |
| D      | Old Status  | `{{old_status}}`    |
| E      | Note Text   | `{{note_text}}`     |
| F      | Timestamp   | `{{timestamp}}`     |

> Use a Pabbly **Router** or **Filter** step to route different actions to different sheets or actions (e.g., only update the lead row status when `action = status_update`).

### Mode Behavior

| Mode | Behavior |
|------|----------|
| `DUMMY_MODE=true, USE_PABBLY=false` | All data stored in localStorage only. No webhooks fired. |
| `USE_PABBLY=true, DUMMY_MODE=false` | Admin actions fire webhooks. Leftover test leads are auto-cleared on admin panel load. |

---

## 9. Troubleshooting

| Issue | Fix |
|-------|-----|
| Form submits but Pabbly shows nothing | Verify `USE_PABBLY = true` and `DUMMY_MODE = false` in `webhookSubmit.js` |
| 404 / 400 from webhook | Double-check the `WEBHOOK_URL` — regenerate in Pabbly if expired |
| Leads missing UTM data | Ensure landing page URL includes `?utm_source=...` query params |
| GCLID not captured | Check that `gclidManager.js` is imported and Google Ads auto-tagging is on |
| CORS error in browser console | Pabbly webhooks accept cross-origin POST by default — check for typos in the URL |
| Duplicate leads appearing | `isDuplicateLead()` checks localStorage by mobile number — clear storage to reset |

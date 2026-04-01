# Pabbly Connect — Webhook Integration Guide for GNRC Medishop Franchise Leads

This guide explains how to connect the franchise enquiry forms to a live Pabbly Connect webhook.

## Step 1: Create a Pabbly Connect Workflow

1. Log in to [Pabbly Connect](https://www.pabbly.com/connect/)
2. Click **"Create Workflow"**
3. Name it: `GNRC Medishop Franchise — Lead Capture`

## Step 2: Set Up the Trigger (Webhook)

1. For the **Trigger**, select **"Webhook / API"**
2. Pabbly will generate a unique webhook URL, for example:
   `https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNT...`
3. **Copy this URL** — you'll need it in Step 4

## Step 3: Test the Webhook

1. In Pabbly, click **"Capture Webhook Response"** to start listening
2. Send a test POST request using curl or the test form:
   ```bash
   curl -X POST "YOUR_PABBLY_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Rahul Sharma",
       "mobile": "9876543210",
       "email": "rahul@example.com",
       "investment_interest": "700 Sq.Ft. Store (~₹28L)",
       "current_occupation": "Business Owner",
       "source": "hero-form",
       "submitted_at": "2026-03-17T10:30:00.000Z",
       "page_url": "https://gnrcmedishop.com/?utm_source=google",
       "user_agent": "Mozilla/5.0...",
       "utm_source": "google",
       "utm_medium": "cpc",
       "utm_campaign": "franchise-assam-2026",
       "utm_term": "pharmacy franchise guwahati",
       "utm_content": "ad-variant-1",
       "gclid": "EAIaIQobChMI..."
     }'
   ```
3. Verify Pabbly captures the response and shows all fields

## Step 4: Update the Code

Open `src/utils/webhookSubmit.js` and make these changes:

```js
// CHANGE 1: Replace the webhook URL with YOUR Pabbly URL
const WEBHOOK_URL = 'https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_ACTUAL_WEBHOOK_ID';

// CHANGE 2: Enable Pabbly mode
const USE_PABBLY = true;

// CHANGE 3: Disable dummy mode
const DUMMY_MODE = false;
```

That's it! The forms will now send data to Pabbly.

## Step 5: Set Up Actions in Pabbly

After the webhook trigger, add actions in your Pabbly workflow:

### Option A: Save to Google Sheets
1. Add action → **Google Sheets** → **"Add Row"**
2. Connect your Google account
3. Select your spreadsheet and sheet
4. Map fields:
   - Column A → `name`
   - Column B → `mobile`
   - Column C → `email`
   - Column D → `investment_interest`
   - Column E → `current_occupation`
   - Column F → `source`
   - Column G → `submitted_at`
   - Column H → `utm_source`
   - Column I → `utm_medium`
   - Column J → `utm_campaign`
   - Column K → `utm_term`
   - Column L → `utm_content`
   - Column M → `gclid`

### Option B: Send Email Notification
1. Add action → **Email by Pabbly** → **"Send Email"**
2. To: `info@gnrcmedishop.com`
3. Subject: `New Franchise Lead: {{name}} - {{investment_interest}}`
4. Body: Include all lead fields

### Option C: Send WhatsApp Notification (via Pabbly)
1. Add action → **WhatsApp Cloud API** or third-party
2. Send to your team's WhatsApp number (7086036887 / 8638604899)
3. Message template with lead details

### Option D: Add to CRM
1. Add action → Your CRM (e.g., Zoho, HubSpot, Salesforce)
2. Map fields accordingly

## Step 6: Handling Different Form Sources

The landing page has multiple forms, each identified by a unique `source` value:

| Source Value | Form Location | Description |
|---|---|---|
| `hero-form` | Hero section | Desktop right-side enquiry form |
| `contact-form` | Contact section | Footer contact form |
| `drawer-form-apply-now` | Drawer | "Apply for Franchise" CTA |
| `drawer-form-get-details` | Drawer | "Get Franchise Details" CTA |
| `drawer-form-book-meeting` | Drawer | "Book a Meeting" CTA |
| `drawer-form-download-brochure` | Drawer | "Download Prospectus" CTA |
| `drawer-form-request-callback` | Drawer | "Request a Callback" CTA |
| `drawer-form-investment-plans` | Drawer | "View Investment Plans" CTA |
| `foundation-course` | Secondary CTA section | Secondary enquiry form |

You can use the `source` field in Pabbly to **filter** or **route** leads to different sheets, email recipients, or CRM pipelines based on which form they came from.

## Available Lead Data Fields

Every form submission sends these fields to the webhook:

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Applicant's full name | "Rahul Sharma" |
| `mobile` | Mobile number (10 digits) | "7086036887" |
| `email` | Email address | "rahul@example.com" |
| `investment_interest` | Selected store/investment plan | "700 Sq.Ft. Store (~₹28L)" |
| `current_occupation` | Applicant's occupation | "Business Owner" |
| `source` | Form identifier | "hero-form", "drawer-form-apply-now", etc. |
| `submitted_at` | ISO timestamp | "2026-03-17T10:30:00.000Z" |
| `page_url` | Full page URL with query params | "https://gnrcmedishop.com/?utm_source=google" |
| `user_agent` | Browser info | "Mozilla/5.0..." |
| `utm_source` | Google Ads source | "google" |
| `utm_medium` | Traffic medium | "cpc" |
| `utm_campaign` | Campaign name | "franchise-assam-2026" |
| `utm_term` | Search keyword | "pharmacy franchise guwahati" |
| `utm_content` | Ad content ID | "ad-variant-1" |
| `gclid` | Google Click ID | "EAIaIQobChMI..." |

### Investment Interest Options

- 500 Sq.Ft. Store (~₹22L)
- 700 Sq.Ft. Store (~₹28L)
- 1000 Sq.Ft. Store (~₹38L)
- Not Sure — Need Guidance

### Current Occupation Options

- Business Owner
- Salaried Professional
- Retired / Looking for New Venture
- First-Time Entrepreneur
- Investor / Partner

## Google Ads UTM Tracking

When setting up Google Ads, use this URL template:
```
https://gnrcmedishop.com/?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}&gclid={gclid}
```

The landing page automatically captures all these parameters from the URL and includes them with every lead submission.

## Troubleshooting

- **Leads not appearing:** Check browser console for errors. Verify `WEBHOOK_URL` is correct in `src/utils/webhookSubmit.js`.
- **CORS errors:** Pabbly webhooks accept POST from any origin, so this shouldn't happen. If it does, check your Pabbly plan.
- **Duplicate leads:** The app prevents duplicate submissions by mobile number (stored in `localStorage['gnrc_franchise_submitted_leads']`). To reset, clear browser storage.
- **Test mode:** To re-enable test mode, set `DUMMY_MODE = true` in `webhookSubmit.js`. Test leads are stored in `localStorage['gnrc_franchise_test_leads']`.
- **Thank-you page not showing lead name:** The form stores `lead_submitted` and `lead_name` in `sessionStorage` after success — ensure the thank-you page reads from there.

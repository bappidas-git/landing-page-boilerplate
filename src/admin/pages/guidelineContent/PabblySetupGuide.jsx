import React from 'react';

const PabblySetupGuide = ({ styles }) => {
  return (
    <div>
      {/* Section 1: What is Pabbly Connect? */}
      <h2 className={styles.guideTitle}>What is Pabbly Connect?</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Pabbly Connect is a no-code automation tool that connects different apps together.
          It lets you build automated workflows without writing any backend code — you just
          pick a trigger (something that starts the workflow) and one or more actions (things
          that happen automatically after the trigger).
        </p>
        <p className={styles.guideParagraph}>
          Think of Pabbly as a bridge between your landing page form and your Google
          Sheet/Email/CRM. When someone fills out the form, Pabbly automatically sends that
          data wherever you want.
        </p>
        <div className={styles.guideNote}>
          <strong>How it works:</strong> Form Submit → webhookSubmit.js → Pabbly Webhook →
          Google Sheets / Email / CRM
        </div>
      </div>

      {/* Section 2: Step-by-Step Setup */}
      <h2 className={styles.guideTitle}>Step-by-Step Setup</h2>

      {/* Step 1 */}
      <div className={styles.guideSection}>
        <h3 className={styles.guideSubtitle}>Step 1: Create a Pabbly Account</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Go to <code className={styles.guideInlineCode}>https://www.pabbly.com/connect/</code>
          </li>
          <li className={styles.guideStepItem}>Click "Sign Up Free"</li>
          <li className={styles.guideStepItem}>Create account with email and password</li>
          <li className={styles.guideStepItem}>
            Pabbly offers a free tier with 100 tasks/month — enough for testing
          </li>
        </ol>
      </div>

      {/* Step 2 */}
      <div className={styles.guideSection}>
        <h3 className={styles.guideSubtitle}>Step 2: Create a New Workflow</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>After login, click "Create Workflow"</li>
          <li className={styles.guideStepItem}>
            Name it something like "Landing Page Lead Capture"
          </li>
          <li className={styles.guideStepItem}>
            For the Trigger app, search and select "Webhook / API"
          </li>
          <li className={styles.guideStepItem}>
            Click "Copy" on the generated webhook URL — you'll need this URL in the next step
          </li>
        </ol>
        <div className={styles.guideTip}>
          <strong>Tip:</strong> Keep this browser tab open — you'll come back to it after
          configuring the landing page.
        </div>
      </div>

      {/* Step 3 */}
      <div className={styles.guideSection}>
        <h3 className={styles.guideSubtitle}>Step 3: Configure the Landing Page Code</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Open the file: <code className={styles.guideInlineCode}>src/utils/webhookSubmit.js</code>
          </li>
          <li className={styles.guideStepItem}>
            Find the line: <code className={styles.guideInlineCode}>const WEBHOOK_URL = "..."</code> (near the top of the file)
          </li>
          <li className={styles.guideStepItem}>
            Replace the placeholder URL with your Pabbly webhook URL
          </li>
          <li className={styles.guideStepItem}>
            Find <code className={styles.guideInlineCode}>const USE_PABBLY = false;</code> — change to{' '}
            <code className={styles.guideInlineCode}>true</code>
          </li>
          <li className={styles.guideStepItem}>
            Find <code className={styles.guideInlineCode}>const DUMMY_MODE = true;</code> — change to{' '}
            <code className={styles.guideInlineCode}>false</code>
          </li>
          <li className={styles.guideStepItem}>Save the file</li>
        </ol>
        <div className={styles.guideNote}>
          <strong>Note:</strong> When <code className={styles.guideInlineCode}>DUMMY_MODE</code> is
          true, form submissions are saved to your browser's localStorage only (for testing). When{' '}
          <code className={styles.guideInlineCode}>USE_PABBLY</code> is true, they're sent to Pabbly.
        </div>
      </div>

      {/* Step 4 */}
      <div className={styles.guideSection}>
        <h3 className={styles.guideSubtitle}>Step 4: Test the Webhook Connection</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Start your landing page: <code className={styles.guideInlineCode}>npm start</code>
          </li>
          <li className={styles.guideStepItem}>Go to the landing page and fill in a test form</li>
          <li className={styles.guideStepItem}>Submit the form</li>
          <li className={styles.guideStepItem}>
            Go back to Pabbly → your workflow → click "History"
          </li>
          <li className={styles.guideStepItem}>
            You should see the test submission with all the data
          </li>
          <li className={styles.guideStepItem}>
            If you don't see it, check the Troubleshooting section below
          </li>
        </ol>
      </div>

      {/* Step 5 */}
      <div className={styles.guideSection}>
        <h3 className={styles.guideSubtitle}>Step 5: Add Google Sheets Action in Pabbly</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            In your Pabbly workflow, click the "+" button to add an action step
          </li>
          <li className={styles.guideStepItem}>
            Search for "Google Sheets" and select it
          </li>
          <li className={styles.guideStepItem}>Choose action: "Add Row"</li>
          <li className={styles.guideStepItem}>
            Connect your Google account (click "Connect" and authorize)
          </li>
          <li className={styles.guideStepItem}>
            Select your spreadsheet (create one first if you haven't)
          </li>
          <li className={styles.guideStepItem}>Select the worksheet (usually "Sheet1")</li>
          <li className={styles.guideStepItem}>
            Map each column to the webhook data fields (see Column Mapping table below)
          </li>
          <li className={styles.guideStepItem}>
            Click "Save & Send Test Request" to verify
          </li>
        </ol>
      </div>

      {/* Step 6 */}
      <div className={styles.guideSection}>
        <h3 className={styles.guideSubtitle}>Step 6: Add Email Notification (Optional but Recommended)</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Click "+" to add another action step after Google Sheets
          </li>
          <li className={styles.guideStepItem}>
            Select "Email by Pabbly" (free built-in) or "Gmail"
          </li>
          <li className={styles.guideStepItem}>
            If using Gmail: connect your Google account
          </li>
          <li className={styles.guideStepItem}>Set recipient: your sales team email</li>
          <li className={styles.guideStepItem}>
            Subject:{' '}
            <code className={styles.guideInlineCode}>
              {'New Lead: {{name}} - {{investment_interest}}'}
            </code>
          </li>
          <li className={styles.guideStepItem}>
            Use the email body template provided in the Email Notification Template section below
          </li>
          <li className={styles.guideStepItem}>Save and test</li>
        </ol>
      </div>

      {/* Section 3: Lead Data Fields Reference */}
      <h2 className={styles.guideTitle}>Lead Data Fields Reference</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          These are all the fields sent by the landing page form to your Pabbly webhook:
        </p>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Field</th>
              <th>Example</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>name</code></td>
              <td className={styles.guideTableCell}>John Doe</td>
              <td className={styles.guideTableCell}>Person's full name</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>mobile</code></td>
              <td className={styles.guideTableCell}>9876543210</td>
              <td className={styles.guideTableCell}>10-digit mobile number</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>email</code></td>
              <td className={styles.guideTableCell}>john@example.com</td>
              <td className={styles.guideTableCell}>Email address</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>investment_interest</code></td>
              <td className={styles.guideTableCell}>Premium Plan</td>
              <td className={styles.guideTableCell}>Selected plan/service</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>current_occupation</code></td>
              <td className={styles.guideTableCell}>Business Owner</td>
              <td className={styles.guideTableCell}>Person's occupation</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>source</code></td>
              <td className={styles.guideTableCell}>hero-form</td>
              <td className={styles.guideTableCell}>Which form they used (see table below)</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>lead_id</code></td>
              <td className={styles.guideTableCell}>a1b2c3d4-e5f6...</td>
              <td className={styles.guideTableCell}>Unique ID for each lead</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>status</code></td>
              <td className={styles.guideTableCell}>new</td>
              <td className={styles.guideTableCell}>Always "new" on submission</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>submitted_at</code></td>
              <td className={styles.guideTableCell}>2026-04-01T10:30:00.000Z</td>
              <td className={styles.guideTableCell}>When the form was submitted</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>page_url</code></td>
              <td className={styles.guideTableCell}>https://example.com/?utm_source=google</td>
              <td className={styles.guideTableCell}>Full page URL</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>utm_source</code></td>
              <td className={styles.guideTableCell}>google</td>
              <td className={styles.guideTableCell}>Ad platform source</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>utm_medium</code></td>
              <td className={styles.guideTableCell}>cpc</td>
              <td className={styles.guideTableCell}>Traffic medium</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>utm_campaign</code></td>
              <td className={styles.guideTableCell}>spring_sale</td>
              <td className={styles.guideTableCell}>Campaign name</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>utm_term</code></td>
              <td className={styles.guideTableCell}>buy+plan</td>
              <td className={styles.guideTableCell}>Search keyword</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>utm_content</code></td>
              <td className={styles.guideTableCell}>ad_variant_a</td>
              <td className={styles.guideTableCell}>Ad variant</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>gclid</code></td>
              <td className={styles.guideTableCell}>EAIaIQob...</td>
              <td className={styles.guideTableCell}>Google Click ID (auto-captured)</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>user_agent</code></td>
              <td className={styles.guideTableCell}>Mozilla/5.0...</td>
              <td className={styles.guideTableCell}>Browser information</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4: Form Sources Reference */}
      <h2 className={styles.guideTitle}>Form Sources Reference</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          The <code className={styles.guideInlineCode}>source</code> field tells you which form on the
          landing page the lead came from:
        </p>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Source Value</th>
              <th>Form Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>hero-form</code></td>
              <td className={styles.guideTableCell}>Main form on the right side of Hero section (desktop)</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>contact-form</code></td>
              <td className={styles.guideTableCell}>Enquiry form in the Contact section</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>foundation-course</code></td>
              <td className={styles.guideTableCell}>Form in the Secondary CTA section</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>drawer-form-apply-now</code></td>
              <td className={styles.guideTableCell}>Slide-in drawer — Apply Now</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>drawer-form-download-brochure</code></td>
              <td className={styles.guideTableCell}>Slide-in drawer — Download Brochure</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>drawer-form-request-callback</code></td>
              <td className={styles.guideTableCell}>Slide-in drawer — Request Callback</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>drawer-form-get-details</code></td>
              <td className={styles.guideTableCell}>Slide-in drawer — Get Details</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 5: Google Sheets Column Mapping */}
      <h2 className={styles.guideTitle}>Google Sheets Column Mapping</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          When configuring the Google Sheets action in Pabbly, map each column as follows:
        </p>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Column</th>
              <th>Header</th>
              <th>Pabbly Field</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}>A</td>
              <td className={styles.guideTableCell}>Name</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{name}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>B</td>
              <td className={styles.guideTableCell}>Mobile</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{mobile}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>C</td>
              <td className={styles.guideTableCell}>Email</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{email}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>D</td>
              <td className={styles.guideTableCell}>Plan</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{investment_interest}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>E</td>
              <td className={styles.guideTableCell}>Occupation</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{current_occupation}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>F</td>
              <td className={styles.guideTableCell}>Source</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{source}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>G</td>
              <td className={styles.guideTableCell}>Lead ID</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{lead_id}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>H</td>
              <td className={styles.guideTableCell}>Status</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{status}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>I</td>
              <td className={styles.guideTableCell}>Submitted At</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{submitted_at}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>J</td>
              <td className={styles.guideTableCell}>Page URL</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{page_url}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>K</td>
              <td className={styles.guideTableCell}>UTM Source</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{utm_source}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>L</td>
              <td className={styles.guideTableCell}>UTM Medium</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{utm_medium}}'}</code></td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>M</td>
              <td className={styles.guideTableCell}>UTM Campaign</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>{'{{utm_campaign}}'}</code></td>
            </tr>
          </tbody>
        </table>
        <div className={styles.guideTip}>
          <strong>Tip:</strong> Create the header row manually in your Google Sheet first, then map
          each column in Pabbly.
        </div>
      </div>

      {/* Section 6: Email Notification Template */}
      <h2 className={styles.guideTitle}>Email Notification Template</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Use this template for the email body in your Pabbly email notification action:
        </p>
        <pre className={styles.guideCode}>
{`New lead received from {{source}}

Name: {{name}}
Mobile: {{mobile}}
Email: {{email}}
Plan Interest: {{investment_interest}}
Occupation: {{current_occupation}}

Submitted: {{submitted_at}}
Page: {{page_url}}
UTM Source: {{utm_source}} | Campaign: {{utm_campaign}}`}
        </pre>
      </div>

      {/* Section 7: Admin Panel Webhook (Optional) */}
      <h2 className={styles.guideTitle}>Admin Panel Webhook (Optional)</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          The admin panel can also send data to Pabbly when you change a lead's status, add a note,
          or delete a lead. This lets you keep your Google Sheet or CRM in sync with actions taken
          in the admin panel.
        </p>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>Create a second Pabbly workflow with a Webhook trigger</li>
          <li className={styles.guideStepItem}>Copy the new webhook URL</li>
          <li className={styles.guideStepItem}>
            Set <code className={styles.guideInlineCode}>REACT_APP_ADMIN_PABBLY_WEBHOOK_URL</code> in
            your <code className={styles.guideInlineCode}>.env</code> file
          </li>
        </ol>
        <p className={styles.guideParagraph}>
          The admin webhook sends payloads in this format:
        </p>
        <pre className={styles.guideCode}>
{`{
  "action": "status_update",
  "lead_id": "a1b2c3d4-e5f6...",
  "new_status": "contacted",
  "timestamp": "2026-04-01T10:30:00.000Z"
}`}
        </pre>
      </div>

      {/* Section 8: Testing Checklist */}
      <h2 className={styles.guideTitle}>Testing Checklist</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>Submit a test form on the landing page</li>
          <li className={styles.guideStepItem}>
            Check Pabbly workflow history — data should appear within 30 seconds
          </li>
          <li className={styles.guideStepItem}>
            Check your Google Sheet — new row should be added
          </li>
          <li className={styles.guideStepItem}>
            Check your email — notification should arrive
          </li>
          <li className={styles.guideStepItem}>
            Check the admin panel at{' '}
            <code className={styles.guideInlineCode}>/admin/lms</code> — lead should appear
          </li>
          <li className={styles.guideStepItem}>
            Try submitting the same phone number again — should show "Already Registered"
          </li>
        </ol>
      </div>

      {/* Section 9: Troubleshooting */}
      <h2 className={styles.guideTitle}>Troubleshooting</h2>
      <div className={styles.guideSection}>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Problem</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}>Form submits but Pabbly shows nothing</td>
              <td className={styles.guideTableCell}>
                Verify <code className={styles.guideInlineCode}>USE_PABBLY = true</code> and{' '}
                <code className={styles.guideInlineCode}>DUMMY_MODE = false</code> in{' '}
                <code className={styles.guideInlineCode}>webhookSubmit.js</code>. Check the webhook URL
                is correct.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>
                Pabbly receives data but Google Sheets is empty
              </td>
              <td className={styles.guideTableCell}>
                Re-authorize your Google account in Pabbly. Make sure the spreadsheet and sheet name
                are correct.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Getting CORS error in browser console</td>
              <td className={styles.guideTableCell}>
                Pabbly webhooks accept cross-origin POST by default. Double-check the URL for typos.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Leads appearing twice in admin panel</td>
              <td className={styles.guideTableCell}>
                This was a bug that has been fixed. Make sure you're running the latest code.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>UTM data is empty</td>
              <td className={styles.guideTableCell}>
                UTM parameters must be in the landing page URL (e.g.,{' '}
                <code className={styles.guideInlineCode}>
                  ?utm_source=google&utm_medium=cpc
                </code>).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PabblySetupGuide;

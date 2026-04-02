/* ============================================
   Lead Service Utility
   CRUD operations for leads stored in localStorage
   With Pabbly webhook support for admin actions
   ============================================ */

import { isPabblyMode } from './adminConfig';

// Pabbly webhook for admin actions (status change, notes, deletions)
// Set this to your Pabbly admin workflow webhook URL
const ADMIN_WEBHOOK_URL = process.env.REACT_APP_ADMIN_PABBLY_WEBHOOK_URL || "";

const LEADS_KEY = "lp_submitted_leads";
const TEST_LEADS_KEY = "lp_test_leads";

/**
 * Get all leads from both production and test storage
 */
const getAllLeadsRaw = () => {
  const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
  const testLeads = JSON.parse(localStorage.getItem(TEST_LEADS_KEY) || "[]").map(
    (l) => ({ ...l, _isTest: true })
  );
  return [...leads, ...testLeads];
};

/**
 * Save leads back to localStorage (split by test/prod)
 */
const saveLeads = (allLeads) => {
  const prodLeads = allLeads.filter((l) => !l._isTest);
  const testLeads = allLeads.filter((l) => l._isTest);
  localStorage.setItem(LEADS_KEY, JSON.stringify(prodLeads));
  localStorage.setItem(TEST_LEADS_KEY, JSON.stringify(testLeads));
};

/**
 * Get all leads with optional filters
 * @param {Object} filters - { search, status, source, dateRange, startDate, endDate }
 * @returns {Array} Filtered leads
 */
export const getLeads = (filters = {}) => {
  let leads = getAllLeadsRaw();

  // Search filter
  if (filters.search) {
    const q = filters.search.toLowerCase();
    leads = leads.filter(
      (l) =>
        (l.name || "").toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q) ||
        (l.mobile || "").includes(q)
    );
  }

  // Status filter
  if (filters.status && filters.status !== "all") {
    leads = leads.filter((l) => l.status === filters.status);
  }

  // Source filter
  if (filters.source && filters.source !== "all") {
    leads = leads.filter((l) => l.source === filters.source);
  }

  // Date range filter
  if (filters.dateRange && filters.dateRange !== "all") {
    const now = new Date();
    let startDate;

    switch (filters.dateRange) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week": {
        const day = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - day);
        startDate.setHours(0, 0, 0, 0);
        break;
      }
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "custom":
        if (filters.startDate) startDate = new Date(filters.startDate);
        break;
      default:
        break;
    }

    if (startDate) {
      leads = leads.filter((l) => new Date(l.submitted_at) >= startDate);
    }
    if (filters.dateRange === "custom" && filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      leads = leads.filter((l) => new Date(l.submitted_at) <= endDate);
    }
  }

  // Sort by date descending by default
  leads.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));

  return leads;
};

/**
 * Get a single lead by ID
 */
export const getLeadById = (id) => {
  const leads = getAllLeadsRaw();
  return leads.find((l) => l.lead_id === id) || null;
};

/**
 * Update lead status
 */
export const updateLeadStatus = (id, status) => {
  const leads = getAllLeadsRaw();
  const lead = leads.find((l) => l.lead_id === id);
  if (!lead) return null;

  const oldStatus = lead.status;
  lead.status = status;
  if (!lead.activity) lead.activity = [];
  lead.activity.push({
    action: `Status changed from "${oldStatus}" to "${status}"`,
    status,
    timestamp: new Date().toISOString(),
  });

  saveLeads(leads);

  // If Pabbly mode, also send to webhook
  if (isPabblyMode() && ADMIN_WEBHOOK_URL) {
    fetch(ADMIN_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'status_update',
        lead_id: id,
        new_status: status,
        old_status: oldStatus,
        timestamp: new Date().toISOString(),
      }),
    }).catch(err => console.error('[LeadService] Pabbly webhook failed:', err));
  }

  return lead;
};

/**
 * Add a note to a lead
 */
export const addLeadNote = (id, noteText) => {
  const leads = getAllLeadsRaw();
  const lead = leads.find((l) => l.lead_id === id);
  if (!lead) return null;

  if (!lead.notes) lead.notes = [];
  const note = {
    id: Date.now().toString(),
    text: noteText,
    timestamp: new Date().toISOString(),
  };
  lead.notes.push(note);

  if (!lead.activity) lead.activity = [];
  lead.activity.push({
    action: "Note added",
    status: lead.status,
    timestamp: new Date().toISOString(),
  });

  saveLeads(leads);

  // If Pabbly mode, also send to webhook
  if (isPabblyMode() && ADMIN_WEBHOOK_URL) {
    fetch(ADMIN_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'note_added',
        lead_id: id,
        note_text: noteText,
        timestamp: new Date().toISOString(),
      }),
    }).catch(err => console.error('[LeadService] Pabbly webhook failed:', err));
  }

  return lead;
};

/**
 * Delete a single lead
 */
export const deleteLead = (id) => {
  const leads = getAllLeadsRaw();
  const filtered = leads.filter((l) => l.lead_id !== id);
  saveLeads(filtered);

  // If Pabbly mode, also send to webhook
  if (isPabblyMode() && ADMIN_WEBHOOK_URL) {
    fetch(ADMIN_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'lead_deleted',
        lead_id: id,
        timestamp: new Date().toISOString(),
      }),
    }).catch(err => console.error('[LeadService] Pabbly webhook failed:', err));
  }

  return true;
};

/**
 * Bulk delete leads
 */
export const deleteLeads = (ids) => {
  const idSet = new Set(ids);
  const leads = getAllLeadsRaw();
  const filtered = leads.filter((l) => !idSet.has(l.lead_id));
  saveLeads(filtered);

  // If Pabbly mode, also send to webhook for each deleted lead
  if (isPabblyMode() && ADMIN_WEBHOOK_URL) {
    ids.forEach(id => {
      fetch(ADMIN_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'lead_deleted',
          lead_id: id,
          timestamp: new Date().toISOString(),
        }),
      }).catch(err => console.error('[LeadService] Pabbly webhook failed:', err));
    });
  }

  return true;
};

/**
 * Export leads to CSV string and trigger download
 */
export const exportLeadsCSV = (leads) => {
  const headers = [
    "Lead ID",
    "Name",
    "Mobile",
    "Email",
    "Service Interest",
    "Occupation",
    "Source",
    "Status",
    "Submitted At",
    "Page URL",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Term",
    "UTM Content",
    "GCLID",
    "Notes",
  ];

  const escapeCSV = (val) => {
    const str = String(val || "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = leads.map((l) => [
    l.lead_id,
    l.name,
    l.mobile,
    l.email,
    l.investment_interest,
    l.current_occupation,
    l.source,
    l.status,
    l.submitted_at,
    l.page_url,
    l.utm_source,
    l.utm_medium,
    l.utm_campaign,
    l.utm_term,
    l.utm_content,
    l.gclid,
    (l.notes || []).map((n) => n.text).join(" | "),
  ]);

  const csvContent =
    [headers.map(escapeCSV).join(","), ...rows.map((r) => r.map(escapeCSV).join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().split("T")[0];
  link.href = url;
  link.download = `leads_export_${date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Import leads from CSV string
 * @param {string} csvText - Raw CSV content
 * @returns {{ imported: number, duplicates: number }}
 */
export const importLeadsCSV = (csvText) => {
  const lines = csvText.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return { imported: 0, duplicates: 0 };

  const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim().toLowerCase());
  const mobileIdx = headers.findIndex((h) => h === "mobile");
  const existingLeads = getAllLeadsRaw();
  const existingMobiles = new Set(existingLeads.map((l) => l.mobile));

  let imported = 0;
  let duplicates = 0;

  const fieldMap = {
    "lead id": "lead_id",
    name: "name",
    mobile: "mobile",
    email: "email",
    "service interest": "investment_interest",
    occupation: "occupation",
    source: "source",
    status: "status",
    "submitted at": "submitted_at",
  };

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.replace(/^"|"$/g, "").trim());
    const mobile = mobileIdx >= 0 ? values[mobileIdx] : null;

    if (mobile && existingMobiles.has(mobile)) {
      duplicates++;
      continue;
    }

    const lead = {
      lead_id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).slice(2),
      status: "new",
      submitted_at: new Date().toISOString(),
      notes: [],
      activity: [{ action: "Imported from CSV", status: "new", timestamp: new Date().toISOString() }],
    };

    headers.forEach((h, idx) => {
      const key = fieldMap[h] || h.replace(/\s+/g, "_");
      if (values[idx]) lead[key] = values[idx];
    });

    existingLeads.push(lead);
    if (mobile) existingMobiles.add(mobile);
    imported++;
  }

  saveLeads(existingLeads);
  return { imported, duplicates };
};

/**
 * Get summary stats for the dashboard
 */
export const getLeadStats = () => {
  const leads = getAllLeadsRaw();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const totalLeads = leads.length;
  const newLeads24h = leads.filter(
    (l) => new Date(l.submitted_at) >= today
  ).length;
  const weekLeads = leads.filter(
    (l) => new Date(l.submitted_at) >= weekStart
  ).length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0";

  // Top source
  const sourceCounts = {};
  leads.forEach((l) => {
    const src = l.source || "unknown";
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });
  const topSource =
    Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // Recent leads (last 5)
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
    .slice(0, 5);

  // Unique sources
  const sources = [...new Set(leads.map((l) => l.source).filter(Boolean))];

  return {
    totalLeads,
    newLeads24h,
    weekLeads,
    conversionRate,
    convertedLeads,
    topSource,
    recentLeads,
    sources,
  };
};

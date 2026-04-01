/* ============================================
   Lead Management Page
   Full-featured LMS with table, filters,
   detail panel, notes, export/import
   ============================================ */

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  IconButton,
  Chip,
  Drawer,
  Divider,
  Button,
  Menu,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Icon } from "@iconify/react";
import {
  getLeads,
  getLeadById,
  updateLeadStatus,
  addLeadNote,
  deleteLead,
  deleteLeads,
  exportLeadsCSV,
  importLeadsCSV,
  getLeadStats,
} from "../utils/leadService";
import { sendConversionEvent } from "../../utils/metaCAPI";
import { generateEventId } from "../../utils/eventDedup";
import { exportGoogleAdsCSV } from "../utils/googleAdsExport";
import styles from "./LeadManagement.module.css";

// Status config
const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "#2196F3", bg: "#E3F2FD" },
  { value: "contacted", label: "Contacted", color: "#FF9800", bg: "#FFF3E0" },
  { value: "qualified", label: "Qualified", color: "#9C27B0", bg: "#F3E5F5" },
  { value: "converted", label: "Converted", color: "#4CAF50", bg: "#E8F5E9" },
  { value: "lost", label: "Lost", color: "#F44336", bg: "#FFEBEE" },
];

const DATE_RANGE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "custom", label: "Custom Range" },
];

const getStatusConfig = (status) =>
  STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatShortDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

// Columns config
const COLUMNS = [
  { id: "name", label: "Name", sortable: true },
  { id: "mobile", label: "Mobile", sortable: true },
  { id: "email", label: "Email", sortable: true },
  { id: "investment_interest", label: "Interest", sortable: true },
  { id: "current_occupation", label: "Occupation", sortable: false },
  { id: "source", label: "Source", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "submitted_at", label: "Date", sortable: true },
];

// Conversion type options
const CONVERSION_TYPES = [
  "Sale",
  "Qualified Lead",
  "Meeting Booked",
  "Site Visit",
  "Document Signed",
  "Other",
];

const LeadManagement = () => {
  // Data state
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);

  // Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // Table state
  const [orderBy, setOrderBy] = useState("submitted_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  // UI state
  const [detailLead, setDetailLead] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // null = bulk, string = single id
  const [bulkStatusMenu, setBulkStatusMenu] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [conversionModalOpen, setConversionModalOpen] = useState(false);
  const [conversionLead, setConversionLead] = useState(null);
  const [conversionValue, setConversionValue] = useState("");
  const [conversionType, setConversionType] = useState("");
  const [conversionSending, setConversionSending] = useState(false);
  const fileInputRef = useRef(null);

  // Sources from data
  const [availableSources, setAvailableSources] = useState([]);

  // Load data
  const loadData = useCallback(() => {
    const filters = {
      search,
      status: statusFilter,
      source: sourceFilter,
      dateRange,
      startDate: customStart,
      endDate: customEnd,
    };
    const data = getLeads(filters);
    setLeads(data);

    const s = getLeadStats();
    setStats(s);
    setAvailableSources(s.sources);
  }, [search, statusFilter, sourceFilter, dateRange, customStart, customEnd]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Sorting
  const sortedLeads = useMemo(() => {
    const sorted = [...leads];
    sorted.sort((a, b) => {
      let aVal = a[orderBy] || "";
      let bVal = b[orderBy] || "";
      if (orderBy === "submitted_at") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [leads, orderBy, order]);

  // Paginated leads
  const paginatedLeads = useMemo(
    () => sortedLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedLeads, page, rowsPerPage]
  );

  // Handlers
  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(paginatedLeads.map((l) => l.lead_id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    updateLeadStatus(id, newStatus);
    loadData();
    if (detailLead && detailLead.lead_id === id) {
      setDetailLead(getLeadById(id));
    }
    showSnackbar(`Status updated to "${newStatus}"`);
  };

  const handleBulkStatusChange = (newStatus) => {
    selected.forEach((id) => updateLeadStatus(id, newStatus));
    setBulkStatusMenu(null);
    setSelected([]);
    loadData();
    showSnackbar(`Updated ${selected.length} leads to "${newStatus}"`);
  };

  const handleViewDetail = (lead) => {
    setDetailLead(lead);
    setDetailOpen(true);
    setNoteText("");
  };

  const handleAddNote = () => {
    if (!noteText.trim() || !detailLead) return;
    const updated = addLeadNote(detailLead.lead_id, noteText.trim());
    setDetailLead(updated);
    setNoteText("");
    loadData();
    showSnackbar("Note added");
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteLead(deleteTarget);
      showSnackbar("Lead deleted");
    } else {
      deleteLeads(selected);
      showSnackbar(`${selected.length} leads deleted`);
      setSelected([]);
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
    if (detailOpen) {
      setDetailOpen(false);
      setDetailLead(null);
    }
    loadData();
  };

  const handleExport = () => {
    const dataToExport = selected.length > 0
      ? leads.filter((l) => selected.includes(l.lead_id))
      : leads;
    exportLeadsCSV(dataToExport);
    showSnackbar(`Exported ${dataToExport.length} leads`);
  };

  const handleGoogleAdsExport = () => {
    const allLeads = getLeads({});
    const result = exportGoogleAdsCSV(allLeads);
    if (result.exported === 0) {
      showSnackbar(
        result.skipped > 0
          ? `No leads with GCLID to export (${result.skipped} converted leads have no GCLID)`
          : 'No converted leads found for Google Ads export',
        'warning'
      );
    } else {
      showSnackbar(
        `Exported ${result.exported} conversions for Google Ads${result.skipped > 0 ? ` (${result.skipped} skipped — no GCLID)` : ''}`,
        'success'
      );
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importLeadsCSV(ev.target.result);
      loadData();
      showSnackbar(`Imported ${result.imported} leads (${result.duplicates} duplicates skipped)`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSourceFilter("all");
    setDateRange("all");
    setCustomStart("");
    setCustomEnd("");
    setPage(0);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const hasActiveFilters = search || statusFilter !== "all" || sourceFilter !== "all" || dateRange !== "all";

  const handleOpenConversionModal = (lead) => {
    setConversionLead(lead);
    setConversionValue("");
    setConversionType("");
    setConversionModalOpen(true);
  };

  const handleSendConversion = async () => {
    if (!conversionLead || !conversionValue || !conversionType) return;
    setConversionSending(true);

    try {
      const eventId = generateEventId();
      const result = await sendConversionEvent(
        {
          name: conversionLead.name,
          email: conversionLead.email,
          mobile: conversionLead.mobile,
        },
        {
          value: parseFloat(conversionValue),
          currency: 'INR',
          conversion_type: conversionType,
          event_id: eventId,
        }
      );

      // Update lead status to converted
      updateLeadStatus(conversionLead.lead_id, 'converted');

      // Store conversion value on the lead for Google Ads export
      const allLeads = JSON.parse(localStorage.getItem('lp_submitted_leads') || '[]');
      const targetLead = allLeads.find((l) => l.lead_id === conversionLead.lead_id);
      if (targetLead) {
        targetLead.conversion_value = parseFloat(conversionValue);
        targetLead.conversion_type = conversionType;
        targetLead.converted_at = new Date().toISOString();
        localStorage.setItem('lp_submitted_leads', JSON.stringify(allLeads));
      }

      // Add activity note about conversion
      addLeadNote(
        conversionLead.lead_id,
        `Conversion sent to Meta CAPI: ${conversionType} - \u20B9${parseFloat(conversionValue).toLocaleString('en-IN')} (Event ID: ${eventId})`
      );

      // Log Google Ads offline conversion status
      if (conversionLead.gclid) {
        addLeadNote(
          conversionLead.lead_id,
          `Google Ads offline conversion ready for export (GCLID: ${conversionLead.gclid.slice(0, 12)}...)`
        );
      }

      loadData();

      if (detailLead && detailLead.lead_id === conversionLead.lead_id) {
        setDetailLead(getLeadById(conversionLead.lead_id));
      }

      setConversionModalOpen(false);
      showSnackbar(
        result.success
          ? 'Conversion event sent to Meta successfully'
          : 'Conversion recorded locally (CAPI endpoint not available)',
        result.success ? 'success' : 'warning'
      );
    } catch (error) {
      console.error('Conversion error:', error);
      showSnackbar('Failed to send conversion event', 'error');
    } finally {
      setConversionSending(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Lead Management</h1>
          <p className={styles.pageSubtitle}>
            View and manage all your leads in one place.
          </p>
        </div>
        <div className={styles.headerActions}>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<Icon icon="mdi:upload" />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ textTransform: "none", borderColor: "#ddd", color: "#555" }}
          >
            Import CSV
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Icon icon="mdi:download" />}
            onClick={handleExport}
            sx={{ textTransform: "none", borderColor: "#ddd", color: "#555" }}
          >
            Export CSV
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Icon icon="mdi:google-ads" />}
            onClick={handleGoogleAdsExport}
            sx={{ textTransform: "none", borderColor: "#4285F4", color: "#4285F4" }}
          >
            Export for Google Ads
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      {stats && (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <Icon icon="mdi:account-multiple" width={22} />
            </div>
            <div>
              <p className={styles.statValue}>{stats.totalLeads}</p>
              <p className={styles.statLabel}>Total Leads</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <Icon icon="mdi:account-plus" width={22} />
            </div>
            <div>
              <p className={styles.statValue}>{stats.newLeads24h}</p>
              <p className={styles.statLabel}>New Today</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconTeal}`}>
              <Icon icon="mdi:percent" width={22} />
            </div>
            <div>
              <p className={styles.statValue}>{stats.conversionRate}%</p>
              <p className={styles.statLabel}>Conversion Rate</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
              <Icon icon="mdi:target" width={22} />
            </div>
            <div>
              <p className={styles.statValue} title={stats.topSource}>
                {stats.topSource.length > 14
                  ? stats.topSource.slice(0, 14) + "..."
                  : stats.topSource}
              </p>
              <p className={styles.statLabel}>Top Source</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={styles.card}>
        <div className={styles.filtersBar}>
          <TextField
            size="small"
            placeholder="Search by name, email, or mobile..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" width={20} style={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 240, flex: "1 1 240px" }}
          />
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            >
              <MenuItem value="all">All Status</MenuItem>
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Source</InputLabel>
            <Select
              value={sourceFilter}
              label="Source"
              onChange={(e) => { setSourceFilter(e.target.value); setPage(0); }}
            >
              <MenuItem value="all">All Sources</MenuItem>
              {availableSources.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={(e) => { setDateRange(e.target.value); setPage(0); }}
            >
              {DATE_RANGE_OPTIONS.map((d) => (
                <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {dateRange === "custom" && (
            <>
              <TextField
                size="small"
                type="date"
                label="Start Date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 140 }}
              />
              <TextField
                size="small"
                type="date"
                label="End Date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 140 }}
              />
            </>
          )}
        </div>

        {/* Active filters chips */}
        {hasActiveFilters && (
          <div className={styles.filterChips}>
            {search && (
              <Chip
                label={`Search: "${search}"`}
                size="small"
                onDelete={() => setSearch("")}
              />
            )}
            {statusFilter !== "all" && (
              <Chip
                label={`Status: ${getStatusConfig(statusFilter).label}`}
                size="small"
                onDelete={() => setStatusFilter("all")}
              />
            )}
            {sourceFilter !== "all" && (
              <Chip
                label={`Source: ${sourceFilter}`}
                size="small"
                onDelete={() => setSourceFilter("all")}
              />
            )}
            {dateRange !== "all" && (
              <Chip
                label={`Date: ${DATE_RANGE_OPTIONS.find((d) => d.value === dateRange)?.label}`}
                size="small"
                onDelete={() => { setDateRange("all"); setCustomStart(""); setCustomEnd(""); }}
              />
            )}
            <Chip
              label="Clear All"
              size="small"
              variant="outlined"
              onClick={clearFilters}
              sx={{ cursor: "pointer" }}
            />
          </div>
        )}

        {/* Bulk actions bar */}
        {selected.length > 0 && (
          <div className={styles.bulkBar}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {selected.length} lead{selected.length > 1 ? "s" : ""} selected
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => setBulkStatusMenu(e.currentTarget)}
              startIcon={<Icon icon="mdi:swap-horizontal" />}
              sx={{ textTransform: "none" }}
            >
              Change Status
            </Button>
            <Menu
              anchorEl={bulkStatusMenu}
              open={Boolean(bulkStatusMenu)}
              onClose={() => setBulkStatusMenu(null)}
            >
              {STATUS_OPTIONS.map((s) => (
                <MenuItem
                  key={s.value}
                  onClick={() => handleBulkStatusChange(s.value)}
                >
                  <Chip
                    label={s.label}
                    size="small"
                    sx={{ bgcolor: s.bg, color: s.color, fontWeight: 600, mr: 1 }}
                  />
                </MenuItem>
              ))}
            </Menu>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => { setDeleteTarget(null); setDeleteDialogOpen(true); }}
              startIcon={<Icon icon="mdi:delete-outline" />}
              sx={{ textTransform: "none" }}
            >
              Delete Selected
            </Button>
          </div>
        )}

        {/* Table */}
        {leads.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Icon icon="mdi:account-group-outline" width={56} height={56} />
            </div>
            <p className={styles.emptyText}>
              {hasActiveFilters ? "No leads match your filters" : "No leads yet"}
            </p>
            <p className={styles.emptySubtext}>
              {hasActiveFilters
                ? "Try adjusting your filters or search terms."
                : "New leads will appear here as they come in from your landing page forms."}
            </p>
            {hasActiveFilters && (
              <Button
                size="small"
                onClick={clearFilters}
                sx={{ mt: 2, textTransform: "none" }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 && selected.length < paginatedLeads.length
                        }
                        checked={
                          paginatedLeads.length > 0 && selected.length === paginatedLeads.length
                        }
                        onChange={handleSelectAll}
                        size="small"
                      />
                    </TableCell>
                    {COLUMNS.map((col) => (
                      <TableCell key={col.id} sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                        {col.sortable ? (
                          <TableSortLabel
                            active={orderBy === col.id}
                            direction={orderBy === col.id ? order : "asc"}
                            onClick={() => handleSort(col.id)}
                          >
                            {col.label}
                          </TableSortLabel>
                        ) : (
                          col.label
                        )}
                      </TableCell>
                    ))}
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedLeads.map((lead) => {
                    const sc = getStatusConfig(lead.status);
                    const isSelected = selected.includes(lead.lead_id);
                    return (
                      <TableRow
                        key={lead.lead_id}
                        hover
                        selected={isSelected}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleViewDetail(lead)}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleSelectOne(lead.lead_id)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {lead.name || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>{lead.mobile || "—"}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {lead.email || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>{lead.investment_interest || "—"}</TableCell>
                        <TableCell>{lead.current_occupation || "—"}</TableCell>
                        <TableCell>
                          <Chip
                            label={lead.source || "—"}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={lead.status || "new"}
                            size="small"
                            onChange={(e) => handleStatusChange(lead.lead_id, e.target.value)}
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              bgcolor: sc.bg,
                              color: sc.color,
                              height: 30,
                              "& .MuiSelect-select": { py: 0.5, px: 1 },
                              "& .MuiOutlinedInput-notchedOutline": { borderColor: sc.color + "44" },
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                <Chip
                                  label={s.label}
                                  size="small"
                                  sx={{ bgcolor: s.bg, color: s.color, fontWeight: 600 }}
                                />
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                            {formatShortDate(lead.submitted_at)}
                          </Typography>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Tooltip title="View Details">
                            <IconButton size="small" onClick={() => handleViewDetail(lead)}>
                              <Icon icon="mdi:eye-outline" width={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => { setDeleteTarget(lead.lead_id); setDeleteDialogOpen(true); }}
                            >
                              <Icon icon="mdi:delete-outline" width={18} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={sortedLeads.length}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </>
        )}
      </div>

      {/* Detail Drawer */}
      <Drawer
        anchor="right"
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 420 }, p: 0 } }}
      >
        {detailLead && (
          <LeadDetailPanel
            lead={detailLead}
            onClose={() => setDetailOpen(false)}
            onStatusChange={(status) => {
              handleStatusChange(detailLead.lead_id, status);
            }}
            noteText={noteText}
            setNoteText={setNoteText}
            onAddNote={handleAddNote}
            onDelete={() => { setDeleteTarget(detailLead.lead_id); setDeleteDialogOpen(true); }}
            onSendConversion={() => handleOpenConversionModal(detailLead)}
          />
        )}
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTarget
              ? "Are you sure you want to delete this lead? This action cannot be undone."
              : `Are you sure you want to delete ${selected.length} selected lead(s)? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Conversion Modal */}
      <Dialog
        open={conversionModalOpen}
        onClose={() => setConversionModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Icon icon="mdi:send-check" width={22} style={{ color: "#4CAF50" }} />
          Record Conversion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Record a conversion for{" "}
            <strong>{conversionLead?.name || "this lead"}</strong>. This will
            send a conversion event to Meta CAPI and{conversionLead?.gclid ? ' mark it for Google Ads offline conversion export' : ' record it locally'}.
          </DialogContentText>
          <TextField
            fullWidth
            label="Conversion Value"
            type="number"
            value={conversionValue}
            onChange={(e) => setConversionValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{"\u20B9"}</InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Conversion Type</InputLabel>
            <Select
              value={conversionType}
              label="Conversion Type"
              onChange={(e) => setConversionType(e.target.value)}
            >
              {CONVERSION_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConversionModalOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendConversion}
            variant="contained"
            disabled={!conversionValue || !conversionType || conversionSending}
            startIcon={
              conversionSending ? (
                <Icon icon="mdi:loading" width={18} className="spin" />
              ) : (
                <Icon icon="mdi:send" width={18} />
              )
            }
            sx={{
              textTransform: "none",
              bgcolor: "#4CAF50",
              "&:hover": { bgcolor: "#388E3C" },
            }}
          >
            {conversionSending ? "Sending..." : "Send Conversion"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

/* ============================================
   Lead Detail Panel (Slide-out)
   ============================================ */
const LeadDetailPanel = ({
  lead,
  onClose,
  onStatusChange,
  noteText,
  setNoteText,
  onAddNote,
  onDelete,
  onSendConversion,
}) => {
  const sc = getStatusConfig(lead.status);

  const Section = ({ title, icon, children }) => (
    <div style={{ marginBottom: 20 }}>
      <Typography
        variant="subtitle2"
        sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.2, color: "#2D3561", fontWeight: 600 }}
      >
        <Icon icon={icon} width={18} />
        {title}
      </Typography>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.6 }}>
      <Typography variant="caption" sx={{ color: "#888", minWidth: 100 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right", wordBreak: "break-word", maxWidth: "60%" }}>
        {value || "—"}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#2D3561" }}>
            {lead.name || "Unknown Lead"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#888" }}>
            ID: {lead.lead_id?.slice(0, 8)}...
          </Typography>
        </div>
        <IconButton onClick={onClose} size="small">
          <Icon icon="mdi:close" width={22} />
        </IconButton>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2 }}>
        {/* Status */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" sx={{ color: "#888", mb: 0.5, display: "block" }}>
            Status
          </Typography>
          <Select
            value={lead.status || "new"}
            size="small"
            fullWidth
            onChange={(e) => onStatusChange(e.target.value)}
            sx={{
              fontWeight: 600,
              bgcolor: sc.bg,
              color: sc.color,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: sc.color + "44" },
            }}
          >
            {STATUS_OPTIONS.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                <Chip label={s.label} size="small" sx={{ bgcolor: s.bg, color: s.color, fontWeight: 600 }} />
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Contact Details */}
        <Section title="Contact Details" icon="mdi:account-circle-outline">
          <InfoRow label="Name" value={lead.name} />
          <InfoRow label="Mobile" value={lead.mobile} />
          <InfoRow label="Email" value={lead.email} />
        </Section>

        {/* Interest Details */}
        <Section title="Interest Details" icon="mdi:briefcase-outline">
          <InfoRow label="Service Interest" value={lead.investment_interest} />
          <InfoRow label="Occupation" value={lead.current_occupation} />
        </Section>

        {/* Source & UTM */}
        <Section title="Source & UTM Data" icon="mdi:web">
          <InfoRow label="Source" value={lead.source} />
          <InfoRow label="UTM Source" value={lead.utm_source} />
          <InfoRow label="UTM Medium" value={lead.utm_medium} />
          <InfoRow label="UTM Campaign" value={lead.utm_campaign} />
          <InfoRow label="UTM Term" value={lead.utm_term} />
          <InfoRow label="UTM Content" value={lead.utm_content} />
          <InfoRow label="GCLID" value={lead.gclid} />
        </Section>

        {/* Conversion Tracking */}
        <Section title="Conversion Tracking" icon="mdi:chart-timeline-variant-shimmer">
          <InfoRow label="GCLID" value={lead.gclid ? (lead.gclid.length > 20 ? lead.gclid.slice(0, 20) + '...' : lead.gclid) : '—'} />
          <InfoRow label="UTM Source" value={lead.utm_source || '—'} />
          <InfoRow label="UTM Medium" value={lead.utm_medium || '—'} />
          <InfoRow label="UTM Campaign" value={lead.utm_campaign || '—'} />
          <InfoRow label="UTM Term" value={lead.utm_term || '—'} />
          <InfoRow label="UTM Content" value={lead.utm_content || '—'} />
          <Divider sx={{ my: 1 }} />
          <InfoRow
            label="Google Ads"
            value={
              lead.gclid
                ? lead.status === 'converted'
                  ? 'Ready for export'
                  : 'GCLID captured'
                : 'No GCLID'
            }
          />
          <InfoRow
            label="Meta CAPI"
            value={
              (lead.notes || []).some((n) => n.text?.includes('Meta CAPI'))
                ? 'Conversion sent'
                : 'Pending'
            }
          />
          {lead.conversion_value && (
            <InfoRow label="Conv. Value" value={`\u20B9${parseFloat(lead.conversion_value).toLocaleString('en-IN')}`} />
          )}
          {lead.conversion_type && (
            <InfoRow label="Conv. Type" value={lead.conversion_type} />
          )}
          {lead.converted_at && (
            <InfoRow label="Converted At" value={formatDate(lead.converted_at)} />
          )}
        </Section>

        {/* Submission Details */}
        <Section title="Submission Details" icon="mdi:information-outline">
          <InfoRow label="Submitted" value={formatDate(lead.submitted_at)} />
          <InfoRow label="Page URL" value={lead.page_url} />
          <InfoRow label="User Agent" value={lead.user_agent?.slice(0, 60) + (lead.user_agent?.length > 60 ? "..." : "")} />
        </Section>

        <Divider sx={{ mb: 2 }} />

        {/* Notes */}
        <Section title="Notes" icon="mdi:note-text-outline">
          <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
            <TextField
              size="small"
              fullWidth
              multiline
              minRows={2}
              placeholder="Add a note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </Box>
          <Button
            size="small"
            variant="contained"
            onClick={onAddNote}
            disabled={!noteText.trim()}
            startIcon={<Icon icon="mdi:plus" />}
            sx={{ textTransform: "none", mb: 1.5, bgcolor: "#2EC4B6", "&:hover": { bgcolor: "#26A69A" } }}
          >
            Add Note
          </Button>
          {(lead.notes || []).length === 0 ? (
            <Typography variant="caption" sx={{ color: "#aaa" }}>No notes yet.</Typography>
          ) : (
            [...(lead.notes || [])].reverse().map((note) => (
              <Box
                key={note.id}
                sx={{ bgcolor: "#F8FAFC", p: 1.5, borderRadius: 1.5, mb: 1, border: "1px solid #E2E8F0" }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 0.5 }}>
                  {note.text}
                </Typography>
                <Typography variant="caption" sx={{ color: "#999" }}>
                  {formatDate(note.timestamp)}
                </Typography>
              </Box>
            ))
          )}
        </Section>

        <Divider sx={{ mb: 2 }} />

        {/* Activity Timeline */}
        <Section title="Activity Timeline" icon="mdi:timeline-clock-outline">
          {(lead.activity || []).length === 0 ? (
            <Typography variant="caption" sx={{ color: "#aaa" }}>No activity recorded.</Typography>
          ) : (
            [...(lead.activity || [])].reverse().map((act, i) => {
              const actSc = getStatusConfig(act.status);
              return (
                <Box
                  key={i}
                  sx={{ display: "flex", gap: 1.5, mb: 1.2, alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: actSc.color,
                      mt: 0.7,
                      flexShrink: 0,
                    }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      {act.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#999" }}>
                      {formatDate(act.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              );
            })
          )}
        </Section>
      </Box>

      {/* Footer Actions */}
      <Box sx={{ px: 2.5, py: 1.5, borderTop: "1px solid #E2E8F0", bgcolor: "#F8FAFC", display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          startIcon={<Icon icon="mdi:send-check" />}
          onClick={onSendConversion}
          sx={{
            textTransform: "none",
            bgcolor: "#4CAF50",
            "&:hover": { bgcolor: "#388E3C" },
          }}
        >
          Mark as Converted
        </Button>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          color="error"
          startIcon={<Icon icon="mdi:delete-outline" />}
          onClick={onDelete}
          sx={{ textTransform: "none" }}
        >
          Delete Lead
        </Button>
      </Box>
    </Box>
  );
};

export default LeadManagement;

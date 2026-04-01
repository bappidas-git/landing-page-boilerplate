/* ============================================
   Dashboard Page
   ============================================ */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Chip } from '@mui/material';
import { getLeadStats } from '../utils/leadService';
import styles from './Dashboard.module.css';

const STATUS_COLORS = {
  new: { color: "#2196F3", bg: "#E3F2FD" },
  contacted: { color: "#FF9800", bg: "#FFF3E0" },
  qualified: { color: "#9C27B0", bg: "#F3E5F5" },
  converted: { color: "#4CAF50", bg: "#E8F5E9" },
  lost: { color: "#F44336", bg: "#FFEBEE" },
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(getLeadStats());
  }, []);

  const statCards = [
    { label: 'Total Leads', value: stats?.totalLeads ?? 0, icon: 'mdi:account-multiple', colorClass: 'statIconBlue' },
    { label: "Today's Leads", value: stats?.newLeads24h ?? 0, icon: 'mdi:account-plus', colorClass: 'statIconGreen' },
    { label: "This Week's Leads", value: stats?.weekLeads ?? 0, icon: 'mdi:chart-line', colorClass: 'statIconOrange' },
    { label: 'Conversion Rate', value: `${stats?.conversionRate ?? 0}%`, icon: 'mdi:percent', colorClass: 'statIconTeal' },
  ];

  const recentLeads = stats?.recentLeads || [];

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back. Here's your overview.</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles[stat.colorClass]}`}>
              <Icon icon={stat.icon} width={24} height={24} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.recentSection}>
        <div className={styles.recentHeader}>
          <h2 className={styles.sectionTitle}>Recent Leads</h2>
          <Link to="/admin/lms" className={styles.viewAllLink}>
            View All
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Icon icon="mdi:inbox-outline" width={48} height={48} />
            </div>
            <p className={styles.emptyText}>No leads yet</p>
            <p className={styles.emptySubtext}>New leads will appear here as they come in.</p>
          </div>
        ) : (
          <table className={styles.recentTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => {
                const sc = STATUS_COLORS[lead.status] || STATUS_COLORS.new;
                return (
                  <tr key={lead.lead_id}>
                    <td className={styles.leadName}>{lead.name || '—'}</td>
                    <td>{lead.mobile || '—'}</td>
                    <td>
                      <Chip label={lead.source || '—'} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                    </td>
                    <td>
                      <Chip
                        label={lead.status || 'new'}
                        size="small"
                        sx={{ bgcolor: sc.bg, color: sc.color, fontWeight: 600, fontSize: '0.7rem' }}
                      />
                    </td>
                    <td className={styles.leadDate}>
                      {lead.submitted_at
                        ? new Date(lead.submitted_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
                        : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

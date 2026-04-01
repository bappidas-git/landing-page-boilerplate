/* ============================================
   Dashboard Page
   ============================================ */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './Dashboard.module.css';

const stats = [
  { label: 'Total Leads', value: '0', icon: 'mdi:account-multiple', colorClass: 'statIconBlue' },
  { label: "Today's Leads", value: '0', icon: 'mdi:account-plus', colorClass: 'statIconGreen' },
  { label: "This Week's Leads", value: '0', icon: 'mdi:chart-line', colorClass: 'statIconOrange' },
  { label: 'Conversion Rate', value: '0%', icon: 'mdi:percent', colorClass: 'statIconTeal' },
];

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back. Here's your overview.</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
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
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Icon icon="mdi:inbox-outline" width={48} height={48} />
          </div>
          <p className={styles.emptyText}>No leads yet</p>
          <p className={styles.emptySubtext}>New leads will appear here as they come in.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

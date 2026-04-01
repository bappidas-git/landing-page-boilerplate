/* ============================================
   Lead Management Page (Placeholder)
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './LeadManagement.module.css';

const LeadManagement = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Lead Management</h1>
          <p className={styles.pageSubtitle}>View and manage all your leads in one place.</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Icon icon="mdi:account-group-outline" width={56} height={56} />
          </div>
          <p className={styles.emptyText}>Lead management coming soon</p>
          <p className={styles.emptySubtext}>
            This section will include lead listing, filtering, and detailed lead views.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;

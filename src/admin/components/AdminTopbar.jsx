/* ============================================
   Admin Topbar
   ============================================ */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAdminAuth } from '../context/AdminAuthContext';
import styles from './AdminTopbar.module.css';

const routeLabels = {
  '/admin/dashboard': 'Dashboard',
  '/admin/lms': 'Lead Management',
  '/admin/settings': 'Settings',
};

const AdminTopbar = ({ onMobileMenuToggle }) => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();

  const currentLabel = routeLabels[location.pathname] || 'Admin';
  const initials = (user?.username || 'A').charAt(0).toUpperCase();

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button className={styles.menuButton} onClick={onMobileMenuToggle} aria-label="Open menu">
          <Icon icon="mdi:menu" width={24} height={24} />
        </button>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <span className={styles.breadcrumbLink}>Admin</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{currentLabel}</span>
        </nav>
      </div>

      <div className={styles.topbarRight}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>{initials}</div>
          <span>{user?.username || 'Admin'}</span>
        </div>
        <button className={styles.logoutBtn} onClick={logout}>
          <Icon icon="mdi:logout" width={16} height={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;

/* ============================================
   Admin Sidebar Navigation
   ============================================ */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAdminAuth } from '../context/AdminAuthContext';
import styles from './AdminSidebar.module.css';

const navItems = [
  { label: 'Dashboard', icon: 'mdi:view-dashboard', path: '/admin/dashboard' },
  { label: 'Lead Management', icon: 'mdi:account-group', path: '/admin/lms' },
  { label: 'Settings', icon: 'mdi:cog', path: '/admin/settings' },
];

const AdminSidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { logout } = useAdminAuth();

  const sidebarClasses = [
    styles.sidebar,
    collapsed && styles.sidebarCollapsed,
    mobileOpen && styles.sidebarOpen,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {mobileOpen && <div className={styles.overlay} onClick={onMobileClose} />}
      <aside className={sidebarClasses}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <Icon icon="mdi:shield-lock" width={20} height={20} color="#fff" />
            </div>
            <span className={styles.logoText}>Admin</span>
          </div>
          <button className={styles.collapseButton} onClick={onToggle} aria-label="Toggle sidebar">
            <Icon icon={collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'} width={20} height={20} />
          </button>
        </div>

        <nav className={styles.navSection}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin/dashboard'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
              onClick={onMobileClose}
            >
              <span className={styles.navIcon}>
                <Icon icon={item.icon} width={22} height={22} />
              </span>
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={logout}>
            <span className={styles.navIcon}>
              <Icon icon="mdi:logout" width={22} height={22} />
            </span>
            <span className={styles.navLabel}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

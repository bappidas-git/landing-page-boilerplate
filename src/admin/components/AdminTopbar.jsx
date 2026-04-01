/* ============================================
   Admin Topbar — Primary Navigation Header
   ============================================ */

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAdminAuth } from '../context/AdminAuthContext';
import styles from './AdminTopbar.module.css';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: 'mdi:view-dashboard' },
  { label: 'Lead Management', path: '/admin/lms', icon: 'mdi:account-group' },
  { label: 'Guideline', path: '/admin/guideline', icon: 'mdi:book-open-page-variant' },
];

const AdminTopbar = () => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const initials = (user?.username || 'A').charAt(0).toUpperCase();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <img
          src="https://assamdigital.com/wp-content/uploads/2022/04/logo.png"
          alt="Assam Digital"
          className={styles.logo}
        />
        <span className={styles.divider} />
        <span className={styles.badge}>LMS</span>
      </div>

      <nav className={styles.desktopNav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin/dashboard'}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            <Icon icon={item.icon} width={18} height={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.topbarRight}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>{initials}</div>
          <span className={styles.userName}>{user?.username || 'Admin'}</span>
        </div>
        <button className={styles.logoutBtn} onClick={logout}>
          <Icon icon="mdi:logout" width={16} height={16} />
          Logout
        </button>
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <Icon icon={mobileMenuOpen ? 'mdi:close' : 'mdi:menu'} width={24} height={24} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin/dashboard'}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
              }
            >
              <Icon icon={item.icon} width={20} height={20} />
              {item.label}
            </NavLink>
          ))}
          <button className={styles.mobileLogout} onClick={logout}>
            <Icon icon="mdi:logout" width={20} height={20} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminTopbar;

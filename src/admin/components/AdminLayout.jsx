/* ============================================
   Admin Layout Component
   ============================================ */

import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useMediaQuery, CircularProgress, Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import styles from './AdminLayout.module.css';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const LeadManagement = lazy(() => import('../pages/LeadManagement'));

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
    <CircularProgress sx={{ color: '#2EC4B6' }} />
  </Box>
);

const AdminLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const mainClasses = [styles.mainArea, !isMobile && collapsed && styles.mainAreaCollapsed]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.layout}>
      <AdminSidebar
        collapsed={!isMobile && collapsed}
        onToggle={handleToggle}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={mainClasses}>
        <AdminTopbar onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className={styles.content}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="lms" element={<LeadManagement />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

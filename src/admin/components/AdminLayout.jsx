/* ============================================
   Admin Layout Component
   ============================================ */

import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import AdminTopbar from './AdminTopbar';
import { initAdminConfig } from '../utils/adminConfig';
import styles from './AdminLayout.module.css';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const LeadManagement = lazy(() => import('../pages/LeadManagement'));
const LeadDetail = lazy(() => import('../pages/LeadDetail'));
const Guideline = lazy(() => import('../pages/Guideline'));

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
    <CircularProgress sx={{ color: '#2EC4B6' }} />
  </Box>
);

const AdminLayout = () => {
  useEffect(() => {
    initAdminConfig();
  }, []);

  return (
    <div className={styles.layout}>
      <AdminTopbar />
      <div className={styles.mainArea}>
        <main className={styles.content}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="lms" element={<LeadManagement />} />
              <Route path="lms/lead/:leadId" element={<LeadDetail />} />
              <Route path="guideline" element={<Guideline />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

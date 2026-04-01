/* ============================================
   Admin Login Page
   ============================================ */

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { TextField, Checkbox, CircularProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import { useAdminAuth } from '../context/AdminAuthContext';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 300));

    const result = login(username, password, rememberMe);
    if (!result.success) {
      setError(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.loginLogo}>
            <Icon icon="mdi:shield-lock" width={28} height={28} />
          </div>
          <h1 className={styles.loginTitle}>Admin Panel</h1>
          <p className={styles.loginSubtitle}>Sign in to manage your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="username">
              Username
            </label>
            <TextField
              id="username"
              size="small"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="password">
              Password
            </label>
            <TextField
              id="password"
              type="password"
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          <div className={styles.rememberRow}>
            <Checkbox
              id="remember"
              size="small"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ padding: 0, color: '#2EC4B6', '&.Mui-checked': { color: '#2EC4B6' } }}
            />
            <label htmlFor="remember" className={styles.rememberLabel}>
              Remember me
            </label>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting || !username || !password}>
            {isSubmitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

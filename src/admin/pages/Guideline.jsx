/* ============================================
   Admin Guideline Page
   ============================================ */

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Guideline = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'var(--admin-text-primary)' }}>
        Guideline
      </Typography>
      <Paper
        sx={{
          p: 4,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'none',
        }}
      >
        <Typography variant="body1" sx={{ color: 'var(--admin-text-secondary)' }}>
          Admin guidelines and documentation will be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Guideline;

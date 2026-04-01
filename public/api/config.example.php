<?php
/* ============================================
   Meta Conversions API Configuration
   Copy this file to config.php and fill in
   your credentials from Meta Business Manager.

   To get your credentials:
   1. Go to Meta Events Manager
   2. Select your Pixel
   3. Go to Settings > Conversions API
   4. Generate an Access Token
   ============================================ */

// Meta Pixel ID (found in Events Manager > Data Sources)
define('META_PIXEL_ID', 'YOUR_PIXEL_ID');

// Conversions API Access Token (generated in Events Manager > Settings)
define('META_ACCESS_TOKEN', 'YOUR_ACCESS_TOKEN');

// Meta Graph API Version
define('META_API_VERSION', 'v19.0');

// Test Event Code (from Events Manager > Test Events tab)
// Remove or leave empty in production
define('META_TEST_EVENT_CODE', '');

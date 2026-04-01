/* ============================================
   HeroSection Component - GNRC Medishop
   Franchise opportunity hero section with animations
   ============================================ */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Grid,
  Chip,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import UnifiedLeadForm from "../../common/UnifiedLeadForm/UnifiedLeadForm";
import { useModal } from "../../../context/ModalContext";
import styles from "./HeroSection.module.css";

// Unsplash hero images with fallbacks (no video for GNRC)
const HERO_IMAGES = {
  desktop: [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1920&h=800&fit=crop&q=80",
  ],
  mobile: [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=768&h=1000&fit=crop&q=80",
  ],
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Trust indicators data
const trustIndicators = [
  { icon: "mdi:trophy-outline", text: "20+ Years" },
  { icon: "mdi:currency-inr", text: "₹80 Cr Turnover" },
  { icon: "mdi:package-variant-closed", text: "50K+ Products" },
  { icon: "mdi:tag-outline", text: "1200+ Brands" },
  { icon: "mdi:percent-outline", text: "22% Margin" },
];

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const { openLeadDrawer } = useModal();

  // Fallback image state
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Video disabled for GNRC — use gradient + image only
  const videoError = true;

  // Try loading fallback images in order
  useEffect(() => {
    const images = isMobile ? HERO_IMAGES.mobile : HERO_IMAGES.desktop;
    let cancelled = false;

    const tryLoadImage = async () => {
      for (const url of images) {
        if (cancelled) return;
        try {
          const loaded = await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            setTimeout(() => resolve(false), 5000);
          });
          if (loaded && !cancelled) {
            setHeroImageUrl(url);
            setImageLoaded(true);
            return;
          }
        } catch {
          continue;
        }
      }
      console.warn("All hero images failed to load, using gradient fallback");
    };

    tryLoadImage();
    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  return (
    <section className={styles.heroSection} id="home">
      {/* === Background Layer 1: Gradient fallback (always present) === */}
      <div className={styles.heroBgGradient} />

      {/* === Background Layer 2: Fallback image === */}
      {imageLoaded && (
        <div
          className={styles.heroBgImage}
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
      )}

      {/* === Dark overlay for text readability === */}
      <div className={styles.heroOverlay} />

      {/* Animated Background Pattern */}
      <div className={styles.patternOverlay} />

      {/* Main Content */}
      <Container maxWidth="xl" className={styles.heroContainer}>
        <Grid container spacing={isMobile ? 3 : 6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} lg={7}>
            <motion.div
              className={styles.heroContent}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Pre-headline Badge */}
              <motion.div variants={badgeVariants}>
                <Chip
                  icon={<span className={styles.pulseDot} />}
                  label="🏪 NE India's #1 Pharma-Grocer Retail Franchise"
                  className={styles.launchBadge}
                  sx={{
                    backgroundColor: "#2EC4B6",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    height: "36px",
                    borderRadius: "20px",
                    "& .MuiChip-icon": {
                      marginLeft: "8px",
                    },
                  }}
                />
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  className={styles.heroTitle}
                  sx={{
                    color: "#FFFFFF",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: {
                      xs: "2.25rem",
                      sm: "2.75rem",
                      md: "3.25rem",
                      lg: "3.5rem",
                    },
                    lineHeight: 1.1,
                    marginTop: "1.5rem",
                  }}
                >
                  Own a
                  <span className={styles.orangeText}>
                    {" "}
                    GNRC Medishop Franchise
                  </span>
                </Typography>
              </motion.div>

              {/* Sub-headline */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  className={styles.heroSubtitle}
                  sx={{
                    color: "rgba(255, 255, 255, 0.85)",
                    fontWeight: 400,
                    fontSize: { xs: "0.95rem", md: "1.125rem" },
                    marginTop: "1rem",
                    maxWidth: "600px",
                    lineHeight: 1.6,
                  }}
                >
                  20+ Years Legacy | ₹80 Cr Turnover | 20-22% Gross Margin |
                  1,200+ Brand Partners | 9 Profitable Stores | Turnkey Setup
                  from ₹22 Lakhs
                </Typography>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={buttonVariants}
                className={styles.ctaButtons}
              >
                <Button
                  variant="contained"
                  size="large"
                  className={styles.primaryCta}
                  onClick={() => openLeadDrawer("apply-now")}
                  sx={{
                    backgroundColor: "#FF6B35",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "0.875rem 2rem",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: "0 4px 20px rgba(255, 107, 53, 0.4)",
                    "&:hover": {
                      backgroundColor: "#FF8C5A",
                      boxShadow: "0 6px 24px rgba(255, 107, 53, 0.5)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Apply for Franchise →
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className={styles.secondaryCta}
                  onClick={() => openLeadDrawer("download-brochure")}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "1rem",
                    padding: "0.875rem 2rem",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    borderWidth: "2px",
                    "&:hover": {
                      borderColor: "#FFFFFF",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderWidth: "2px",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Download Prospectus
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className={styles.trustIndicators}
              >
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className={styles.trustIndicator}>
                    <Icon icon={indicator.icon} className={styles.trustIcon} />
                    <span>{indicator.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Content - Lead Form (Desktop only) */}
          {isDesktop && (
            <Grid item lg={5}>
              <motion.div
                className={styles.formWrapper}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              >
                <div className={styles.formCard}>
                  <div className={styles.formHeader}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        textAlign: "center",
                        fontSize: "1.25rem",
                      }}
                    >
                      Franchise Enquiry
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        textAlign: "center",
                        marginTop: "0.25rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      Get complete investment details
                    </Typography>
                  </div>
                  <div className={styles.formBody}>
                    <UnifiedLeadForm
                      variant="hero"
                      showTitle={false}
                      showSubtitle={false}
                      showCourseFields={true}
                      showTrustBadges={true}
                      showConsent={true}
                      showPhoneButton={false}
                      submitButtonText="Submit Enquiry"
                      formId="hero-form"
                    />
                  </div>
                </div>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon icon="mdi:chevron-double-down" className={styles.scrollIcon} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

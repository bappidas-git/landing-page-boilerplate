/* ============================================
   ThankYou Page
   Post lead submission confirmation page
   ============================================ */

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import confetti from "canvas-confetti";
import styles from "./ThankYou.module.css";
import { updatePageSEO } from "../../utils/seo";
import { seoConfig } from "../../config/seo";

// TODO: Replace with actual content
// Programme highlights for display
const projectHighlights = [
  {
    icon: "mdi:store-check-outline",
    label: "Proven Business Model",
    color: "#2EC4B6",
  },
  {
    icon: "mdi:percent-circle",
    label: "Strong Margins",
    color: "#4CAF50",
  },
  {
    icon: "mdi:package-variant-closed",
    label: "10K+ Products",
    color: "#2196F3",
  },
  {
    icon: "mdi:account-group",
    label: "500+ Partners",
    color: "#9C27B0",
  },
];

// TODO: Replace with actual content
// Contact details
const contactInfo = {
  companyName: "Your Company Pvt. Ltd.",
  designation: "Business Excellence",
  phone: "+91-XXXXXXXXXX",
  email: "info@yourbusiness.com",
  address: "Your City, Your State",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
};

// TODO: Replace with actual content
// Quick links
const quickLinks = [
  { icon: "mdi:currency-inr", label: "Services", href: "/#investment" },
  { icon: "mdi:star-circle", label: "Why Us", href: "/#why-us" },
  { icon: "mdi:store", label: "Location", href: "/#stores" },
  { icon: "mdi:headset", label: "Support", href: "/#support" },
];

const ThankYou = () => {
  const navigate = useNavigate();
  const [, setUserName] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Check if user is authorized to view this page
  useEffect(() => {
    const leadSubmitted = sessionStorage.getItem("lead_submitted");
    const name = sessionStorage.getItem("lead_name");

    if (!leadSubmitted) {
      // Redirect to home if accessed directly
      navigate("/", { replace: true });
      return;
    }

    setIsAuthorized(true);
    setUserName(name || "there");

    // Set noindex meta and update page title for Thank You page
    updatePageSEO({
      title: seoConfig.pages.thankYou.title,
      description: seoConfig.pages.thankYou.description,
      url: seoConfig.siteUrl + '/thank-you',
      robots: 'noindex, nofollow',
    });

    // Push virtual pageview and conversion event to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'virtualPageview',
      pagePath: '/thank-you',
      pageTitle: 'Thank You',
    });
    window.dataLayer.push({
      event: 'lead_form_submission_complete',
      pagePath: '/thank-you',
    });

    // Clear the session flag after some time to prevent re-access
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("lead_submitted");
      sessionStorage.removeItem("lead_name");
    }, 300000); // 5 minutes

    return () => clearTimeout(timeout);
  }, [navigate]);

  // Fire confetti effect
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 10000,
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left side confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#2EC4B6", "#5DD9CE", "#FFD700", "#FFA500"],
      });

      // Right side confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#2EC4B6", "#5DD9CE", "#FFD700", "#FFA500"],
      });
    }, 250);

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2EC4B6", "#5DD9CE", "#FFD700", "#4CAF50", "#2196F3"],
    });
  }, []);

  // Trigger confetti on mount
  useEffect(() => {
    if (isAuthorized) {
      const timer = setTimeout(fireConfetti, 300);
      return () => clearTimeout(timer);
    }
  }, [isAuthorized, fireConfetti]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

  return (
    <div className={styles.thankYouPage}>
      {/* Background Elements */}
      <div className={styles.bgPattern} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.content}
        >
          {/* Success Icon */}
          <motion.div variants={scaleVariants} className={styles.successIcon}>
            <div className={styles.iconWrapper}>
              <Icon icon="mdi:check-circle" />
            </div>
            <div className={styles.iconRing} />
            <div className={styles.iconRing2} />
          </motion.div>

          {/* TODO: Replace with actual content */}
          {/* Thank You Message */}
          <motion.div
            variants={itemVariants}
            className={styles.thankYouMessage}
          >
            <Typography variant="h2" className={styles.title}>
              Thank You for Your Interest!
            </Typography>
            <Typography
              className={styles.subtitle}
              sx={{ color: "#FFFFFFB3 !important" }}
            >
              Your enquiry has been received. Our team will contact you within
              24 hours to discuss the details.
            </Typography>
          </motion.div>

          {/* Response Time Notice */}
          <motion.div variants={itemVariants} className={styles.responseNotice}>
            <div className={styles.noticeIcon}>
              <Icon icon="mdi:clock-check-outline" />
            </div>
            <div className={styles.noticeContent}>
              <Typography className={styles.noticeTitle}>
                What happens next?
              </Typography>
              <Typography
                className={styles.noticeDesc}
                sx={{ color: "#FFFFFFA6 !important" }}
              >
                Our team will reach out to discuss the best plan for you
              </Typography>
            </div>
          </motion.div>

          {/* Project Highlights */}
          <motion.div
            variants={itemVariants}
            className={styles.highlightsSection}
          >
            <Typography
              className={styles.sectionLabel}
              sx={{ color: "#FFFFFF80 !important" }}
            >
              Why Choose Us?
            </Typography>
            <div className={styles.highlightsGrid}>
              {projectHighlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  className={styles.highlightCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div
                    className={styles.highlightIcon}
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <Icon icon={item.icon} />
                  </div>
                  <span className={styles.highlightLabel}>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TODO: Replace with actual content */}
          {/* Contact Information Card */}
          <motion.div variants={itemVariants} className={styles.contactCard}>
            <div className={styles.contactHeader}>
              <div className={styles.companyBadge}>
                <Icon icon="mdi:shield-star" />
                <span>{contactInfo.designation}</span>
              </div>
              <Typography variant="h4" className={styles.companyName}>
                {contactInfo.companyName}
              </Typography>
            </div>

            <Grid container spacing={3} className={styles.contactGrid}>
              {/* Phone Numbers */}
              <Grid item xs={12} sm={6} md={4}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <Icon icon="mdi:phone" />
                  </div>
                  <div className={styles.contactDetails}>
                    <span
                      className={styles.contactLabel}
                      style={{ color: "#FFFFFF80" }}
                    >
                      Call Us
                    </span>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className={styles.contactValue}
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6} md={4}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <Icon icon="mdi:email" />
                  </div>
                  <div className={styles.contactDetails}>
                    <span
                      className={styles.contactLabel}
                      style={{ color: "#FFFFFF80" }}
                    >
                      Email Us
                    </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className={styles.contactValue}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </Grid>

              {/* Working Hours */}
              <Grid item xs={12} sm={6} md={4}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <Icon icon="mdi:clock-outline" />
                  </div>
                  <div className={styles.contactDetails}>
                    <span
                      className={styles.contactLabel}
                      style={{ color: "#FFFFFF80" }}
                    >
                      Working Hours
                    </span>
                    <span className={styles.contactValue}>
                      {contactInfo.workingHours}
                    </span>
                  </div>
                </div>
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <div className={`${styles.contactItem} ${styles.addressItem}`}>
                  <div className={styles.contactIconWrapper}>
                    <Icon icon="mdi:map-marker" />
                  </div>
                  <div className={styles.contactDetails}>
                    <span
                      className={styles.contactLabel}
                      style={{ color: "#FFFFFF80" }}
                    >
                      Visit Us
                    </span>
                    <span className={styles.contactValue}>
                      {contactInfo.address}
                    </span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className={styles.quickLinksSection}
          >
            <Typography
              className={styles.sectionLabel}
              sx={{ color: "#FFFFFF80 !important" }}
            >
              Explore More
            </Typography>
            <div className={styles.quickLinksGrid}>
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={styles.quickLinkCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon={link.icon} className={styles.quickLinkIcon} />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            variants={itemVariants}
            className={styles.backHomeWrapper}
          >
            <motion.a
              href="/"
              className={styles.backHomeBtn}
              style={{ color: "#FFFFFFB3" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon icon="mdi:arrow-left" />
              <span>Back to Home</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ThankYou;

/* ============================================
   CTASection Component
   "Your Dream Franchise is One Step Away"
   Dark indigo CTA with stats and franchise application buttons
   ============================================ */

import React from "react";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Button from "../../common/Button/Button";
import { useModal } from "../../../context/ModalContext";
import styles from "./CTASection.module.css";

const CTASection = () => {
  const { openLeadDrawer } = useModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleApplyNow = () => {
    openLeadDrawer("apply-now");
  };

  /* TODO: Replace with actual content */
  const stats = [
    { value: "10+", label: "Years", icon: "mdi:trophy-award" },
    { value: "50Cr", label: "Revenue", icon: "mdi:currency-inr" },
    { value: "25%", label: "Margin", icon: "mdi:percent-circle" },
    { value: "30%", label: "ROI", icon: "mdi:chart-line" },
  ];

  return (
    <section id="cta" className={styles.section}>
      {/* Background Overlay Image */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Headline */}
          <motion.div variants={itemVariants}>
            {/* TODO: Replace with actual content */}
            <Typography variant="h3" className={styles.title}>
              Join Our{" "}
              <span className={styles.highlight}>Success Story</span>
            </Typography>
          </motion.div>

          {/* Subtext */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              className={styles.description}
              sx={{ color: "#fff" }}
            >
              {/* TODO: Replace with actual content */}
              Lorem ipsum dolor sit amet. Partner with a proven business model.
              Complete support. Limited territories available.
            </Typography>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className={styles.statsRow}>
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                {index > 0 && <div className={styles.statDivider} />}
                <div className={styles.statItem}>
                  <Icon icon={stat.icon} className={styles.statIcon} />
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className={styles.ctaButtons}>
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            >
              <Button
                variant="primary"
                size="large"
                endIcon="mdi:arrow-right"
                onClick={handleApplyNow}
                className={styles.primaryBtn}
              >
                Get Started Now
              </Button>
            </motion.div>

            {/* TODO: Replace with actual content */}
            <Button
              variant="outline"
              size="large"
              startIcon="mdi:phone-outline"
              href="tel:+91XXXXXXXXXX"
              className={styles.secondaryBtn}
            >
              Call: +91-XXXXXXXXXX
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Corner Decorations */}
      <div className={styles.cornerDecoration1} />
      <div className={styles.cornerDecoration2} />
    </section>
  );
};

export default CTASection;

/* ============================================
   HighlightsSection Component - Results & Achievements
   Showcases GNRC Medishop Franchise performance and support ecosystem
   ============================================ */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import AnimatedCounter from "../../common/AnimatedCounter/AnimatedCounter";
import { useModal } from "../../../context/ModalContext";
import styles from "./HighlightsSection.module.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Results highlight data
const resultsData = [
  {
    id: 1,
    icon: "mdi:cart-outline",
    iconColor: "#FFD700",
    title: "Multi-Category Revenue",
    stat: null,
    statLabel:
      "Pharmacy + Grocery + Household Essentials = Multiple revenue streams from day one",
    subStats: null,
  },
  {
    id: 2,
    icon: "mdi:chart-line",
    iconColor: "#42A5F5",
    title: "Proven & Profitable",
    stat: null,
    statLabel:
      "9 company-owned stores, all consistently profitable. ₹80 Cr annual turnover proves the model.",
    subStats: null,
  },
  {
    id: 3,
    icon: "mdi:hospital-building",
    iconColor: "#66BB6A",
    title: "Hospital Network Advantage",
    stat: null,
    statLabel:
      "Built-in customer base through GNRC Hospital's 1.6M+ patient community across NE India",
    subStats: null,
  },
];

// Product categories data
const testTypes = [
  {
    icon: "mdi:pill",
    name: "Pharmacy & Healthcare",
    tag: null,
    description: "Medicines, OTC, Surgical",
  },
  {
    icon: "mdi:cart-outline",
    name: "Grocery & Household Essentials",
    tag: null,
    description: "Daily staples, branded products",
  },
  {
    icon: "mdi:spray-bottle",
    name: "Personal & Home Care",
    tag: null,
    description: "Toiletries, cleaning supplies",
  },
  {
    icon: "mdi:baby-carriage",
    name: "Baby & Child Care",
    tag: null,
    description: "Nutrition, diapers, toys",
  },
  {
    icon: "mdi:lipstick",
    name: "Beauty Products",
    tag: null,
    description: "Cosmetics, skincare",
  },
  {
    icon: "mdi:cup-water",
    name: "Beverages & Frozen Foods",
    tag: null,
    description: "Drinks, dairy, snacks",
  },
];

const HighlightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openLeadDrawer } = useModal();

  const handleScholarshipClick = () => {
    openLeadDrawer("get-details");
  };

  const handleBrochureClick = () => {
    openLeadDrawer("download-brochure");
  };

  return (
    <section className={styles.resultsSection} id="why-gnrc" ref={ref}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>WHY GNRC MEDISHOP</span>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                color: "#2D3561",
                marginTop: "0.75rem",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Why Partner With{" "}
              <span className={styles.highlightText}>GNRC?</span>
            </Typography>
            <div className={styles.titleUnderline}>
              <span className={styles.underlineBar} />
            </div>
            <Typography className={styles.sectionSubtitle}>
              A complete franchise ecosystem designed for your success
            </Typography>
          </motion.div>

          {/* Results Highlight Cards */}
          <motion.div variants={itemVariants} className={styles.resultsGrid}>
            {resultsData.map((card, index) => (
              <motion.div
                key={card.id}
                className={styles.resultCard}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: 0.2 + index * 0.15 }}
              >
                <div className={styles.resultCardIcon}>
                  <Icon icon={card.icon} style={{ color: card.iconColor }} />
                </div>
                <Typography className={styles.resultCardTitle}>
                  {card.title}
                </Typography>
                {card.stat !== null && (
                  <div className={styles.resultStatWrapper}>
                    <AnimatedCounter
                      value={card.stat}
                      suffix={card.statSuffix}
                      duration={2}
                      delay={0.3 + index * 0.15}
                      variant="large"
                      color="dark"
                    />
                  </div>
                )}
                <Typography className={styles.resultStatLabel}>
                  {card.statLabel}
                </Typography>
                {card.subStats && (
                  <div className={styles.subStatsRow}>
                    <Typography className={styles.subStatText}>
                      {card.subStats}
                    </Typography>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Test Types Section */}
          <motion.div variants={itemVariants} className={styles.testTypesBlock}>
            <Typography
              variant="h3"
              className={styles.testTypesTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: "#2D3561",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Product Categories
            </Typography>
            <div className={styles.testTypesGrid}>
              {testTypes.map((test, index) => (
                <motion.div
                  key={test.name}
                  className={styles.testTypeCard}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.4 + index * 0.08 }}
                >
                  <div className={styles.testTypeIcon}>
                    <Icon icon={test.icon} />
                  </div>
                  <div className={styles.testTypeInfo}>
                    <div className={styles.testTypeNameRow}>
                      <Typography className={styles.testTypeName}>
                        {test.name}
                      </Typography>
                      {test.tag && (
                        <span className={styles.testTypeTag}>{test.tag}</span>
                      )}
                    </div>
                    <Typography className={styles.testTypeDesc}>
                      {test.description}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Franchise CTA Banner */}
          <motion.div
            variants={itemVariants}
            className={styles.scholarshipBanner}
          >
            <div className={styles.scholarshipContent}>
              <div className={styles.scholarshipIconWrap}>
                <Icon icon="mdi:store" />
              </div>
              <div className={styles.scholarshipTextBlock}>
                <Typography
                  className={styles.scholarshipHeading}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  20-22% Gross Margin | 30% Expected ROI
                </Typography>
                <Typography
                  className={styles.scholarshipDesc}
                  sx={{ color: "#fff" }}
                >
                  With unified online-offline pricing, high-margin GNRC-branded
                  staples, and zero-waste inventory management, every franchise
                  partner can expect healthy, predictable returns.
                </Typography>
              </div>
              <motion.button
                className={styles.scholarshipCta}
                onClick={handleScholarshipClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Get Detailed P&L Projection →</span>
                <Icon icon="mdi:arrow-right" />
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className={styles.bottomCta}>
            <Typography className={styles.bottomCtaText}>
              1,200+ Brand Partnerships — Access India's most trusted brands
              through our established distribution network
            </Typography>
            <motion.button
              className={styles.brochureBtn}
              onClick={handleBrochureClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon icon="mdi:download" />
              <span>Download Brochure</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HighlightsSection;

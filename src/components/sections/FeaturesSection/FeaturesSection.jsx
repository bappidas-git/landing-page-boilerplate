/* ============================================
   FeaturesSection Component - Benefits of Joining
   Tabbed benefits showcase with franchise highlights and CTA
   ============================================ */

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container, Typography, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useModal } from "../../../context/ModalContext";
import { featuresData } from "../../../data/featuresData";
import styles from "./FeaturesSection.module.css";

// Category icons (replacing Lottie animations)
const categoryIcons = {
  1: "mdi:school",
  2: "mdi:hand-heart",
  3: "mdi:rocket-launch",
};

// Accent icons for decorative display (replacing Lottie)
const categoryAccentIcons = {
  1: "mdi:calculator-variant",
  2: "mdi:shield-check",
  3: "mdi:tree",
};

// Course highlights strip items
const courseHighlights = [
  { icon: "mdi:map-marker-check", label: "Location Support" },
  { icon: "mdi:store-check", label: "Turnkey Setup" },
  { icon: "mdi:account-group", label: "Staff Training" },
  { icon: "mdi:cog-sync", label: "Technology Platform" },
  { icon: "mdi:package-variant-closed", label: "Automated Inventory" },
  { icon: "mdi:bullhorn", label: "Marketing Support" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTab, setActiveTab] = useState(featuresData[0]?.id ?? 1);
  const { openLeadDrawer } = useModal();

  const handleApplyNow = () => {
    openLeadDrawer("apply-now");
  };

  const activeCategory = featuresData.find((c) => c.id === activeTab) || featuresData[0];

  return (
    <section className={styles.benefitsSection} id="support" ref={ref}>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                color: "#2D3561",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Complete Business{" "}
              <span className={styles.accentText}>Ecosystem</span>
            </Typography>
            <Typography
              className={styles.sectionSubtitle}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: { xs: "0.875rem", md: "1.05rem" },
                color: "#546E7A",
                textAlign: "center",
                marginTop: "0.75rem",
              }}
            >
              Lorem ipsum dolor sit amet — we build your success from day one
            </Typography>
          </motion.div>

          {/* Category Tabs - Desktop */}
          <motion.div variants={itemVariants} className={styles.categoryTabs}>
            {featuresData.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryTab} ${
                  activeTab === category.id ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <Icon
                  icon={categoryIcons[category.id]}
                  className={styles.tabIcon}
                />
                <span className={styles.tabLabel}>{category.category}</span>
                {activeTab === category.id && (
                  <motion.div
                    className={styles.tabIndicator}
                    layoutId="tabIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Benefits Grid - Desktop (tabbed) */}
          <div className={styles.desktopGrid}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className={styles.benefitsGrid}
              >
                {/* Decorative accent icon */}
                <div className={styles.lottieAccent}>
                  <Icon
                    icon={categoryAccentIcons[activeTab]}
                    className={styles.lottiePlayer}
                    style={{ width: '100%', height: '100%', color: '#2EC4B6' }}
                  />
                </div>

                {activeCategory.items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className={styles.benefitCard}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className={styles.benefitIconWrapper}>
                      <Icon icon={item.icon} className={styles.benefitIcon} />
                    </div>
                    <div className={styles.benefitContent}>
                      <h4 className={styles.benefitTitle}>{item.title}</h4>
                      <p className={styles.benefitDescription}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Benefits Grid - Mobile (all categories stacked) */}
          <div className={styles.mobileStack}>
            {featuresData.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={styles.mobileCategory}
              >
                <div className={styles.mobileCategoryHeader}>
                  <div className={styles.mobileCategoryLottie}>
                    <Icon
                      icon={categoryAccentIcons[category.id]}
                      style={{ width: '100%', height: '100%', color: '#2EC4B6' }}
                    />
                  </div>
                  <h3 className={styles.mobileCategoryTitle}>
                    {category.category}
                  </h3>
                </div>
                <div className={styles.mobileBenefitsGrid}>
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className={styles.benefitCard}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className={styles.benefitIconWrapper}>
                        <Icon
                          icon={item.icon}
                          className={styles.benefitIcon}
                        />
                      </div>
                      <div className={styles.benefitContent}>
                        <h4 className={styles.benefitTitle}>{item.title}</h4>
                        <p className={styles.benefitDescription}>
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Course Highlights Strip */}
          <motion.div variants={itemVariants} className={styles.highlightsStrip}>
            <div className={styles.highlightsTrack}>
              {courseHighlights.map((item, index) => (
                <div key={index} className={styles.highlightChip}>
                  <Icon icon={item.icon} className={styles.highlightIcon} />
                  <span className={styles.highlightLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className={styles.ctaWrapper}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: { xs: "1.1rem", md: "1.35rem" },
                color: "#2D3561",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Ready to get started?
            </Typography>
            <Button
              variant="contained"
              className={styles.ctaButton}
              onClick={handleApplyNow}
              endIcon={<Icon icon="mdi:arrow-right" />}
              sx={{
                background:
                  "linear-gradient(135deg, #2EC4B6 0%, #5DD9CE 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: { xs: "0.9rem", md: "1rem" },
                padding: { xs: "12px 28px", md: "14px 36px" },
                borderRadius: "50px",
                textTransform: "none",
                boxShadow: "0 8px 32px rgba(46, 196, 182, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5DD9CE 0%, #2EC4B6 100%)",
                  boxShadow: "0 12px 40px rgba(46, 196, 182, 0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Apply Now →
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturesSection;

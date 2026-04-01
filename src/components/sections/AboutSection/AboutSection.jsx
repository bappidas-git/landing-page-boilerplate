/* ============================================
   AboutSection Component - About GNRC Medishop
   Franchise legacy, stats, content grid & differentiators
   ============================================ */

import React from "react";
import { motion, useInView } from "framer-motion";
import {
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import AnimatedCounter from "../../common/AnimatedCounter/AnimatedCounter";
import styles from "./AboutSection.module.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

// Stats data
const keyStats = [
  {
    value: "20",
    suffix: "+",
    label: "Years of Profitable Business",
    icon: "mdi:trophy-award",
    color: "#2EC4B6",
  },
  {
    value: "80",
    suffix: "Cr",
    label: "Annual Turnover",
    icon: "mdi:currency-inr",
    color: "#2D3561",
  },
  {
    value: "50000",
    suffix: "+",
    label: "Products",
    icon: "mdi:package-variant-closed",
    color: "#2EC4B6",
  },
  {
    value: "16",
    suffix: "L+",
    label: "Customers Served",
    icon: "mdi:account-group",
    color: "#2D3561",
  },
  {
    value: "9",
    suffix: "",
    label: "Company-Owned Stores",
    icon: "mdi:store",
    color: "#2EC4B6",
  },
];

// Image grid data
const gridImages = [
  {
    src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop&q=80",
    alt: "GNRC Medishop Pharmacy Store",
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&q=80",
    alt: "GNRC Medishop Retail Shopping",
  },
  {
    src: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&h=300&fit=crop&q=80",
    alt: "GNRC Medishop Healthcare Products",
  },
];

// Key differentiators data
const differentiators = [
  {
    icon: "mdi:store-check",
    title: "Pharmacy + Grocery + Household Essentials",
    description: "Multi-category model under one roof",
  },
  {
    icon: "mdi:chart-line",
    title: "Profitable Since Day One",
    description: "Proven business model across 9 stores",
  },
  {
    icon: "mdi:tag-multiple",
    title: "1,200+ Brand Partners",
    description: "HUL, P&G, ITC, Nestlé, Amul, and more",
  },
  {
    icon: "mdi:account-star",
    title: "End-to-End Support",
    description: "Location, interior, training, technology, marketing",
  },
];

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleViewInvestment = () => {
    const investmentSection = document.getElementById("investment");
    if (investmentSection) {
      investmentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.overviewSection} id="about" ref={ref}>
      {/* Background Elements */}
      <div className={styles.bgGradient} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.mainWrapper}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <span className={styles.badge}>PROVEN SUCCESS</span>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
                color: "#2D3561",
                letterSpacing: "-0.01em",
              }}
            >
              About GNRC Medishop
            </Typography>
            <Typography
              variant="h3"
              className={styles.sectionSubtitle}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.2rem" },
                color: "#6b7280",
                marginTop: "0.5rem",
              }}
            >
              NE India's Most Trusted Essentials Retail Chain Since 2006
            </Typography>
          </motion.div>

          {/* Stats Counter Row */}
          <motion.div variants={itemVariants} className={styles.statsRow}>
            {keyStats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statItem}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon icon={stat.icon} style={{ color: stat.color }} />
                </div>
                <div className={styles.statValue}>
                  <AnimatedCounter
                    value={stat.value}
                    duration={1.5}
                    delay={0.2 + index * 0.1}
                  />
                  {stat.suffix && (
                    <span className={styles.statSuffix}>{stat.suffix}</span>
                  )}
                </div>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Content Grid (2 columns desktop, 1 column mobile) */}
          <div className={styles.contentGrid}>
            {/* Left Column - Text */}
            <motion.div variants={itemVariants} className={styles.textColumn}>
              <Typography className={styles.contentParagraph}>
                GNRC Medishop is one of the fastest-growing, multi-category
                essentials retail chains in North East India, offering Pharmacy,
                FMCG, Grocery, Personal Care, and high-margin GNRC-branded
                staples — all under one trusted roof. Built on the strong
                foundation of GNRC Group's credibility and the legacy of Dr.
                Nomal Chandra Borah, GNRC Medishop has been profitable since
                inception with ₹80 Crore annual turnover.
              </Typography>
              <Typography className={styles.contentParagraph}>
                With 9 consistently profitable company-owned stores across
                Guwahati, 30,000+ SKUs across 1,200+ trusted brands, and a
                dedicated team of 175+ professionals, GNRC Medishop is now
                expanding through a franchise model — offering aspiring
                entrepreneurs the opportunity to become Retailpreneurs.
              </Typography>
              <Button
                variant="contained"
                onClick={handleViewInvestment}
                className={styles.ctaButton}
                endIcon={<Icon icon="mdi:arrow-right" />}
                sx={{
                  background:
                    "linear-gradient(135deg, #2EC4B6 0%, #5DD9CE 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: { xs: "0.9375rem", md: "1rem" },
                  padding: { xs: "12px 28px", md: "14px 36px" },
                  borderRadius: "50px",
                  textTransform: "none",
                  boxShadow: "0 8px 30px rgba(46, 196, 182, 0.3)",
                  marginTop: "1.5rem",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5DD9CE 0%, #2EC4B6 100%)",
                    boxShadow: "0 12px 40px rgba(46, 196, 182, 0.45)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                View Investment Plans →
              </Button>
            </motion.div>

            {/* Right Column - Image Grid */}
            <motion.div variants={itemVariants} className={styles.imageColumn}>
              {gridImages.map((img, index) => (
                <motion.div
                  key={index}
                  className={styles.imageWrapper}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={styles.gridImage}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Key Differentiators Row */}
          <motion.div
            variants={itemVariants}
            className={styles.differentiatorsRow}
          >
            <Typography
              variant="h4"
              className={styles.differentiatorsTitle}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: "#2D3561",
                textAlign: "center",
                marginBottom: { xs: "1.5rem", md: "2rem" },
              }}
            >
              What Sets GNRC Medishop Apart
            </Typography>
            <div className={styles.differentiatorsGrid}>
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.differentiatorCard}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.differentiatorIcon}>
                    <Icon icon={item.icon} />
                  </div>
                  <h4 className={styles.differentiatorTitle}>{item.title}</h4>
                  <p className={styles.differentiatorDesc}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;

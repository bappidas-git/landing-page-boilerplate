/* ============================================
   AboutSection Component
   About section with stats, content grid & differentiators
   ============================================ */

import React from "react";
import { motion, useInView } from "framer-motion";
import {
  Container,
  Typography,
  Button,
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

// TODO: Replace with actual content
// Stats data
const keyStats = [
  {
    value: "10",
    suffix: "+",
    label: "Years of Experience",
    icon: "mdi:trophy-award",
    color: "#2EC4B6",
  },
  {
    value: "50",
    suffix: "Cr",
    label: "Annual Revenue",
    icon: "mdi:currency-inr",
    color: "#2D3561",
  },
  {
    value: "10000",
    suffix: "+",
    label: "Products",
    icon: "mdi:package-variant-closed",
    color: "#2EC4B6",
  },
  {
    value: "500",
    suffix: "K+",
    label: "Customers Served",
    icon: "mdi:account-group",
    color: "#2D3561",
  },
  {
    value: "15",
    suffix: "+",
    label: "Locations",
    icon: "mdi:store",
    color: "#2EC4B6",
  },
];

// Image grid data
const gridImages = [
  {
    src: "https://placehold.co/400x300/E8EDF2/2D3561?text=About+Image+1+400x300",
    alt: "Business location exterior",
  },
  {
    src: "https://placehold.co/400x300/E8EDF2/2D3561?text=About+Image+2+400x300",
    alt: "Customer shopping experience",
  },
  {
    src: "https://placehold.co/400x300/E8EDF2/2D3561?text=About+Image+3+400x300",
    alt: "Product showcase",
  },
];

// Key differentiators data
const differentiators = [
  {
    icon: "mdi:store-check",
    title: "Multi-Category Offering",
    description: "Lorem ipsum dolor sit amet, multiple product lines under one roof",
  },
  {
    icon: "mdi:chart-line",
    title: "Proven Business Model",
    description: "Lorem ipsum dolor sit amet, profitable across all locations",
  },
  {
    icon: "mdi:tag-multiple",
    title: "500+ Brand Partners",
    description: "Lorem ipsum dolor sit amet, access to leading consumer brands",
  },
  {
    icon: "mdi:account-star",
    title: "End-to-End Support",
    description: "Lorem ipsum dolor sit amet, complete setup and ongoing assistance",
  },
];

const AboutSection = () => {
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
            {/* TODO: Replace with actual content */}
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
              About Our Company
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
              A Trusted Name in the Industry Since 2014
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
              {/* TODO: Replace with actual content */}
              <Typography className={styles.contentParagraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Our company has been a
                trusted name in the industry for over a decade.
              </Typography>
              <Typography className={styles.contentParagraph}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. With multiple profitable
                locations, thousands of products, and a dedicated team, we are
                now expanding through partnerships.
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
                View Plans →
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
            {/* TODO: Replace with actual content */}
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
              What Sets Us Apart
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

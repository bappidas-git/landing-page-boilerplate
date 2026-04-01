/* ============================================
   CoursesSection Component - GNRC Medishop
   Showcases franchise plans with cards grid
   and comparison table
   ============================================ */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Container,
  Typography,
  Chip,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { coursesData } from "../../../data/coursesData";
import { useModal } from "../../../context/ModalContext";
import styles from "./ServicesSection.module.css";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Comparison data
const comparisonData = {
  headers: ["Component", "500 SQFT", "700 SQFT", "1000 SQFT"],
  rows: [
    {
      label: "Franchise Fee",
      values: ["₹2.95L", "₹2.95L", "₹2.95L"],
    },
    {
      label: "Interior (₹1,550/sqft)",
      values: ["₹7.75L", "₹10.85L", "₹15.50L"],
    },
    {
      label: "Stock (₹1,650/sqft)",
      values: ["₹8.25L", "₹11.55L", "₹16.50L"],
    },
    {
      label: "Software + License",
      values: ["₹1.12L", "₹1.12L", "₹1.12L"],
    },
    {
      label: "Security Deposit",
      values: ["₹2L", "₹2L", "₹2L"],
    },
    {
      label: "Grand Total",
      values: ["₹22.07L", "₹28.47L", "₹38.07L"],
      isBold: true,
    },
  ],
};

const ServicesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openLeadDrawer } = useModal();

  const handleGetCourseDetails = (courseName) => {
    openLeadDrawer("get-course-details", {
      subtitle: `Get details for ${courseName}`,
    });
  };

  const renderCourseCard = (course, index) => (
    <motion.div
      key={course.id}
      className={styles.courseCard}
      custom={index}
      variants={isMobile ? undefined : cardVariants}
      initial={isMobile ? undefined : "hidden"}
      animate={isMobile ? undefined : isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(45, 53, 97, 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Badge */}
      {course.badge && (
        <div
          className={`${styles.courseBadge} ${
            course.badge === "Premium" ? styles.premiumBadge : ""
          }`}
        >
          <Icon
            icon={
              course.badge === "Most Popular" ? "mdi:star" : "mdi:diamond-stone"
            }
          />
          <span>{course.badge}</span>
        </div>
      )}

      {/* Icon */}
      <div className={styles.courseIconWrapper}>
        <Icon icon={course.icon} className={styles.courseIcon} />
      </div>

      {/* Course Name */}
      <Typography className={styles.courseName}>{course.name}</Typography>

      {/* Target & Duration */}
      <div className={styles.courseMeta}>
        <div className={styles.metaItem}>
          <Icon icon="mdi:account-school" />
          <span>{course.target}</span>
        </div>
        <div className={styles.metaItem}>
          <Icon icon="mdi:clock-outline" />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* Description */}
      <Typography className={styles.courseDescription}>
        {course.description}
      </Typography>

      {/* Features */}
      <div className={styles.courseFeatures}>
        {course.features.map((feature, idx) => (
          <div key={idx} className={styles.courseFeatureItem}>
            <Icon icon="mdi:check-circle" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Frequency */}
      <div className={styles.courseFrequency}>
        <Icon icon="mdi:calendar-week" />
        <span>{course.frequency}</span>
      </div>

      {/* CTA Button */}
      <motion.button
        className={styles.courseCtaBtn}
        onClick={() => handleGetCourseDetails(course.name)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Get Plan Details</span>
        <Icon icon="mdi:arrow-right" />
      </motion.button>
    </motion.div>
  );

  return (
    <section className={styles.coursesSection} id="investment" ref={ref}>
      {/* Background */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className={styles.sectionHeader}>
            <Chip
              label="INVESTMENT PLANS"
              sx={{
                backgroundColor: "rgba(46, 196, 182, 0.12)",
                color: "#2EC4B6",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                height: "28px",
                borderRadius: "20px",
                border: "1px solid rgba(46, 196, 182, 0.3)",
              }}
            />
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
              Choose Your <span className={styles.accentText}>Store Size</span>
            </Typography>
            <Typography
              className={styles.sectionSubtitle}
              sx={{
                fontSize: { xs: "0.875rem", md: "1rem" },
                color: "#6B7280",
                textAlign: "center",
                marginTop: "0.5rem",
                maxWidth: "480px",
              }}
            >
              Transparent investment structure — every rupee carefully planned
            </Typography>
          </motion.div>

          {/* Course Cards */}
          <motion.div variants={itemVariants}>
            {isMobile ? (
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1.15}
                centeredSlides
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: true }}
                className={styles.swiperContainer}
              >
                {coursesData.map((course, index) => (
                  <SwiperSlide key={course.id}>
                    {renderCourseCard(course, index)}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.coursesGrid}>
                {coursesData.map((course, index) =>
                  renderCourseCard(course, index),
                )}
              </div>
            )}
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            variants={itemVariants}
            className={styles.comparisonSection}
          >
            <Typography className={styles.comparisonTitle}>
              <Icon icon="mdi:compare-horizontal" />
              Quick Comparison
            </Typography>
            <div className={styles.comparisonTableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    {comparisonData.headers.map((header, idx) => (
                      <th key={idx}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      style={row.isBold ? { fontWeight: 700 } : undefined}
                    >
                      <td
                        className={styles.comparisonLabel}
                        style={row.isBold ? { fontWeight: 700 } : undefined}
                      >
                        {row.label}
                      </td>
                      {row.values.map((value, valIdx) => (
                        <td
                          key={valIdx}
                          style={row.isBold ? { fontWeight: 700 } : undefined}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className={styles.bottomCta}>
            <div className={styles.ctaContent}>
              <Icon icon="mdi:headset" className={styles.ctaIcon} />
              <div className={styles.ctaText}>
                <span className={styles.ctaTitle}>
                  Not sure which store size is right for you?
                </span>
                <span className={styles.ctaSubtitle}>
                  Our franchise team will help you choose the best plan
                </span>
              </div>
            </div>
            <motion.button
              className={styles.ctaBtn}
              onClick={() => openLeadDrawer("request-callback")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Talk to Franchise Team →</span>
              <Icon icon="mdi:arrow-right" />
            </motion.button>
          </motion.div>

          {/* === Foundation Course CTA Banner === */}
          <motion.div
            className={styles.foundationBanner}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
                borderRadius: "16px",
                padding: { xs: "24px 20px", md: "32px 40px" },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: { xs: 2, md: 3 },
                border: "1px solid #FFE0B2",
                mt: 3,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}
              >
                <Box
                  component="img"
                  src="https://res.cloudinary.com/dn9gyaiik/image/upload/v1773728399/founder-gnrc_rwdp8x.jpg"
                  alt="Dr. Nomal Chandra Borah, Founder, GNRC Group"
                  sx={{
                    width: { xs: 56, md: 64 },
                    height: { xs: 56, md: 64 },
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "3px solid #2EC4B6",
                    boxShadow: "0 4px 12px rgba(46, 196, 182, 0.25)",
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1B2A4A",
                      fontSize: { xs: "1rem", md: "1.15rem" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    A Message from Our Founder
                  </Typography>
                  <Typography
                    sx={{
                      color: "#546E7A",
                      fontSize: { xs: "0.85rem", md: "0.9rem" },
                      mt: 0.5,
                    }}
                  >
                    Every family in Assam and the North East should have access
                    to trustworthy essentials at honest prices, close to their
                    home. — Dr. Nomal Chandra Borah, Founder, GNRC Group
                  </Typography>
                </Box>
              </Box>
              <Button
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    const headerOffset = 80;
                    const elementPosition =
                      aboutSection.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                sx={{
                  background: "linear-gradient(135deg, #2EC4B6, #5DD9CE)",
                  color: "#FFF",
                  fontWeight: 600,
                  borderRadius: "12px",
                  padding: { xs: "10px 24px", md: "12px 32px" },
                  textTransform: "none",
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 14px rgba(46, 196, 182, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1FA89B, #2EC4B6)",
                    boxShadow: "0 6px 20px rgba(46, 196, 182, 0.4)",
                  },
                }}
              >
                Learn More About Our Vision →
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ServicesSection;

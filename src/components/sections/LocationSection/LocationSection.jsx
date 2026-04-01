/* ============================================
   LocationSection Component
   Our Locations section showing business location info
   ============================================ */

import React from "react";
import { Container, Grid, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import Button from "../../common/Button/Button";
import { locationData } from "../../../data/locationData";
import styles from "./LocationSection.module.css";

const LocationSection = () => {
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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 40px rgba(45, 53, 97, 0.15)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleGetDirections = () => {
    // TODO: Replace with actual content
    window.open(
      "https://www.google.com/maps/search/Your+Business+Location",
      "_blank",
      "noopener,noreferrer",
    );
  };

  // TODO: Replace with actual content
  const connectivityHighlights = [
    {
      icon: "mdi:truck-delivery",
      title: "Own logistics network for reliable delivery",
      color: "#FF9800",
    },
    {
      icon: "mdi:warehouse",
      title: "Multiple warehouse locations for seamless supply chain",
      color: "#2196F3",
    },
    {
      icon: "mdi:earth",
      title: "Service territories available across the region",
      color: "#9C27B0",
    },
    {
      icon: "mdi:rocket-launch",
      title: "Rapid launch — 30-45 days from agreement",
      color: "#4CAF50",
    },
  ];

  return (
    <section id="stores" className={styles.section}>
      <Container maxWidth="xl">
        {/* Section Title */}
        {/* TODO: Replace with actual content */}
        <SectionTitle
          badge="LOCATIONS"
          title="Our"
          highlight="Locations"
          subtitle="Lorem ipsum dolor sit amet — expanding across the region"
          align="center"
          variant="light"
          badgeVariant="gold"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={4} className={styles.mainContent}>
            {/* Centre Info Card */}
            <Grid item xs={12} md={5}>
              <motion.div
                variants={itemVariants}
                className={styles.centreInfoCard}
              >
                <div className={styles.centreHeader}>
                  <div className={styles.centreIconWrapper}>
                    <Icon icon="mdi:school" />
                  </div>
                  <div>
                    <Typography variant="h5" className={styles.centreName}>
                      {locationData.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.centreAddress}
                    >
                      {locationData.address}
                    </Typography>
                  </div>
                </div>

                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Icon icon="mdi:phone" />
                    </div>
                    <div>
                      <Typography
                        variant="caption"
                        className={styles.contactLabel}
                      >
                        Phone
                      </Typography>
                      <Typography
                        variant="body2"
                        className={styles.contactValue}
                      >
                        {/* TODO: Replace with actual content */}
                        <a href={`tel:${locationData.phone}`}>{locationData.phoneDisplay}</a>
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Icon icon="mdi:email-outline" />
                    </div>
                    <div>
                      <Typography
                        variant="caption"
                        className={styles.contactLabel}
                      >
                        Email
                      </Typography>
                      <Typography
                        variant="body2"
                        className={styles.contactValue}
                      >
                        <a href={`mailto:${locationData.email}`}>
                          {locationData.email}
                        </a>
                      </Typography>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Grid>

            {/* Map Section */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants} className={styles.mapWrapper}>
                <div className={styles.mapContainer}>
                  <div className={styles.mapPlaceholder}>
                    <img
                      src="https://placehold.co/800x400/E8EDF2/2D3561?text=Map+Placeholder+800x400"
                      alt="Business Location Map"
                      className={styles.mapImage}
                    />
                    {/* TODO: Replace with actual content */}
                    <div className={styles.mapOverlay}>
                      <Icon
                        icon="mdi:map-marker"
                        className={styles.mapPinIcon}
                      />
                      <Typography variant="h6" className={styles.mapTitle}>
                        Your Business Name
                      </Typography>
                      <Typography variant="body2" className={styles.mapAddress}>
                        Your City, Your State
                      </Typography>
                      <Button
                        variant="primary"
                        size="small"
                        startIcon="mdi:map-marker"
                        onClick={handleGetDirections}
                        className={styles.mapButton}
                      >
                        View on Google Maps
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Areas Served Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.areasSection}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              className={styles.areasTitle}
              sx={{ marginBottom: "1.5rem" }}
            >
              {/* TODO: Replace with actual content */}
              Service Areas
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.areasGrid}>
            {locationData.nearbyAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
              >
                <Chip
                  label={area}
                  className={styles.areaPill}
                  icon={<Icon icon="mdi:map-marker" />}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Connectivity Highlights - 2x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.connectivitySection}
        >
          <Grid container spacing={3}>
            {connectivityHighlights.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className={styles.connectivityCard}
                >
                  <div
                    className={styles.connectivityIcon}
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <Icon icon={item.icon} />
                  </div>
                  <Typography
                    variant="body1"
                    className={styles.connectivityText}
                  >
                    {item.title}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Bottom CTA */}
        {/* TODO: Replace with actual content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.bottomCta}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              className={styles.ctaTitle}
              sx={{ color: "#fff", marginBottom: "2rem" }}
            >
              Want to open a location in your city?
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants} className={styles.ctaButtons}>
            <Button
              variant="primary"
              size="large"
              startIcon="mdi:directions"
              onClick={handleGetDirections}
            >
              Check Availability
            </Button>
            <Button
              variant="outline"
              size="large"
              startIcon="mdi:phone"
              href="tel:+91XXXXXXXXXX"
            >
              Call Us
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Background Decorations */}
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />
    </section>
  );
};

export default LocationSection;

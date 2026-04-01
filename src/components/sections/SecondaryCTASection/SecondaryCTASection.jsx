/* ============================================
   SecondaryCTASection Component
   CTA with inline lead form
   Placed before footer for prospective partners
   ============================================ */

import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  submitLeadToWebhook,
  isDuplicateLead,
  markLeadAsSubmitted,
} from "../../../utils/webhookSubmit";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  CircularProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { showSuccess, showError, showInfo } from "../../../utils/swalHelper";
import Button from "../../common/Button/Button";
import {
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
} from "../../../utils/validators";
import styles from "./SecondaryCTASection.module.css";

// TODO: Replace with actual content
const CLASS_OPTIONS = ["Service Type A", "Service Type B", "Service Type C", "Multi-Service"];
// TODO: Replace with actual content
const PROGRAMME_OPTIONS = [
  "Basic Plan",
  "Standard Plan",
  "Premium Plan",
];

const initialFormState = {
  name: "",
  mobile: "",
  email: "",
  current_class: "",
  interested_programme: "",
};

const initialErrorState = {
  name: "",
  mobile: "",
  email: "",
  current_class: "",
  interested_programme: "",
};

// TODO: Replace with actual content
const storeOpeningSteps = [
  { step: 1, title: "Initial Consultation", icon: "mdi:map-marker-check" },
  { step: 2, title: "Signing Agreement", icon: "mdi:file-sign" },
  { step: 3, title: "Location Finalization", icon: "mdi:home-city" },
  { step: 4, title: "Document Submission", icon: "mdi:file-document-check" },
  { step: 5, title: "Partnership Agreement", icon: "mdi:handshake" },
  { step: 6, title: "Design & Planning", icon: "mdi:floor-plan" },
  { step: 7, title: "Setup Begins", icon: "mdi:hammer-wrench" },
  { step: 8, title: "Operations Planning", icon: "mdi:cog-sync" },
  { step: 9, title: "Final Preparations", icon: "mdi:cash-check" },
  { step: 10, title: "Grand Launch!", icon: "mdi:party-popper" },
];

// TODO: Replace with actual content
const highlights = [
  { text: "10+ Years Legacy", icon: "mdi:trophy-award" },
  { text: "Strong Revenue", icon: "mdi:currency-inr" },
  { text: "15+ Locations", icon: "mdi:store" },
  { text: "500+ Partners", icon: "mdi:tag-multiple" },
];

// TODO: Replace with actual content
const whyStartEarly = [
  "10+ years of brand trust and credibility",
  "Complete turnkey setup in 30-45 days",
  "Centralized supply chain with multiple warehouses",
  "Technology-driven operations platform",
];

const SecondaryCTASection = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };



  const handleChange = useCallback(
    (field) => (event) => {
      let value = event.target.value;
      if (field === "mobile") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      let errorMessage = "";
      switch (field) {
        case "name":
          errorMessage = getNameErrorMessage(formData.name);
          break;
        case "mobile":
          errorMessage = getMobileErrorMessage(formData.mobile);
          break;
        case "email":
          errorMessage = getEmailErrorMessage(formData.email);
          break;
        case "current_class":
          if (!formData.current_class)
            errorMessage = "Please select a service type";
          break;
        case "interested_programme":
          if (!formData.interested_programme)
            errorMessage = "Please select a programme";
          break;
        default:
          break;
      }
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    },
    [formData],
  );

  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      current_class: !formData.current_class ? "Please select a service type" : "",
      interested_programme: !formData.interested_programme
        ? "Please select a programme"
        : "",
    };
    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      current_class: true,
      interested_programme: true,
    });
    return Object.values(newErrors).every((error) => !error);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Guard against double-click

    if (!validateForm()) {
      if (errors.name || !formData.name) nameRef.current?.focus();
      else if (errors.mobile || !formData.mobile) mobileRef.current?.focus();
      else if (errors.email || !formData.email) emailRef.current?.focus();
      return;
    }

    // Check for duplicate
    if (isDuplicateLead(formData.mobile)) {
      await showInfo(
        "Already Registered!",
        "This mobile number has already been registered. Our representative will contact you soon.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        current_class: formData.current_class || "",
        interested_programme: formData.interested_programme || "",
        source: "foundation-course",
      };

      const result = await submitLeadToWebhook(leadData);

      if (result.success) {
        markLeadAsSubmitted(formData.mobile);
        sessionStorage.setItem("lead_submitted", "true");
        sessionStorage.setItem("lead_name", formData.name);

        await showSuccess(
          "Enquiry Received!",
          "Our team will contact you soon.",
        );

        setFormData(initialFormState);
        setTouched({});
        setErrors(initialErrorState);

        navigate("/thank-you");
      } else {
        await showError("Oops!", result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      await showError(
        "Something went wrong",
        "Please try again or call us directly at +91-XXXXXXXXXX.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="vision" className={styles.section}>
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className={styles.badgeWrapper}>
            {/* TODO: Replace with actual content */}
            <span className={styles.badge}>🌟 The Vision Behind Our Business</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              className={styles.title}
              sx={{ color: "#fff" }}
            >
              From Vision to Every Home
            </Typography>
          </motion.div>

          {/* Founder Quote with Image */}
          <motion.div variants={itemVariants} className={styles.founderQuote}>
            {/* TODO: Replace with actual content */}
            <Box
              component="img"
              src="https://placehold.co/96x96/E8EDF2/2D3561?text=Founder+Photo"
              alt="Founder and CEO"
              className={styles.founderImage}
            />
            <Typography
              variant="body1"
              className={styles.subtitle}
              sx={{ color: "#fff" }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our mission has always been to make quality services accessible to every household, empowering local entrepreneurs to build sustainable businesses in their communities."
            </Typography>
            <Typography
              className={styles.founderName}
            >
              — Your Founder Name, CEO
            </Typography>
          </motion.div>

          {/* Key Highlights Row */}
          <motion.div variants={itemVariants} className={styles.highlightsRow}>
            {highlights.map((item) => (
              <div key={item.text} className={styles.highlightItem}>
                <Icon icon={item.icon} className={styles.highlightIcon} />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* 10-Step Store Opening Process */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                color: '#fff',
                fontWeight: 700,
                textAlign: 'center',
                fontFamily: "'Poppins', sans-serif",
                mb: 3,
                mt: 2,
              }}
            >
              10-Step Launch Process
            </Typography>
          </motion.div>
          <div className={styles.cardsGrid}>
            {storeOpeningSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className={styles.courseCard}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={styles.cardIcon}>
                  <Icon icon={step.icon} />
                </div>
                <h4 className={styles.cardTitle}>Step {step.step}</h4>
                <p className={styles.cardEligibility}>{step.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Form + Why Start Early layout */}
          <div className={styles.formSection}>
            {/* Inline Lead Form */}
            <motion.div variants={itemVariants} className={styles.formCard}>
              <div className={styles.formHeader}>
                <Icon icon="mdi:school" className={styles.formHeaderIcon} />
                <div>
                  <h4 className={styles.formTitle}>
                    Start Your Journey Today
                  </h4>
                  <p className={styles.formSubtitle}>
                    Fill in your details to get started
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                autoComplete="off"
              >
                {/* Applicant Name */}
                <TextField
                  inputRef={nameRef}
                  fullWidth
                  placeholder="Full Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  disabled={isSubmitting}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:account-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ "aria-label": "Full name", maxLength: 50 }}
                />

                {/* Mobile */}
                <TextField
                  inputRef={mobileRef}
                  fullWidth
                  placeholder="Mobile Number"
                  variant="outlined"
                  value={formData.mobile}
                  onChange={handleChange("mobile")}
                  onBlur={handleBlur("mobile")}
                  error={touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                  disabled={isSubmitting}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500, mr: 0.5 }}
                        >
                          +91
                        </Typography>
                        <span style={{ color: "#CCC", marginRight: 4 }}>-</span>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    "aria-label": "Mobile number",
                    maxLength: 10,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />

                {/* Email */}
                <TextField
                  inputRef={emailRef}
                  fullWidth
                  placeholder="Email Address"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  disabled={isSubmitting}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:email-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ "aria-label": "Email address" }}
                />

                {/* Current Class Dropdown */}
                <FormControl
                  fullWidth
                  error={touched.current_class && !!errors.current_class}
                  size="small"
                >
                  <Select
                    displayEmpty
                    value={formData.current_class}
                    onChange={handleChange("current_class")}
                    onBlur={handleBlur("current_class")}
                    disabled={isSubmitting}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:school-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    }
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ opacity: 0.5 }}>Service Type</span>
                        );
                      }
                      return selected;
                    }}
                    inputProps={{ "aria-label": "Store type" }}
                  >
                    {CLASS_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.current_class && errors.current_class && (
                    <FormHelperText>{errors.current_class}</FormHelperText>
                  )}
                </FormControl>

                {/* Interested Programme Dropdown */}
                <FormControl
                  fullWidth
                  error={
                    touched.interested_programme &&
                    !!errors.interested_programme
                  }
                  size="small"
                >
                  <Select
                    displayEmpty
                    value={formData.interested_programme}
                    onChange={handleChange("interested_programme")}
                    onBlur={handleBlur("interested_programme")}
                    disabled={isSubmitting}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon
                          icon="mdi:book-education-outline"
                          style={{ color: "#9E9E9E" }}
                        />
                      </InputAdornment>
                    }
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ opacity: 0.5 }}>
                            Franchise Plan
                          </span>
                        );
                      }
                      return selected;
                    }}
                    inputProps={{ "aria-label": "Franchise plan" }}
                  >
                    {PROGRAMME_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.interested_programme &&
                    errors.interested_programme && (
                      <FormHelperText>
                        {errors.interested_programme}
                      </FormHelperText>
                    )}
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CircularProgress size={20} color="inherit" />
                      <span>Submitting...</span>
                    </Box>
                  ) : (
                    <>
                      <Icon
                        icon="mdi:send"
                        style={{ marginRight: 8, fontSize: "1.1rem" }}
                      />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Why Start Early */}
            <motion.div variants={itemVariants} className={styles.whyEarlyCard}>
              <h4 className={styles.whyEarlyTitle}>
                <Icon icon="mdi:lightbulb-on" className={styles.whyEarlyIcon} />
                {/* TODO: Replace with actual content */}
                Why Our Business?
              </h4>
              <ul className={styles.whyEarlyList}>
                {whyStartEarly.map((point) => (
                  <li key={point} className={styles.whyEarlyItem}>
                    <Icon
                      icon="mdi:check-circle"
                      className={styles.checkIcon}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SecondaryCTASection;

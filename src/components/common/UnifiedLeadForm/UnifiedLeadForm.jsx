/* ============================================
   UnifiedLeadForm Component
   Single reusable lead capture form with:
   - Duplicate prevention
   - Trust badges
   - Consent text
   - Redirect to Thank You page
   - Customizable title, subtitle, and phone CTA
   ============================================ */

import React, { useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { submitLeadToWebhook, isDuplicateLead, markLeadAsSubmitted } from "../../../utils/webhookSubmit";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { showSuccess, showError, showInfo } from "../../../utils/swalHelper";
import Button from "../Button/Button";
import {
  getMobileErrorMessage,
  getEmailErrorMessage,
  getNameErrorMessage,
} from "../../../utils/validators";
import styles from "./UnifiedLeadForm.module.css";

// Local storage key for leads
const LEADS_STORAGE_KEY = "gnrc_franchise_submitted_leads";

// Investment interest options
const COURSE_OPTIONS = [
  "500 Sq.Ft. Store (~₹22L)",
  "700 Sq.Ft. Store (~₹28L)",
  "1000 Sq.Ft. Store (~₹38L)",
  "Not Sure — Need Guidance",
];

// Current occupation options
const CLASS_OPTIONS = [
  "Business Owner",
  "Salaried Professional",
  "Retired / Looking for New Venture",
  "First-Time Entrepreneur",
  "Investor / Partner",
];

// Initial form state
const initialFormState = {
  name: "",
  mobile: "",
  email: "",
  investment_interest: "",
  current_occupation: "",
};

// Initial error state
const initialErrorState = {
  name: "",
  mobile: "",
  email: "",
  investment_interest: "",
  current_occupation: "",
};

// Privacy Policy Content Component
const PrivacyPolicyContent = () => (
  <div style={{ padding: "0 8px" }}>
    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#2D3561",
        }}
      >
        Introduction
      </h3>
      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
        GNRC Medishop Pvt. Ltd. ("we," "our," or "us") respects your privacy
        and is committed to protecting your personal data. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information
        when you visit our website or engage with our franchise services.
      </p>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#2D3561",
        }}
      >
        Information We Collect
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        We may collect the following types of information:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and other contact details you provide when filling out inquiry
          forms or contacting us.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Business Preferences:</strong> Information about your
          investment preferences, occupation, and franchise requirements shared
          during consultations.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Usage Data:</strong> Information about how you interact with
          our website, including pages visited, time spent, and navigation
          patterns.
        </li>
        <li>
          <strong>Device Information:</strong> IP address, browser type,
          operating system, and device identifiers for analytics and security
          purposes.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#2D3561",
        }}
      >
        How We Use Your Information
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        We use the collected information for the following purposes:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          To respond to your inquiries and provide franchise information
        </li>
        <li style={{ marginBottom: "6px" }}>
          To schedule store visits and franchise consultations
        </li>
        <li style={{ marginBottom: "6px" }}>
          To send relevant franchise updates and promotional communications
          (with your consent)
        </li>
        <li style={{ marginBottom: "6px" }}>
          To improve our website and services based on user feedback
        </li>
        <li>
          To comply with legal obligations and protect our legitimate business
          interests
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#2D3561",
        }}
      >
        Information Sharing
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        We may share your information with:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          <strong>GNRC Medishop Pvt. Ltd.:</strong> We share inquiry details within our
          group for processing your franchise enquiry interests.
        </li>
        <li style={{ marginBottom: "6px" }}>
          <strong>Service Providers:</strong> Third-party vendors who assist us
          with website hosting, analytics, and communication services.
        </li>
        <li>
          <strong>Legal Requirements:</strong> When required by law, court
          order, or governmental regulations.
        </li>
      </ul>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginTop: "8px",
        }}
      >
        We do not sell your personal information to third parties.
      </p>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#2D3561",
        }}
      >
        Data Security
      </h3>
      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
        We implement appropriate technical and organizational measures to
        protect your personal information against unauthorized access,
        alteration, disclosure, or destruction. However, no method of
        transmission over the internet is 100% secure, and we cannot guarantee
        absolute security.
      </p>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#2D3561",
        }}
      >
        Your Rights
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginBottom: "8px",
        }}
      >
        You have the right to:
      </p>
      <ul
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          paddingLeft: "20px",
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "6px" }}>
          Access and request a copy of your personal data
        </li>
        <li style={{ marginBottom: "6px" }}>
          Correct any inaccurate or incomplete information
        </li>
        <li style={{ marginBottom: "6px" }}>
          Request deletion of your personal data (subject to legal obligations)
        </li>
        <li style={{ marginBottom: "6px" }}>
          Opt-out of marketing communications at any time
        </li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
    </section>

    <section style={{ marginBottom: "24px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#2D3561",
        }}
      >
        Contact Us
      </h3>
      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </p>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#374151",
          marginTop: "8px",
        }}
      >
        <strong>GNRC Medishop Pvt. Ltd.</strong>
        <br />
        Email: info@gnrcmedishop.com
        <br />
        Phone: +91-7086036887
      </p>
    </section>

    <p style={{ fontSize: "12px", color: "#6B7280", fontStyle: "italic" }}>
      Last Updated: January 2026
    </p>
  </div>
);

// Privacy Policy Modal Component
const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (typeof window === "undefined") return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "16px",
          }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #E5E7EB",
                backgroundColor: "#F9FAFB",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  margin: 0,
                  color: "#2D3561",
                }}
              >
                Privacy Policy
              </h2>
              <IconButton
                onClick={onClose}
                aria-label="Close modal"
                size="small"
                sx={{ color: "#6B7280" }}
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </div>
            <div
              style={{
                padding: "20px",
                overflowY: "auto",
                maxHeight: "calc(80vh - 60px)",
              }}
            >
              <PrivacyPolicyContent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const UnifiedLeadForm = ({
  variant = "default", // 'default', 'dark', 'hero', 'drawer'
  title = "Apply Now",
  subtitle = "Fill in your details and our franchise team will assist you",
  submitButtonText = "Submit Enquiry",
  showTitle = true,
  showSubtitle = true,
  showCourseFields = true,
  showTrustBadges = true,
  showConsent = true,
  showPhoneButton = false,
  onClose, // Called when drawer should close (for drawer variant)
  onSubmitSuccess,
  className = "",
  formId = "unified-lead-form",
}) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Refs for input focus management
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const courseRef = useRef(null);
  const classRef = useRef(null);

  // Check if lead already exists in localStorage
  const checkDuplicateLead = useCallback((email, mobile) => {
    try {
      const storedLeads = JSON.parse(
        localStorage.getItem(LEADS_STORAGE_KEY) || "[]"
      );
      return storedLeads.some(
        (lead) =>
          lead.email.toLowerCase() === email.toLowerCase() ||
          lead.mobile === mobile
      );
    } catch {
      return false;
    }
  }, []);

  // Save lead to localStorage
  const saveLeadToStorage = useCallback((leadData) => {
    try {
      const storedLeads = JSON.parse(
        localStorage.getItem(LEADS_STORAGE_KEY) || "[]"
      );
      storedLeads.push({
        email: leadData.email,
        mobile: leadData.mobile,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(storedLeads));
    } catch (error) {
      console.error("Error saving lead to storage:", error);
    }
  }, []);

  // Handle input change
  const handleChange = useCallback(
    (field) => (event) => {
      let value = event.target.value;

      // Special handling for mobile number - only allow digits
      if (field === "mobile") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [errors]
  );

  // Handle input blur - validate on blur
  const handleBlur = useCallback(
    (field) => () => {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));

      // Validate the field
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
        case "investment_interest":
          if (showCourseFields && !formData.investment_interest) {
            errorMessage = "Please select an investment plan";
          }
          break;
        case "current_occupation":
          if (showCourseFields && !formData.current_occupation) {
            errorMessage = "Please select your occupation";
          }
          break;
        default:
          break;
      }

      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage,
      }));
    },
    [formData, showCourseFields]
  );

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {
      name: getNameErrorMessage(formData.name),
      mobile: getMobileErrorMessage(formData.mobile),
      email: getEmailErrorMessage(formData.email),
      investment_interest:
        showCourseFields && !formData.investment_interest
          ? "Please select an investment plan"
          : "",
      current_occupation:
        showCourseFields && !formData.current_occupation
          ? "Please select your occupation"
          : "",
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      mobile: true,
      email: true,
      investment_interest: true,
      current_occupation: true,
    });

    return Object.values(newErrors).every((error) => !error);
  }, [formData, showCourseFields]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Focus first field with error
      if (errors.name || !formData.name) {
        nameRef.current?.focus();
      } else if (errors.mobile || !formData.mobile) {
        mobileRef.current?.focus();
      } else if (errors.email || !formData.email) {
        emailRef.current?.focus();
      }
      return;
    }

    // Check for duplicate — show alert ON TOP of drawer (don't close drawer)
    if (isDuplicateLead(formData.mobile)) {
      await showInfo(
        'Already Registered!',
        'This mobile number has already been registered. Our franchise team will contact you soon.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare lead data
      const leadData = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        investment_interest: formData.investment_interest || '',
        current_occupation: formData.current_occupation || '',
        source: formId || 'general',
      };

      // Submit to webhook (Pabbly or dummy)
      const result = await submitLeadToWebhook(leadData);

      if (result.success) {
        // Push lead form submission event to GTM dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'lead_form_submission',
          formSource: formId || 'general',
          investmentInterest: formData.investment_interest,
        });

        // Mark as submitted for duplicate prevention
        markLeadAsSubmitted(formData.mobile);

        // Also save to localStorage for local duplicate checking
        saveLeadToStorage(formData);

        // Set lead submitted flag for thank you page access
        sessionStorage.setItem("lead_submitted", "true");
        sessionStorage.setItem("lead_name", formData.name);

        // Show success alert ON TOP of drawer
        await showSuccess(
          'Franchise Enquiry Received! \uD83C\uDFEA',
          'Thank you for your interest in GNRC Medishop Franchise! Our business development team will contact you within 24 hours.'
        );

        // THEN reset form
        setFormData(initialFormState);
        setTouched({});
        setErrors(initialErrorState);

        // THEN close drawer (if in a drawer)
        if (onClose) {
          onClose();
        }

        // Callback for parent component
        if (onSubmitSuccess) {
          onSubmitSuccess(formData);
        }

        // THEN navigate to thank you page
        navigate('/thank-you');
      } else {
        await showError('Oops!', result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      await showError(
        'Something went wrong',
        'Please try again or call us directly at +91-7086036887.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.3 },
    }),
  };

  // Determine styles based on variant
  const getVariantClass = () => {
    switch (variant) {
      case "dark":
        return styles.variantDark;
      case "hero":
        return styles.variantHero;
      case "drawer":
        return styles.variantDrawer;
      default:
        return styles.variantDefault;
    }
  };

  return (
    <div
      className={`${styles.formContainer} ${getVariantClass()} ${className}`}
    >
      {/* Form Header */}
      {(showTitle || showSubtitle) && (
        <div className={styles.formHeader}>
          {showTitle && (
            <Typography variant="h5" className={styles.formTitle}>
              {title}
            </Typography>
          )}
          {showSubtitle && subtitle && (
            <Typography
              variant="body2"
              className={styles.formSubtitle}
              sx={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFFB3 !important" }
                  : undefined
              }
            >
              {subtitle}
            </Typography>
          )}
        </div>
      )}

      {/* Form */}
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        {/* Name Field */}
        <motion.div
          custom={0}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
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
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="mdi:account-outline"
                    className={styles.inputIcon}
                    style={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFF80" }
                        : undefined
                    }
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "aria-label": "Your name",
              maxLength: 50,
            }}
          />
        </motion.div>

        {/* Mobile Field */}
        <motion.div
          custom={1}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
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
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={styles.mobilePrefix}
                >
                  <Typography
                    variant="body2"
                    className={styles.countryCode}
                    sx={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFFCC !important" }
                        : undefined
                    }
                  >
                    +91
                  </Typography>
                  <span
                    className={styles.prefixDivider}
                    style={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFF4D" }
                        : undefined
                    }
                  >
                    -
                  </span>
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
        </motion.div>

        {/* Email Field */}
        <motion.div
          custom={2}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
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
            className={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="mdi:email-outline"
                    className={styles.inputIcon}
                    style={
                      variant === "dark" || variant === "drawer"
                        ? { color: "#FFFFFF80" }
                        : undefined
                    }
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "aria-label": "Email address",
            }}
          />
        </motion.div>

        {/* Course Interest Field */}
        {showCourseFields && (
          <motion.div
            custom={3}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <FormControl
              fullWidth
              error={touched.investment_interest && !!errors.investment_interest}
              className={styles.textField}
            >
              <Select
                ref={courseRef}
                displayEmpty
                value={formData.investment_interest}
                onChange={handleChange("investment_interest")}
                onBlur={handleBlur("investment_interest")}
                disabled={isSubmitting}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon
                      icon="mdi:store-outline"
                      className={styles.inputIcon}
                      style={
                        variant === "dark" || variant === "drawer"
                          ? { color: "#FFFFFF80" }
                          : undefined
                      }
                    />
                  </InputAdornment>
                }
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: variant === "dark" || variant === "drawer" ? "#FFFFFF80" : undefined, opacity: variant === "dark" || variant === "drawer" ? 1 : 0.5 }}>
                        Select Investment Plan
                      </span>
                    );
                  }
                  return selected;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { zIndex: 99999 },
                  },
                  disablePortal: false,
                  style: { zIndex: 99999 },
                }}
                inputProps={{
                  "aria-label": "Investment interest",
                }}
                sx={
                  variant === "dark" || variant === "drawer"
                    ? { color: "#FFFFFF", "& .MuiSelect-icon": { color: "#FFFFFF80" } }
                    : undefined
                }
              >
                {COURSE_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {touched.investment_interest && errors.investment_interest && (
                <FormHelperText>{errors.investment_interest}</FormHelperText>
              )}
            </FormControl>
          </motion.div>
        )}

        {/* Occupation Field */}
        {showCourseFields && (
          <motion.div
            custom={4}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <FormControl
              fullWidth
              error={touched.current_occupation && !!errors.current_occupation}
              className={styles.textField}
            >
              <Select
                ref={classRef}
                displayEmpty
                value={formData.current_occupation}
                onChange={handleChange("current_occupation")}
                onBlur={handleBlur("current_occupation")}
                disabled={isSubmitting}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon
                      icon="mdi:briefcase-outline"
                      className={styles.inputIcon}
                      style={
                        variant === "dark" || variant === "drawer"
                          ? { color: "#FFFFFF80" }
                          : undefined
                      }
                    />
                  </InputAdornment>
                }
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: variant === "dark" || variant === "drawer" ? "#FFFFFF80" : undefined, opacity: variant === "dark" || variant === "drawer" ? 1 : 0.5 }}>
                        Select Current Occupation
                      </span>
                    );
                  }
                  return selected;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { zIndex: 99999 },
                  },
                  disablePortal: false,
                  style: { zIndex: 99999 },
                }}
                inputProps={{
                  "aria-label": "Current occupation",
                }}
                sx={
                  variant === "dark" || variant === "drawer"
                    ? { color: "#FFFFFF", "& .MuiSelect-icon": { color: "#FFFFFF80" } }
                    : undefined
                }
              >
                {CLASS_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {touched.current_occupation && errors.current_occupation && (
                <FormHelperText>{errors.current_occupation}</FormHelperText>
              )}
            </FormControl>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          custom={showCourseFields ? 5 : 3}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className={styles.submitWrapper}
        >
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <Box className={styles.loadingState}>
                <CircularProgress size={20} color="inherit" />
                <span>Submitting...</span>
              </Box>
            ) : (
              <>
                <Icon icon="mdi:send" className={styles.submitIcon} />
                <span>{submitButtonText}</span>
              </>
            )}
          </Button>
        </motion.div>

        {/* Trust Badges */}
        {showTrustBadges && (
          <motion.div
            custom={showCourseFields ? 6 : 4}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className={styles.trustBadges}
          >
            <div
              className={styles.trustBadge}
              style={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99" }
                  : undefined
              }
            >
              <Icon icon="mdi:trophy-award" className={styles.trustIcon} />
              <span>20+ Years Legacy</span>
            </div>
            <div
              className={styles.trustBadge}
              style={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99" }
                  : undefined
              }
            >
              <Icon icon="mdi:currency-inr" className={styles.trustIcon} />
              <span>₹80 Cr Turnover</span>
            </div>
            <div
              className={styles.trustBadge}
              style={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99" }
                  : undefined
              }
            >
              <Icon icon="mdi:percent-circle" className={styles.trustIcon} />
              <span>20-22% Gross Margin</span>
            </div>
          </motion.div>
        )}

        {/* Consent Text */}
        {showConsent && (
          <motion.div
            custom={showCourseFields ? 7 : 5}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="caption"
              className={styles.consentText}
              sx={
                variant === "dark" || variant === "drawer"
                  ? { color: "#FFFFFF99 !important" }
                  : undefined
              }
            >
              By submitting this form, I agree to the{" "}
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className={styles.privacyLink}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Terms & Conditions and Privacy Policy
              </button>
              . By submitting this form, I agree to receive communication from GNRC Medishop regarding franchise opportunities.
            </Typography>
          </motion.div>
        )}
      </form>

      {/* Phone Button */}
      {showPhoneButton && (
        <div className={styles.phoneSection}>
          <Typography
            className={styles.orText}
            sx={{ color: "#FFFFFF80 !important" }}
          >
            Or call us directly
          </Typography>
          <a href="tel:+917086036887" className={styles.phoneLink}>
            <Icon icon="mdi:phone" />
            <span>+91-7086036887</span>
          </a>
        </div>
      )}

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
};

export default UnifiedLeadForm;

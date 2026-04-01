/* ============================================
   Footer Component
   Multi-column footer with links, contact info,
   social media, and legal modals
   ============================================ */

import React, { useState } from "react";
import { Container, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import styles from "./Footer.module.css";

// TODO: Replace with actual content
// Privacy Policy Content Component
const PrivacyPolicyContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>Introduction</h3>
      <p>
        Your Company Pvt. Ltd. ("we," "our," or "us") respects your privacy and
        is committed to protecting your personal data. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information
        when you visit our website or engage with our services.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Information We Collect</h3>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and other contact details you provide when filling out
          inquiry forms or contacting us.
        </li>
        <li>
          <strong>Business Preferences:</strong> Information about your
          investment preferences, location interests, and business requirements
          shared during consultations.
        </li>
        <li>
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

    <section className={styles.legalSection}>
      <h3>How We Use Your Information</h3>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>
          To respond to your inquiries and provide service details
        </li>
        <li>To schedule business consultations and visits</li>
        <li>
          To send relevant business updates and promotional communications (with
          your consent)
        </li>
        <li>To improve our website and services based on user feedback</li>
        <li>
          To comply with legal obligations and protect our legitimate business
          interests
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Data Security</h3>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal information against unauthorized access,
        alteration, disclosure, or destruction. However, no method of
        transmission over the internet is 100% secure, and we cannot guarantee
        absolute security.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Your Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Access and request a copy of your personal data</li>
        <li>Correct any inaccurate or incomplete information</li>
        <li>
          Request deletion of your personal data (subject to legal obligations)
        </li>
        <li>Opt-out of marketing communications at any time</li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact Us</h3>
      <p>
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </p>
      <p>
        <strong>Your Company Pvt. Ltd.</strong>
        <br />
        Email: info@yourbusiness.com
        <br />
        Phone: +91-XXXXXXXXXX
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: March 2026</p>
  </div>
);

// TODO: Replace with actual content
// Terms & Conditions Content Component
const TermsConditionsContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>Acceptance of Terms</h3>
      <p>
        By accessing and using this website, you accept and agree to be bound by
        these Terms and Conditions. If you do not agree to these terms, please
        do not use this website. Your Company Pvt. Ltd. reserves the right to
        modify these terms at any time without prior notice.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>About This Website</h3>
      <p>
        This website is operated by Your Company Pvt. Ltd. for the purpose of
        providing information about our services, investment plans,
        and offerings. All content is for general informational purposes only.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Information Disclaimer</h3>
      <p>
        The information provided on this website is for general informational
        purposes only:
      </p>
      <ul>
        <li>
          All service details, investment amounts, and offerings are subject
          to change without prior notice.
        </li>
        <li>
          Revenue projections and margins mentioned are based on existing
          performance and do not guarantee future outcomes.
        </li>
        <li>Images and representations are for illustrative purposes only.</li>
        <li>
          Availability of services is subject to real-time status.
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>User Responsibilities</h3>
      <p>By using this website, you agree to:</p>
      <ul>
        <li>
          Provide accurate and complete information when submitting inquiries
        </li>
        <li>
          Use the website only for lawful purposes and in compliance with
          applicable laws
        </li>
        <li>
          Not engage in any activity that could harm, disable, or impair the
          website
        </li>
        <li>
          Not attempt to gain unauthorized access to any part of the website or
          its systems
        </li>
      </ul>
    </section>

    <section className={styles.legalSection}>
      <h3>Intellectual Property</h3>
      <p>
        All content on this website, including but not limited to text,
        graphics, logos, images, and software, is the property of Your Company
        Pvt. Ltd. and is protected by intellectual property laws. You may not
        reproduce, distribute, or create derivative works without prior written
        consent.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Limitation of Liability</h3>
      <p>
        Your Company Pvt. Ltd. shall not be liable for any direct, indirect,
        incidental, consequential, or punitive damages arising from your use of
        this website or reliance on any information provided herein.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Governing Law</h3>
      <p>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of India. Any disputes arising from or related
        to these terms shall be subject to the exclusive jurisdiction of the
        courts in Your City, Your State.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact Information</h3>
      <p>
        For any questions regarding these Terms and Conditions, please contact
        us at:
      </p>
      <p>
        <strong>Your Company Pvt. Ltd.</strong>
        <br />
        Email: info@yourbusiness.com
        <br />
        Phone: +91-XXXXXXXXXX
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: March 2026</p>
  </div>
);

// TODO: Replace with actual content
// Disclaimer Content Component
const DisclaimerContent = () => (
  <div className={styles.legalContent}>
    <section className={styles.legalSection}>
      <h3>General Disclaimer</h3>
      <p>
        The information provided on this website is for general informational
        purposes only. While we strive to keep the information up to date and
        correct, we make no representations or warranties of any kind about the
        completeness, accuracy, reliability, suitability, or availability with
        respect to the website or the information, products, services, or
        related graphics contained on the website.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Earnings Disclaimer</h3>
      <p>
        Revenue projections and profit margins mentioned are based on existing
        performance data and are not indicative of guaranteed future
        outcomes. Individual results may vary based on location,
        market conditions, management, and other factors.
      </p>
    </section>

    <section className={styles.legalSection}>
      <h3>Contact</h3>
      <p>
        For any questions or concerns, please contact us at
        info@yourbusiness.com or call +91-XXXXXXXXXX.
      </p>
    </section>

    <p className={styles.lastUpdated}>Last Updated: March 2026</p>
  </div>
);

// Legal Modal Component
const LegalModal = ({ isOpen, onClose, title, children }) => {
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
          className={styles.modalBackdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={styles.legalModal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{title}</h2>
              <IconButton
                className={styles.modalCloseBtn}
                onClick={onClose}
                aria-label="Close modal"
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </div>
            <div className={styles.modalBody}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

// TODO: Replace with actual content
// Quick Links data
const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Services", href: "#investment" },
  { label: "Location", href: "#stores" },
  {
    label: "Website",
    href: "https://yourbusiness.com",
    external: true,
  },
];

// TODO: Replace with actual content
// Franchise links data
const franchiseLinks = [
  { label: "Basic Plan", href: "#investment" },
  { label: "Standard Plan", href: "#investment" },
  { label: "Premium Plan", href: "#investment" },
  { label: "Support & Training", href: "#support" },
  {
    label: "Our Website",
    href: "https://yourbusiness.com",
    external: true,
  },
];

// Social media links
const socialLinks = [
  { icon: "mdi:facebook", href: "#", label: "Facebook" },
  { icon: "mdi:instagram", href: "#", label: "Instagram" },
  { icon: "mdi:youtube", href: "#", label: "YouTube" },
  { icon: "mdi:twitter", href: "#", label: "Twitter" },
];

const Footer = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        {/* Main Footer Content */}
        <div className={styles.mainFooter}>
          <Container maxWidth="xl">
            <div className={styles.footerGrid}>
              {/* Column 1: Logo & Tagline */}
              {/* TODO: Replace with actual content */}
              <div className={styles.footerBrand}>
                <div className={styles.logoWrapper}>
                  <img
                    src="https://placehold.co/180x50/2D3561/FFFFFF?text=YOUR+LOGO"
                    alt="Your Business Name"
                    style={{
                      height: "36px",
                      width: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <p className={styles.tagline}>
                  Lorem ipsum dolor sit amet, building trusted services.
                </p>
                {/* Social Icons */}
                <div className={styles.socialIcons}>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                      aria-label={social.label}
                    >
                      <Icon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className={styles.footerColumn}>
                <h4 className={styles.columnTitle}>Quick Links</h4>
                <ul className={styles.footerLinks}>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={styles.footerLink}
                        {...(link.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Services */}
              <div className={styles.footerColumn}>
                <h4 className={styles.columnTitle}>Services</h4>
                <ul className={styles.footerLinks}>
                  {franchiseLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={styles.footerLink}
                        {...(link.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Contact */}
              {/* TODO: Replace with actual content */}
              <div className={styles.footerColumn}>
                <h4 className={styles.columnTitle}>Contact</h4>
                <ul className={styles.contactList}>
                  <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon icon="mdi:phone" className={styles.contactIcon} />
                      <span className={styles.contactLabel}>
                        {/* TODO: Replace with actual content */}
                        Support
                      </span>
                    </div>
                    <a href="tel:+91XXXXXXXXXX" className={styles.contactValue}>
                      XXXXXXXXXX
                    </a>
                  </li>
                  {/* <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon
                        icon="mdi:phone-in-talk"
                        className={styles.contactIcon}
                      />
                      <span className={styles.contactLabel}>Alternate</span>
                    </div>
                    <a href="tel:+91XXXXXXXXXX" className={styles.contactValue}>
                      XXXXXXXXXX
                    </a>
                  </li> */}
                  <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon icon="mdi:email" className={styles.contactIcon} />
                      <span className={styles.contactLabel}>Email</span>
                    </div>
                    <a
                      href="mailto:info@yourbusiness.com"
                      className={styles.contactValue}
                    >
                      info@yourbusiness.com
                    </a>
                  </li>
                  <li className={styles.contactItem}>
                    <div className={styles.contactLabelRow}>
                      <Icon
                        icon="mdi:map-marker"
                        className={styles.contactIcon}
                      />
                      <span className={styles.contactLabel}>Address</span>
                    </div>
                    <span className={styles.contactValue}>
                      {/* TODO: Replace with actual content */}
                      Your Company Pvt. Ltd.
                      <br />
                      Your City, Your State
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <Container maxWidth="xl">
            <div className={styles.bottomContent}>
              <p className={styles.copyright}>
                {/* TODO: Replace with actual content */}
                &copy; 2025 Your Company Pvt. Ltd. All Rights Reserved.
              </p>
              <div className={styles.legalLinks}>
                <button
                  className={styles.legalLink}
                  onClick={() => setTermsModalOpen(true)}
                >
                  Terms & Conditions
                </button>
                <span className={styles.linkDivider}>|</span>
                <button
                  className={styles.legalLink}
                  onClick={() => setPrivacyModalOpen(true)}
                >
                  Privacy Policy
                </button>
                <span className={styles.linkDivider}>|</span>
                <button
                  className={styles.legalLink}
                  onClick={() => setDisclaimerModalOpen(true)}
                >
                  Disclaimer
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Developer Credit Bar */}
        <div className={styles.developerBar}>
          <Container maxWidth="xl">
            <p className={styles.developerText}>
              {/* TODO: Replace with actual content */}
              Designed and Developed by{" "}
              <a
                href="https://yourdeveloper.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.developerLink}
              >
                Your Developer
              </a>
            </p>
          </Container>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms & Conditions"
      >
        <TermsConditionsContent />
      </LegalModal>

      <LegalModal
        isOpen={disclaimerModalOpen}
        onClose={() => setDisclaimerModalOpen(false)}
        title="Disclaimer"
      >
        <DisclaimerContent />
      </LegalModal>
    </>
  );
};

export default Footer;

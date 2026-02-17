import React from "react";
import styles from "./ContactUs.module.css";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className={styles.container}>
      
      {/* LEFT INFO SECTION */}
      <motion.div 
        className={styles.infoSection}
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have questions about StudyNotion? We’d love to hear from you.
        </p>

        <div className={styles.infoCard}>
          <h3>Email</h3>
          <p>support@studynotion.com</p>
        </div>

        <div className={styles.infoCard}>
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className={styles.infoCard}>
          <h3>Address</h3>
          <p>221B Learning Street, Tech City, India</p>
        </div>
      </motion.div>


      {/* RIGHT FORM SECTION */}
      <motion.div 
        className={styles.formSection}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.formTitle}>Send Message</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input type="text" required />
            <label>Name</label>
          </div>

          <div className={styles.inputGroup}>
            <input type="email" required />
            <label>Email</label>
          </div>

          <div className={styles.inputGroup}>
            <input type="text" required />
            <label>Subject</label>
          </div>

          <div className={styles.inputGroup}>
            <textarea rows="4" required></textarea>
            <label>Message</label>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.submitBtn}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;

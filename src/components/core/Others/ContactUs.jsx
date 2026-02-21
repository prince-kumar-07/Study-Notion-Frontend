import { useState } from "react";
import styles from "./ContactUs.module.css";
import { motion } from "framer-motion";
import {createContact} from "../../../services/Oprations/Contact"
import { useSelector, useDispatch } from "react-redux";

const Contact = () => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault()

    
    createContact(dispatch, formData)

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Name</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <label>Subject</label>
          </div>

          <div className={styles.inputGroup}>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <label>Message</label>
          </div>

          <motion.button
            type="submit"
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
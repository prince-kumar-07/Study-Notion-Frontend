import React from "react";
import styles from "./AboutUs.module.css";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../../services/Oprations/Title/Title";


const About = () => {
        usePageTitle("About US");
     const navigate = useNavigate()
  return (
    <div className={styles.aboutContainer}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Empowering Learning With <span>StudyNotion</span>
          </h1>
          <p>
            We believe education should be accessible, engaging, and future-focused.
            StudyNotion helps learners build real skills that matter.
          </p>
          <button className={styles.primaryBtn}>
            Explore Courses
          </button>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className={styles.section}>
        <div className={styles.textBlock}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to create an ecosystem where students can
            master in-demand skills in Web Development, AI, and Data Science
            through practical learning.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>🚀 Innovation</h3>
            <p>We constantly evolve our courses to match industry standards.</p>
          </div>

          <div className={styles.card}>
            <h3>📚 Practical Learning</h3>
            <p>Hands-on projects and real-world applications.</p>
          </div>

          <div className={styles.card}>
            <h3>🌍 Community</h3>
            <p>A collaborative space for learners to grow together.</p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className={styles.teamSection}>
        <h2>Meet Our Team</h2>

        <div className={styles.teamGrid}>
          <div className={styles.teamCard}>
            <img
              src="https://i.pravatar.cc/300?img=12"
              alt="team"
            />
            <h4>Rahul Sharma</h4>
            <p>Founder & Full Stack Developer</p>
          </div>

          <div className={styles.teamCard}>
            <img
              src="https://i.pravatar.cc/300?img=32"
              alt="team"
            />
            <h4>Priya Singh</h4>
            <p>AI Specialist</p>
          </div>

          <div className={styles.teamCard}>
            <img
              src="https://i.pravatar.cc/300?img=45"
              alt="team"
            />
            <h4>Aman Verma</h4>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.cta}>
        <h2>Ready to Start Your Journey?</h2>
        <button className={styles.secondaryBtn}
         onClick={()=>(navigate("/signup"))}
        >
          Join StudyNotion Today
        </button>
      </section>
    </div>
  );
};

export default About;

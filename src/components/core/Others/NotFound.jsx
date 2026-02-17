import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Animated background glow */}
      <div className={styles.bgGlow}></div>

      <div className={styles.content}>
        <div className={styles.glitchWrapper}>
          <h1 className={styles.glitch} data-text="404">
            404
          </h1>
        </div>

        <h2 className={styles.title}>Page Not Found</h2>

        <p className={styles.description}>
          The page you're looking for doesn’t exist or the link has expired.
        </p>

        <div className={styles.buttons}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/")}
          >
            Go Home
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

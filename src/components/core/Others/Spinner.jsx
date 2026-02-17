import { useEffect, useState } from "react";
import styles from "./Spinner.module.css";
import { useSelector } from "react-redux";

function Spinner() {
  const { isLoading, loadingMessage } = useSelector(
    (state) => state.spinner
  );

  const fullText = loadingMessage ?? "Processing Request...";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 60);

      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 1200);

      return () => clearTimeout(reset);
    }
  }, [index, fullText, isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.glassCard}>
        <div className={styles.spinner}></div>

        <h1 className={styles.text}>
          {displayText}
          <span className={styles.cursor}>|</span>
        </h1>
      </div>
    </div>
  );
}

export default Spinner;

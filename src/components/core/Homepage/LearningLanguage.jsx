import CTAButton from "./CTAButton";
import styles from "./LearningLanguage.module.css";
import img1 from "../../../../assets/Images/Know_your_progress.png"
import img2 from "../../../../assets/Images/Compare_with_others.png"
import img3 from "../../../../assets/Images/Plan_your_lessons.png"

export default function LearningLanguage() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        Your swiss knife for <span>learning any language</span>
      </h2>

      <p className={styles.subtext}>
        Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </p>

      <div className={styles.ctaButtonContainer}>
        <CTAButton text="Learn More" link="/signup" active={true} />
      </div>

      <div className={styles.imagesContainer}>
        <div className={styles.imageWrapper}>
          <img src={img1} alt="Know your progress" className={styles.image} />
          <img src={img2} alt="Compare with others" className={styles.image} />
          <img src={img3} alt="Plan your lessons" className={styles.image} />
        </div>
      </div>
    </div>
  );
}

import styles from "./InstructorSection.module.css";
import block3Image from "../../../../assets/Images/Instructor.png";
import CTAButton from "./Ctabutton";

export default function InstructorSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT IMAGE */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageCard}>
            <img
              src={block3Image}
              alt="Instructor"
              className={styles.image}
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Become an <span>instructor</span>
          </h2>

          <p className={styles.text}>
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className={styles.buttonWrapper}>
            <CTAButton
              text="Start Teaching Today"
              link="/signup"
              active={true}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

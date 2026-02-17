import styles from "./Timeline.module.css";

import logo1 from "../../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../../assets/TimeLineLogo/Logo4.svg";
import timelineimg from "../../../../assets/Images/TimelineImage.png";

export default function Timeline() {
  const timelineItems = [
    {
      logo: logo1,
      title: "Leadership",
      content: "Fully committed to the success company",
    },
    {
      logo: logo2,
      title: "Responsibility",
      content: "Students will always be our top priority",
    },
    {
      logo: logo3,
      title: "Flexibility",
      content: "The ability to switch is an important skills",
    },
    {
      logo: logo4,
      title: "Solve the problem",
      content: "Code your way to a solution",
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.timelineContainer}>

        {/* LEFT SIDE */}
        <div className={styles.timelineLeft}>
          <div className={styles.timelineLine}></div>

          {timelineItems.map((item, index) => (
            <div className={styles.timelineItem} key={index}>
              <div className={styles.iconWrapper}>
                <img src={item.logo} alt="" className={styles.icon} />
              </div>

              <div className={styles.card}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.timelineRight}>
          <div className={styles.imageWrapper}>
            <img src={timelineimg} alt="" className={styles.image} />

            {/* GREEN STATS BAR */}
            <div className={styles.statsBar}>
              <div className={styles.stat}>
                <h2>10</h2>
                <p>YEARS EXPERIENCE</p>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.stat}>
                <h2>250</h2>
                <p>TYPES OF COURSES</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

import styles from "./Card.module.css";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";

function Card({ cardData }) {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.heading}>{cardData.heading}</h3>
        <p className={styles.description}>{cardData.description}</p>
      </div>

      <div className={styles.footer}>
        <span>
          <IoPeopleSharp 
          className={styles.playIcon} size={35} />
          {cardData.level}</span>
        <span>
          <MdOutlinePlayLesson className={styles.playIcon} size={35} />
          {cardData.lessionNumber} Lessons</span>
      </div>
    </div>
  );
}

export default Card;

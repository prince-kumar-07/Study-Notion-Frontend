import styles from "./OtherLearnerReview.module.css";
import { Star } from "lucide-react";

export default function OtherLearnerReview() {

  const reviews = [
    {
      name: "Alice Johnson",
      review:
        "This platform transformed my coding skills! The courses are well-structured and fantastic.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Bob Smith",
      review:
        "I loved the hands-on projects. They helped me understand better.",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Catherine Lee",
      review:
        "Great community and support. I felt motivated throughout.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "David Kim",
      review:
        "The variety of courses is impressive. Exactly what I needed.",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      name: "Eva Martinez",
      review:
        "Learning at my own pace is amazing. Very user-friendly platform.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  const duplicated = [...reviews, ...reviews];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Reviews from other learners</h2>

      <div className={styles.slider}>
        <div className={styles.track}>
          {duplicated.map((item, index) => (
            <div key={index} className={styles.card}>

              <div className={styles.user}>
                <img src={item.img} alt="" />
                <h3>{item.name}</h3>
              </div>

              <p>{item.review}</p>

              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < item.rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

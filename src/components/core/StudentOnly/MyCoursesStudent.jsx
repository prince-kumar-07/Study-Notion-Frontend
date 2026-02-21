import { useState, useEffect } from "react";
import styles from "./MyCoursesStudent.module.css";
import { MoreVertical, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tempCourses = [
  {
    id: 1,
    courseName: "Complete React Mastery",
    instructor: { firstName: "John", lastName: "Doe" },
    price: 2999,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
    studentEnrolled: [1, 2, 3, 4, 5],
    progress: 65,
  },
  {
    id: 2,
    courseName: "Advanced NodeJS Bootcamp",
    instructor: { firstName: "Sarah", lastName: "Smith" },
    price: 3499,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
    studentEnrolled: [1, 2],
    progress: 100,
  },
];

export default function MyCoursesStudent() {
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgGradient}></div>

      <div className={styles.header}>
        <h1>Enrolled Courses</h1>
      </div>

      <div className={styles.table}>
        {loading ? (
          <div className={styles.skeletonContainer}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonCard}></div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {tempCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className={styles.row}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.courseInfo}>
                  <img src={course.thumbnail} alt="" />
                  <div>
                    <h3>{course.courseName}</h3>
                    <p>
                      {course.instructor.firstName}{" "}
                      {course.instructor.lastName}
                    </p>

                    <div className={styles.studentBadge}>
                      <Users size={14} />
                      {course.studentEnrolled.length} Students
                    </div>
                  </div>
                </div>

                <span className={styles.price}>₹{course.price}</span>

                <div className={styles.progressWrapper}>
                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <small>{course.progress}%</small>
                </div>

                <div
                  className={styles.action}
                  onClick={() =>
                    setOpenMenu(openMenu === index ? null : index)
                  }
                >
                  <MoreVertical size={18} />
                  {openMenu === index && (
                    <motion.div
                      className={styles.dropdown}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <button>Mark Completed</button>
                      <button className={styles.remove}>Remove</button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

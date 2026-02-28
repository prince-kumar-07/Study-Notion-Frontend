import { useState, useEffect } from "react";
import styles from "./MyCoursesStudent.module.css";
import { MoreVertical, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEntrolledCourse } from "../../../services/Oprations/Course";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyCoursesStudent() {
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const user = useSelector((state) => state.profile?.user || null);
  const courses = useSelector((state) => state.course?.entrolledCourse || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      fetchEntrolledCourse(dispatch, user._id);
    }
  }, [dispatch, user]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
    // console.log(courses)
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
            {courses?.map((course, index) => (
              <motion.div
                key={course._id}
                className={styles.row}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  navigate(`/view-course/${course._id}`)
                }
              >
                <div className={styles.courseInfo}>
                  <img src={course.thumbnail} alt="course" />

                  <div>
                    <h3>{course.courseName}</h3>

                    <p>
                      {course.instructor?.firstName}{" "}
                      {course.instructor?.lastName}
                    </p>

                    <div className={styles.studentBadge}>
                      <Users size={14} />
                      {course.studentEnrolled?.length || 0} Students
                    </div>
                  </div>
                </div>

                <span className={styles.price}>₹{course.price}</span>

                <div className={styles.progressWrapper}>
                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: `0%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <small>0%</small>
                </div>

                <div
                  className={styles.action}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === index ? null : index);
                  }}
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
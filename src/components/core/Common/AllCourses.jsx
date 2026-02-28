import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styles from "./AllCourses.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllCourse, fetchCourseDeatils } from "../../../services/Oprations/Course"
import { useEffect } from "react";

const AllCourses = () => {
  const { allCourse } = useSelector((state) => state.course);
  const navigate = useNavigate()
  const dispatch = useDispatch()

   useEffect(() => {
        fetchAllCourse(dispatch)
    }, [ dispatch]);

    function handleOnCourseClick(courseId){
        fetchCourseDeatils(dispatch, courseId, navigate)
    }

  

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgGradient}></div>

      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Explore Our Courses</h1>
        <p>Upgrade your skills with premium learning experiences</p>
      </motion.div>

      {/* Course Grid */}
      <div className={styles.grid}>
        {allCourse?.map((course, index) => (
          <motion.div
            key={course._id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            onClick={() => handleOnCourseClick(course._id)}
          >
            <div className={styles.imageWrapper}>
              <img src={course.thumbnail} alt={course.courseName} />
            </div>

            <div className={styles.cardBody}>
              <h3>{course.courseName}</h3>

              <p className={styles.desc}>
                {course.courseDescription?.slice(0, 90)}...
              </p>

              <div className={styles.meta}>
                <div className={styles.instructor}>
                  👨‍🏫 {course.instructor?.firstName}{" "}
                  {course.instructor?.lastName}
                </div>

                <div className={styles.price}>
                  ₹ {course.price}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
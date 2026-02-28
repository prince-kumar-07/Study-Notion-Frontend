import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CategoryDeatils.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseDeatils } from "../../../services/Oprations/Course";
import { useNavigate, useParams } from "react-router-dom";
import { getSeletedCategoryData } from "../../../services/Oprations/Category";
import { formatINR } from "../../../services/Oprations/formatCurrency";

const CategoryDetails = () => {
  const { selectedCategory, diffrentCategory } = useSelector(
    (state) => state.category
  );

  const [openCategory, setOpenCategory] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  function hanldeGetCourseDetails(courseId) {
    fetchCourseDeatils(dispatch, courseId, navigate);
  }

  useEffect(() => {
    if (categoryId) {
      getSeletedCategoryData(dispatch, categoryId, navigate);
    }
  }, [categoryId, dispatch]);

  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>{selectedCategory?.name}</h1>
        <p>{selectedCategory?.description}</p>
      </motion.div>

      {/* Courses */}
      <div className={styles.section}>
        <h2>Courses in {selectedCategory?.name}</h2>

        {selectedCategory?.courses?.length > 0 ? (
          <div className={styles.grid}>
            {selectedCategory.courses.map((course, index) => (
              <motion.div
                key={course._id}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                onClick={() => hanldeGetCourseDetails(course._id)}
              >
                <div className={styles.imageWrapper}>
                  <img src={course.thumbnail} alt={course.courseName} />
                </div>

                <div className={styles.cardBody}>
                  <h3>{course.courseName}</h3>
                  <p>{course.courseDescription?.slice(0, 90)}...</p>
                  <span>₹ {formatINR(course.price)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No courses available.</div>
        )}
      </div>

      {/* Other Categories */}
      <div className={styles.section}>
        <h2>Explore Other Categories</h2>

        {diffrentCategory?.map((category) => (
          <div key={category._id} className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>

              <button
                className={styles.expandBtn}
                onClick={() => toggleCategory(category._id)}
              >
                {openCategory === category._id ? "Hide" : "Explore"}
              </button>
            </div>

            <AnimatePresence>
              {openCategory === category._id && (
                <motion.div
                  className={styles.expandSection}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {category.courses?.length > 0 ? (
                    <div className={styles.grid}>
                      {category.courses.map((course) => (
                        <div
                          key={course._id}
                          className={styles.card}
                          onClick={() =>
                            hanldeGetCourseDetails(course._id)
                          }
                        >
                          <div className={styles.imageWrapper}>
                            <img
                              src={course.thumbnail}
                              alt={course.courseName}
                            />
                          </div>

                          <div className={styles.cardBody}>
                            <h4>{course.courseName}</h4>
                            <p>
                              {course.courseDescription?.slice(0, 80)}...
                            </p>
                            <span>₹ {formatINR(course.price)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      No courses available in this category.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
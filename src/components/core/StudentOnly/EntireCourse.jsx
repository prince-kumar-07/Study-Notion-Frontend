import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./EntireCourse.module.css";

import { useSelector, useDispatch } from "react-redux";
import { VscBook, VscShield } from "react-icons/vsc";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {fetchCourseDeatils} from "../../../services/Oprations/Course"
import { fetchEntireCourses } from "../../../services/Oprations/Course";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart } from "../../../Reducer/Slices/CartSlice";
import { formatINR } from "../../../services/Oprations/formatCurrency";

export default function EntireCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const courses = useSelector((state) => state.course?.allCourse || []);
  const user = useSelector((state) => state.profile?.user || null);

  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

    const isCatalogPage = useMemo(() => {
    return location.pathname !== "/learn-more" && location.pathname !== "/dashboard/allcourses";
  }, [location.pathname]);

  const isOpenRoute = useMemo(() => {
    return location.pathname !== "/learn-more";
  }, [location.pathname]);

   useEffect(() => {
    if (isCatalogPage) {
      fetchEntireCourses(dispatch);
    }
  }, [dispatch]);

 
  useEffect(() => {
    if (!courses.length) {
      fetchEntireCourses(dispatch);
    }
  }, [dispatch, courses.length]);

  const handleAddToCart = useCallback(
    (e, course) => {
      e.stopPropagation();

      if (!user) {
        navigate("/login");
        return;
      }

      dispatch(
        addToCart({
          _id: course._id,
          courseName: course.courseName,
          price: course.price,
          thumbnail: course.thumbnail,
          instructor: `${course.instructor?.firstName || ""} ${
            course.instructor?.lastName || ""
          }`,
        })
      );
    },
    [dispatch, navigate, user]
  )

  const handleBuyNow = useCallback(
    (e) => {
      e.stopPropagation();

      if (!user) {
        navigate("/login");
        return;
      }

      if (!user && !courseId) {
        toast.error("user or course data not available");
        return;
      }

      const idArray = [courseId];

      buyCourse(idArray, user, navigate, dispatch);
    },
    [navigate, user],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <VscBook />
          All Available Courses
        </h1>

        {isOpenRoute && (
          <div className={styles.badge}>
            <VscShield />
            Student Only
          </div>
        )}
      </div>

      <div className={styles.courseList}>
        {courses.length === 0 && <div>No courses available</div>}

        {courses.map((course) => {
          const isExpanded = expandedCourse === course._id;

          return (
            <motion.div
              key={course._id}
              className={styles.courseCard}
              layout
            >
              <div
                className={styles.courseHeader}
                onClick={() =>
                  setExpandedCourse(isExpanded ? null : course._id)
                }
              >
                <div className={styles.courseLeft}>
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className={styles.thumbnail}
                  />

                  <div>
                    <h3 className={styles.courseTitle}>
                      {course.courseName}
                    </h3>

                    <div className={styles.courseStats}>
                      <span>
                        {course.studentEnrolled?.length || 0} Students
                      </span>

                      <span className={styles.dot}>•</span>

                      <span>
                        {course.instructor?.firstName || ""}{" "}
                        {course.instructor?.lastName || ""}
                      </span>
                    </div>

                    <div className={styles.expandText}>
                      {isExpanded ? "▲ Collapse" : "▼ Expand"}
                    </div>
                  </div>
                </div>

                <div className={styles.courseActions}>
                  <div className={styles.price}>
                    ₹ {formatINR(course.price)}
                  </div>

                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.cartBtn}
                      onClick={(e) => handleAddToCart(e, course)}
                    >
                      Add to Cart
                    </button>

                     <button
                      className={styles.buyBtn}
                      onClick={() => fetchCourseDeatils(dispatch, course._id, navigate)}
                    >
                      View More
                    </button>

                    {/* <button
                      className={styles.buyBtn}
                      onClick={() => handleBuyNow(course._id)}
                    >
                      Buy Now
                    </button> */}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className={styles.expanded}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className={styles.metaCard}>
                      <h4 className={styles.sectionTitle}>Course Info</h4>

                      <div className={styles.metaGrid}>
                        <div className={styles.metaItem}>
                          <span>Description</span>
                          <p>{course.courseDescription}</p>
                        </div>

                        <div className={styles.metaItem}>
                          <span>Category</span>
                          <p>{course.category?.name || "-"}</p>
                        </div>

                        <div className={styles.metaItem}>
                          <span>Tag</span>
                          <p>{course.tag || "-"}</p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.sectionWrapper}>
                      <h4 className={styles.sectionTitle}>Sections</h4>

                      <div className={styles.sectionContainer}>
                        {course.courseContents?.length > 0 ? (
                          course.courseContents.map((section) => {
                            const sectionOpen =
                              expandedSection === section._id;

                            return (
                              <div
                                key={section._id}
                                className={styles.sectionCard}
                              >
                                <div
                                  className={styles.sectionHeader}
                                  onClick={() =>
                                    setExpandedSection(
                                      sectionOpen ? null : section._id
                                    )
                                  }
                                >
                                  <span>📁 {section.sectionName}</span>
                                  <span>{sectionOpen ? "▲" : "▼"}</span>
                                </div>

                                <AnimatePresence>
                                  {sectionOpen && (
                                    <motion.div
                                      className={styles.subList}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                    >
                                      {section.subSection?.length > 0 ? (
                                        section.subSection.map((sub) => (
                                          <div
                                            key={sub._id}
                                            className={styles.subCard}
                                          >
                                            <span>▶ {sub.title}</span>
                                            <span
                                              className={styles.duration}
                                            >
                                              {sub.timeDuration}
                                            </span>
                                          </div>
                                        ))
                                      ) : (
                                        <div className={styles.empty}>
                                          No SubSections
                                        </div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })
                        ) : (
                          <div className={styles.empty}>
                            No Sections Available
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
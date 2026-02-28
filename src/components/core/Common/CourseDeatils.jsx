import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import styles from "./CourseDeatils.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCourseDeatils } from "../../../services/Oprations/Course";
import { addToCart } from "../../../Reducer/Slices/CartSlice";
import { formatINR } from "../../../services/Oprations/formatCurrency";
import { buyCourse } from "../../../services/Oprations/Payamnets";

const CourseDetails = () => {
  const { courseDetail } = useSelector((state) => state.course);
  const user = useSelector((state) => state.profile?.user || null);
  const [openSection, setOpenSection] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, -200]);
  const orbY = useTransform(scrollY, [0, 1000], [0, -300]);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  


  useEffect(() => {
    if (courseId && !courseDetail) {
      fetchCourseDeatils(dispatch, courseId, navigate);
    }
  }, [courseId, dispatch]);

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
    );

 
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  

  // if (!courseDetail) return null;

  
   function handleBuyCourses(){
     
      if(!user && !courseId){
        toast.error("user or course data not available")
       return
      }

      const idArray = [courseId];

      buyCourse(idArray, user, navigate, dispatch)
    }
  

  return (
    <div className={styles.wrapper}>
     
      <motion.div style={{ y: bgY }} className={styles.diagonalBg} />
      <motion.div style={{ y: orbY }} className={styles.orbOne} />
      <motion.div style={{ y: orbY }} className={styles.orbTwo} />
      <div className={styles.noise}></div>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          
          {/* LEFT */}
          <div className={styles.left}>
            <span className={styles.tag}>{courseDetail.tag}</span>
            <h1>{courseDetail.courseName}</h1>
            <p>{courseDetail.courseDescription}</p>

            <div className={styles.meta}>
              <span>{courseDetail.category?.name}</span>
            </div>

            <div className={styles.previewImageWrapper}>
              <img src={courseDetail.thumbnail} alt="thumbnail" />
            </div>
          </div>

          {/* PREMIUM CARD */}
          <div
            ref={cardRef}
            className={styles.purchaseCard}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.cardGlow}></div>

            <h3>₹ {formatINR(courseDetail.price)}</h3>

            <button
            onClick={() => handleBuyCourses()}
             className={styles.primaryBtn}>Buy Now</button>
            <button 
            className={styles.secondaryBtn}
            onClick={(e) => handleAddToCart(e, courseDetail)}
            >Add to Cart</button>

            <p>🔒 30-Day Money Back Guarantee</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className={styles.container}>
        <section className={styles.section}>
          <h2>What You Will Learn</h2>
          <div className={styles.learnGrid}>
            {courseDetail.whatYouWillLearn
              ?.split("\n")
              .filter(Boolean)
              .map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.learnCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  ✓ {item}
                </motion.div>
              ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Course Curriculum</h2>

          {courseDetail.courseContents?.map((section) => (
            <div key={section._id} className={styles.curriculumCard}>
              <div
                className={styles.curriculumHeader}
                onClick={() => toggleSection(section._id)}
              >
                <h3>{section.sectionName}</h3>
                <span>{openSection === section._id ? "−" : "+"}</span>
              </div>

              <AnimatePresence>
                {openSection === section._id && (
                  <motion.div
                    className={styles.curriculumBody}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {section.subSection?.map((sub) => (
                      <div key={sub._id} className={styles.subItem}>
                        <div>
                          <h4>{sub.title}</h4>
                          <p>{sub.description}</p>
                        </div>
                        <span>{sub.timeDuration}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CourseDetails;
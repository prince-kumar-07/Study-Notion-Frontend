import { useEffect, useState } from "react";
import styles from "./ViewCourse.module.css";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { fetchEntrolledCourseDeatils } from "../../../services/Oprations/Course";
import { useSelector, useDispatch } from "react-redux";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";

export default function ViewCourse() {

  const { courseId } = useParams();
  const dispatch = useDispatch();

  const course = useSelector(
    (state) => state.course?.entrolledCourseData || {}
  );

 const user = useSelector((state) => state.profile?.user || null);

  const [activeVideo, setActiveVideo] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetchEntrolledCourseDeatils(dispatch, courseId);
  }, []);

  /* set first lecture */

  useEffect(() => {
    if (course?.courseContents?.length) {
      const firstLecture = course.courseContents[0]?.subSection[0];
      setActiveVideo(firstLecture);
    }
  }, [course]);

  /* flatten lectures */

  const lectures =
    course?.courseContents?.flatMap((s) => s.subSection) || [];

  const markComplete = (lectureId) => {
    if (!completed.includes(lectureId)) {
      setCompleted([...completed, lectureId]);
    }

    /* auto play next lecture */

    const index = lectures.findIndex((l) => l._id === lectureId);
    const next = lectures[index + 1];

    if (next) {
      setTimeout(() => {
        setActiveVideo(next);
      }, 1200);
    }
  };

  const progress =
    lectures.length > 0
      ? Math.round((completed.length / lectures.length) * 100)
      : 0;

  if (!course) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>

      {/* SIDEBAR */}

      <div className={styles.sidebar}>

        <h3 className={styles.courseTitle}>{course.courseName}</h3>

        {/* Progress */}

        <div className={styles.progressBox}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <span>{progress}% completed</span>
        </div>

        {course?.courseContents?.map((section) => (
          <div key={section._id} className={styles.section}>

            <h4>{section.sectionName}</h4>

            {section.subSection.map((lecture) => (

              <motion.div
                key={lecture._id}
                className={`${styles.lecture} ${
                  activeVideo?._id === lecture._id ? styles.active : ""
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveVideo(lecture)}
              >

                {completed.includes(lecture._id) ? (
                  <CheckCircle size={18} color="#22c55e" />
                ) : (
                  <PlayCircle size={18} />
                )}

                <div className={styles.lectureText}>
                  <span>{lecture.title}</span>

                  <small>
                    <Clock size={12} /> {lecture.timeDuration}
                  </small>
                </div>

              </motion.div>
            ))}

          </div>
        ))}

      </div>

      {/* MAIN CONTENT */}

      <div className={styles.content}>

        {/* VIDEO PLAYER */}

        <div className={styles.videoContainer}>
          {activeVideo && (
            <video
              key={activeVideo._id}
              src={activeVideo.videoUrl}
              controls
              className={styles.video}
              onEnded={() => markComplete(activeVideo._id)}
            />
          )}
        </div>

        {/* COURSE DETAILS */}

        <div className={styles.details}>

          <h1>{course.courseName}</h1>

          <p>{course.courseDescription}</p>

          <div className={styles.meta}>
            <span>
              Instructor: {course?.instructor?.firstName}{" "}
              {course?.instructor?.lastName}
            </span>

            <span>Category: {course?.category?.name}</span>

            <span>Price: ₹{course?.price}</span>
          </div>

        </div>

        {/* WHAT YOU WILL LEARN */}

        <div className={styles.learnBox}>

          <h2>What you'll learn</h2>

          <div className={styles.learnGrid}>

            {course?.whatYouWillLearn
              ?.split("\n")
              .map((item, index) => (
                <div key={index} className={styles.learnItem}>
                  ✓ {item}
                </div>
              ))}

          </div>

        </div>

      </div>
    </div>
  );
}
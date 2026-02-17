import React, { useState, useMemo } from "react";
import styles from "./MyCourseInstructorOnly.module.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  VscEdit,
  VscTrash,
  VscSettingsGear,
  VscShield,
  VscBook,
} from "react-icons/vsc";

export default function MyCourseInstructorOnly() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Mastery",
      students: 120,
      revenue: 240000,
      status: "Published",
    },
    {
      id: 2,
      title: "Node.js Advanced",
      students: 95,
      revenue: 180000,
      status: "Draft",
    },
    {
      id: 3,
      title: "System Design Pro",
      students: 60,
      revenue: 150000,
      status: "Published",
    },
  ]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const totalRevenue = useMemo(
    () => courses.reduce((acc, c) => acc + c.revenue, 0),
    [courses]
  );

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
    setConfirmDelete(null);
  };

  const handleSaveEdit = () => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === editingCourse.id ? editingCourse : c
      )
    );
    setEditingCourse(null);
  };

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>
          <VscBook /> My Courses
        </h1>
        <span className={styles.badge}>
          <VscShield /> Instructor Only
        </span>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h4>Total Courses</h4>
          <p>{courses.length}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Total Revenue</h4>
          <p>₹{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* COURSE LIST */}
      <div className={styles.courseList}>
        {courses.map((course) => (
          <motion.div
            key={course.id}
            className={styles.courseCard}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <h3>{course.title}</h3>
              <p>{course.students} Students</p>
              <span
                className={
                  course.status === "Published"
                    ? styles.published
                    : styles.draft
                }
              >
                {course.status}
              </span>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => setEditingCourse(course)}
              >
                <VscEdit />
              </button>
              <button
                onClick={() => setConfirmDelete(course.id)}
              >
                <VscTrash />
              </button>
              <button>
                <VscSettingsGear />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingCourse && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2>Edit Course</h2>

              <input
                value={editingCourse.title}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    title: e.target.value,
                  })
                }
              />

              <select
                value={editingCourse.status}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    status: e.target.value,
                  })
                }
              >
                <option>Published</option>
                <option>Draft</option>
              </select>

              <div className={styles.modalActions}>
                <button onClick={() => setEditingCourse(null)}>
                  Cancel
                </button>
                <button onClick={handleSaveEdit}>
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRM */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3>Delete Course?</h3>
              <p>This action cannot be undone.</p>

              <div className={styles.modalActions}>
                <button onClick={() => setConfirmDelete(null)}>
                  Cancel
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(confirmDelete)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

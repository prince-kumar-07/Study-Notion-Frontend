import { useState, useMemo, useEffect } from "react";
import styles from "./MyCourseInstructorOnly.module.css";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  VscEdit,
  VscTrash,
  VscSettingsGear,
  VscShield,
  VscBook,
} from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchCreatedCourse,
  deleteCourse,
  updateEditedCourse,
} from "../../../services/Oprations/Course";

export default function MyCourseInstructorOnly() {
  const { allCategory } = useSelector((state) => state.category);
  const courses = useSelector((state) => state.course.allCourse);

  const [editingCourse, setEditingCourse] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCreatedCourse(dispatch);
  }, [dispatch]);

  const totalRevenue = useMemo(
    () => courses.reduce((acc, c) => acc + c.revenue, 0),
    [courses],
  );

  const handleDelete = (id) => {
    deleteCourse(dispatch, id);
    setConfirmDelete(null);
  };

  const handleSaveEdit = () => {
    console.log(editingCourse.category._id);

    const formData = new FormData();

    formData.append("courseId", editingCourse._id);
    formData.append("courseName", editingCourse.courseName);
    formData.append("courseDescription", editingCourse.courseDescription);
    formData.append("price", String(editingCourse.price));
    formData.append("tag", editingCourse.tag);
    formData.append("category", editingCourse.category._id);

    if (editingCourse.thumbnailFile) {
      formData.append("thumbnailImage", editingCourse.thumbnailFile);
    }

    updateEditedCourse(dispatch, formData);

    setEditingCourse(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>
          <VscBook /> My Courses
        </h1>
        <span className={styles.badge}>
          <VscShield /> Instructor Only
        </span>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h4>Total Courses</h4>
          <p>{courses.length}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Total Revenue</h4>
          <p>₹{totalRevenue ? totalRevenue.toLocaleString() : " 0"}</p>
        </div>
      </div>

      <div className={styles.courseList}>
        {courses.map((course) => {
          const isCourseExpanded = expandedCourse === course._id;

          return (
            <motion.div
              key={course._id}
              className={styles.courseCard}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.courseHeaderRow}>
                <div
                  className={styles.courseHeaderLeft}
                  onClick={() =>
                    setExpandedCourse(isCourseExpanded ? null : course._id)
                  }
                >
                  <h3>{course.courseName}</h3>

                  <p>{course.studentEnrolled?.length || 0} Students</p>

                  <span className={styles.expandBtn}>
                    {isCourseExpanded ? "▲ Collapse" : "▼ Expand"}
                  </span>
                </div>

                <div className={styles.actions}>
                  <span>₹ {course.price}</span>

                  <button onClick={() => setEditingCourse(course)}>
                    <VscEdit />
                  </button>

                  <button onClick={() => setConfirmDelete(course._id)}>
                    <VscTrash />
                  </button>

                  <button>
                    <VscSettingsGear />
                  </button>
                </div>
              </div>

              {isCourseExpanded && (
                <div className={styles.courseExpanded}>
                  <div className={styles.courseMeta}>
                    <p>
                      <strong>Description:</strong>
                      <span className={styles.spantext}>
                        {course.courseDescription}
                      </span>
                    </p>

                    <p>
                      <strong>Category:</strong>

                      <span className={styles.spantext}>
                        {" "}
                        {course.category?.name}
                      </span>
                    </p>

                    <p>
                      <strong>Tag:</strong>

                      <span className={styles.spantext}>{course.tag}</span>
                    </p>
                  </div>

                  <div className={styles.sectionContainer}>
                    {course.courseContents?.map((section) => {
                      const isSectionExpanded = expandedSection === section._id;

                      return (
                        <div key={section._id} className={styles.sectionCard}>
                          <div
                            className={styles.sectionHeader}
                            onClick={() =>
                              setExpandedSection(
                                isSectionExpanded ? null : section._id,
                              )
                            }
                          >
                            <span>📁 {section.sectionName}</span>

                            <span className={styles.expandBtn}>
                              {isSectionExpanded ? "▲" : "▼"}
                            </span>
                          </div>

                          {isSectionExpanded && (
                            <div className={styles.subSectionList}>
                              {section.subSection?.length > 0 ? (
                                section.subSection.map((sub) => (
                                  <div
                                    key={sub._id}
                                    className={styles.subSectionItem}
                                  >
                                    <div className={styles.subSectionInfo}>
                                      <div className={styles.subSectionTitle}>
                                        ▶ {sub.title}
                                      </div>

                                      <div className={styles.subSectionMeta}>
                                        <span>{sub.timeDuration}</span>
                                      </div>

                                      <div className={styles.subSectionDesc}>
                                        {sub.description}
                                      </div>
                                    </div>

                                    {sub.videoUrl && (
                                      <div className={styles.videoWrapper}>
                                        <video
                                          className={styles.videoPlayer}
                                          controls
                                        >
                                          <source
                                            src={sub.videoUrl}
                                            type="video/mp4"
                                          />
                                        </video>
                                      </div>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className={styles.empty}>
                                  No SubSections available
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

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
              <h2 className={styles.modalTitle}>Edit Course</h2>

              <div className={styles.formGroup}>
                <label>Course Name</label>
                <input
                  type="text"
                  value={editingCourse?.courseName || ""}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      courseName: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Price (₹)</label>
                <input
                  type="number"
                  value={editingCourse?.price || ""}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      price:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tag</label>
                <input
                  type="text"
                  value={editingCourse?.tag || ""}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      tag: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  rows="4"
                  value={editingCourse?.courseDescription || ""}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      courseDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={editingCourse?.category || ""}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>
                  {allCategory?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Thumbnail</label>

                {editingCourse?.thumbnail && (
                  <img
                    src={editingCourse.thumbnail}
                    alt="thumbnail"
                    className={styles.thumbnailPreview}
                  />
                )}

                <label className={styles.uploadBtn}>
                  Change Thumbnail
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setEditingCourse({
                          ...editingCourse,
                          thumbnailFile: file,
                          thumbnail: URL.createObjectURL(file),
                        });
                      }
                    }}
                  />
                </label>
              </div>

              <div className={styles.modalActions}>
                <button onClick={() => setEditingCourse(null)}>Cancel</button>

                <button
                  onClick={() => handleSaveEdit()}
                  className={styles.saveBtn}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete !== null && (
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
                <button onClick={() => setConfirmDelete(null)}>Cancel</button>
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

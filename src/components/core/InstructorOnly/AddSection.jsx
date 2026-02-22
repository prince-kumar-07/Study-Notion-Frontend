import React, { useEffect, useState } from "react";
import styles from "./AddSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreatedCourse,
  addSection,
  updateSection,
  deleteSection,
} from "../../../services/Oprations/Course";
import { VscAdd, VscEdit, VscShield } from "react-icons/vsc";

export default function AddSection() {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course.allCourse || []);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const [deleteConfirmSection, setDeleteConfirmSection] = useState(null);

  // ✅ Proper dependency added
  useEffect(() => {
    fetchCreatedCourse(dispatch);
  }, [dispatch]);

  const handleAddSection = async () => {
    if (!sectionName || !selectedCourse) return;

    const formData = new FormData();
    formData.append("sectionName", sectionName);
    formData.append("courseId", selectedCourse._id);

    await addSection(dispatch, formData);

    // ✅ reset properly (string not null)
    setSectionName("");
    setSelectedCourse(null);
  };

  function handleEditSection() {
    if (!editingSection) return;

    const formData = new FormData();
    formData.append("sectionId", editingSection._id);
    formData.append("sectionName", sectionName);
    updateSection(dispatch, formData);
    setEditingSection(null);
    setSectionName("");
    setSelectedCourse(null);
  };

  const handleDeleteSection = async () => {
    if (!deleteConfirmSection) return;

    await deleteSection(dispatch, deleteConfirmSection._id);

    setDeleteConfirmSection(null);
    setSelectedCourse(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Sections</h1>

        <span className={styles.badge}>
          <VscShield />
          Instructor Only
        </span>
      </div>

      {courses.map((course) => (
        <div key={course._id} className={styles.courseCard}>
          <div className={styles.courseHeader}>
            <h2>{course.courseName}</h2>

            <button
              className={styles.addBtn}
              onClick={() => {
                setSelectedCourse(course);
                setEditingSection(null);
                setSectionName("");
              }}
            >
              <VscAdd /> Add Section
            </button>
          </div>

          {course.courseContents?.map((section) => (
            <div key={section._id} className={styles.sectionRow}>
              <span>{section.sectionName}</span>

              <div>
                <button
                  className={styles.editBtn}
                  onClick={() => {
                    setEditingSection(section);
                    setSelectedCourse(course);
                    setSectionName(section.sectionName);
                  }}
                >
                  <VscEdit />
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    setDeleteConfirmSection(section);
                    setSelectedCourse(course);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ADD / EDIT MODAL */}
      {(selectedCourse || editingSection) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editingSection ? "Edit Section" : "Add Section"}</h2>

            <input
              type="text"
              placeholder="Enter section name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className={styles.input}
            />

            <div className={styles.actions}>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setEditingSection(null);
                  setSectionName("");
                }}
              >
                Cancel
              </button>

              <button
                onClick={editingSection ? handleEditSection : handleAddSection}
                className={styles.saveBtn}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteConfirmSection && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Delete Section</h2>

            <p>
              Are you sure you want to delete section:
              <strong> {deleteConfirmSection.sectionName}</strong> ?
            </p>

            <div className={styles.actions}>
              <button onClick={() => setDeleteConfirmSection(null)}>
                Cancel
              </button>

              <button
                className={styles.deleteBtn}
                onClick={handleDeleteSection}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
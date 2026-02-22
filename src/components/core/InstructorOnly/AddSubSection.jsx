import React, { useEffect, useState } from "react";
import styles from "./AddSubSection.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCreatedCourse,
  addSubSection,
  updateSubSection,
  deleteSubSection,
} from "../../../services/Oprations/Course";

import { VscAdd, VscEdit, VscTrash, VscShield } from "react-icons/vsc";

export default function AddSubSection() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.allCourse || []);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [editingSubSection, setEditingSubSection] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formDataState, setFormDataState] = useState({
    title: "",
    description: "",
    timeDuration: "",
    videoFile: null,
  });

  // ✅ ONLY fetch here (no state syncing)
  useEffect(() => {
    fetchCreatedCourse(dispatch);
  }, [dispatch]);

  //---------------------------------------------------
  // DERIVED VALUES (instead of syncing state in effect)
  //---------------------------------------------------

  const derivedSelectedCourse = selectedCourse
    ? courses.find((c) => c._id === selectedCourse._id)
    : null;

  const derivedSelectedSection =
    derivedSelectedCourse && selectedSection
      ? derivedSelectedCourse.courseContents?.find(
          (s) => s._id === selectedSection._id
        ) || null
      : null;

  //---------------------------------------------------
  // Handle input change
  //---------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDataState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoChange = (e) => {
    setFormDataState((prev) => ({
      ...prev,
      videoFile: e.target.files[0],
    }));
  };

  //---------------------------------------------------
  // ADD SUBSECTION
  //---------------------------------------------------

  const handleAdd = async () => {
    if (!derivedSelectedSection) return;

    const formData = new FormData();

    formData.append("title", formDataState.title);
    formData.append("description", formDataState.description);
    formData.append("timeDuration", formDataState.timeDuration);
    formData.append("sectionId", derivedSelectedSection._id);
    formData.append("videoFile", formDataState.videoFile);

    await addSubSection(dispatch, formData);

    resetForm();
  };

  //---------------------------------------------------
  // EDIT SUBSECTION
  //---------------------------------------------------

  const handleEdit = async () => {
    const formData = new FormData();

    formData.append("subSectionId", editingSubSection._id);
    formData.append("title", formDataState.title);
    formData.append("description", formDataState.description);
    formData.append("timeDuration", formDataState.timeDuration);

    if (formDataState.videoFile) {
      formData.append("videoFile", formDataState.videoFile);
    }

    await updateSubSection(dispatch, formData);

    resetForm();
  };

  //---------------------------------------------------
  // DELETE SUBSECTION
  //---------------------------------------------------

  const handleDelete = async () => {
    const formData = new FormData();

    formData.append("subSectionId", deleteConfirm._id);
    formData.append("sectionId", derivedSelectedSection._id);

    await deleteSubSection(dispatch, formData);

    setDeleteConfirm(null);
  };

  //---------------------------------------------------
  // RESET FORM
  //---------------------------------------------------

  const resetForm = () => {
    setEditingSubSection(null);

    setFormDataState({
      title: "",
      description: "",
      timeDuration: "",
      videoFile: null,
    });
  };

  //---------------------------------------------------
  // UI
  //---------------------------------------------------

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage SubSections</h1>

        <span className={styles.badge}>
          <VscShield />
          Instructor Only
        </span>
      </div>

      {/* Course Select */}
      <select
        className={styles.select}
        onChange={(e) => {
          const course = courses.find(
            (c) => c._id === e.target.value
          );
          setSelectedCourse(course);
          setSelectedSection(null);
        }}
      >
        <option>Select Course</option>

        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.courseName}
          </option>
        ))}
      </select>

      {/* Section Select */}
      {derivedSelectedCourse && (
        <select
          className={styles.select}
          onChange={(e) => {
            const section =
              derivedSelectedCourse.courseContents.find(
                (s) => s._id === e.target.value
              );
            setSelectedSection(section);
          }}
        >
          <option>Select Section</option>

          {derivedSelectedCourse.courseContents.map((section) => (
            <option key={section._id} value={section._id}>
              {section.sectionName}
            </option>
          ))}
        </select>
      )}

      {/* Add Button */}
      {derivedSelectedSection && (
        <button
          onClick={() => setEditingSubSection({})}
          className={styles.addBtn}
        >
          <VscAdd /> Add SubSection
        </button>
      )}

      {/* Subsection List */}
      {derivedSelectedSection?.subSection?.length > 0 ? (
        derivedSelectedSection.subSection.map((sub) => (
          <div key={sub._id} className={styles.row}>
            <span>{sub.title}</span>

            <div className={styles.actions}>
              <button
                className={styles.editBtn}
                onClick={() => {
                  setEditingSubSection(sub);
                  setFormDataState({
                    title: sub.title,
                    description: sub.description,
                    timeDuration: sub.timeDuration,
                    videoFile: null,
                  });
                }}
              >
                <VscEdit />
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => setDeleteConfirm(sub)}
              >
                <VscTrash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.empty}>
          No subsections available yet
        </p>
      )}

      {/* Add/Edit Modal */}
      {editingSubSection !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>
              {editingSubSection._id
                ? "Edit SubSection"
                : "Add SubSection"}
            </h2>

            <input
              name="title"
              placeholder="Title"
              value={formDataState.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formDataState.description}
              onChange={handleChange}
            />

            <input
              name="timeDuration"
              placeholder="Duration"
              value={formDataState.timeDuration}
              onChange={handleChange}
            />

            <div className={styles.fileUpload}>
              <label className={styles.fileLabel}>
                <input
                  type="file"
                  onChange={handleVideoChange}
                  hidden
                />

                <span className={styles.fileBtn}>
                  Upload Video
                </span>

                <span className={styles.fileName}>
                  {formDataState.videoFile
                    ? formDataState.videoFile.name
                    : "No file selected"}
                </span>
              </label>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={resetForm}
                className={styles.cancelBtn}
              >
                Cancel
              </button>

              <button
                onClick={
                  editingSubSection._id
                    ? handleEdit
                    : handleAdd
                }
                className={styles.saveBtn}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              Delete "{deleteConfirm.title}" ?
            </h3>

            <div className={styles.modalActions}>
              <button
                onClick={() => setDeleteConfirm(null)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className={styles.deleteConfirmBtn}
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
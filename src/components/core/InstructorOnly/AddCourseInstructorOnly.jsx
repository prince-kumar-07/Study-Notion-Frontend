import { useEffect, useState } from "react";
import styles from "./AddCourseInstructorOnly.module.css";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { VscCloudUpload } from "react-icons/vsc";
import  {addNewCourse} from "../../../services/Oprations/Course";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { VscShield } from "react-icons/vsc";




// const allCourses = useSelector((state) => state.course.allCourse);





const AddCourseInstructorOnly = () => {
  // const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

const [categoryData, setCategoryData] = useState([]);

useEffect(() => {
  function loadCategories() {
    const stored = localStorage.getItem("category");
    const parsed = stored ? JSON.parse(stored) : [];
    setCategoryData(parsed);
  }

  loadCategories();
}, []);


  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    tag: "",
    category: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  function handleSubmit() {
    const data = new FormData();

    data.append("courseName", formData.courseName);
    data.append("courseDescription", formData.courseDescription);
    data.append("whatYouWillLearn", formData.whatYouWillLearn);
    data.append("price", formData.price);
    data.append("tag", formData.tag);
    data.append("category", formData.category);

    data.append("thumbnailImage", thumbnail);


    addNewCourse(dispatch, data, navigate);
  }


  return (
    <div className={styles.wrapper}>
     <div className={styles.header}>
  <h1 className={styles.title}>Create New Course</h1>

  <span className={styles.badge}>
    <VscShield />
    Instructor Only
  </span>
</div>


      {/* Stepper */}
      <div className={styles.stepper}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`${styles.step} ${step >= s ? styles.active : ""}`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className={styles.card}>
        {/* LEFT SECTION */}
        <div className={styles.leftSection}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className={styles.stepContent}
            >
              {step === 1 && (
                <>
                  <input
                    type="text"
                    name="courseName"
                    placeholder="Course Title"
                    value={formData.courseName}
                    onChange={handleChange}
                    className={styles.input}
                  />

                  <textarea
                    name="courseDescription"
                    placeholder="Course Description"
                    value={formData.courseDescription}
                    onChange={handleChange}
                    className={styles.textarea}
                  />

                  <div className={styles.buttonRowRight}>
                    <button
                      className={styles.primaryBtn}
                      onClick={() => setStep(2)}
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <textarea
                    name="whatYouWillLearn"
                    placeholder="What students will learn"
                    value={formData.whatYouWillLearn}
                    onChange={handleChange}
                    className={styles.textarea}
                  />

                  <input
                    type="number"
                    name="price"
                    placeholder="Course Price"
                    value={formData.price}
                    onChange={handleChange}
                    className={styles.input}
                  />

                  <input
                    type="text"
                    name="tag"
                    placeholder="Tags"
                    value={formData.tag}
                    onChange={handleChange}
                    className={styles.input}
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={styles.input}
                  >
                    <option value="">Select Category</option>

                    {categoryData.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <div className={styles.buttonRow}>
                    <button
                      className={styles.secondaryBtn}
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </button>
                    <button
                      className={styles.primaryBtn}
                      onClick={() => setStep(3)}
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className={styles.thumbnailBox}>
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className={styles.preview}
                      />
                    ) : (
                      <div className={styles.uploadPlaceholder}>
                        <VscCloudUpload size={40} />
                        <p>Upload Thumbnail</p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnail}
                      hidden
                      id="thumbnailUpload"
                    />

                    <label
                      htmlFor="thumbnailUpload"
                      className={styles.uploadBtn}
                    >
                      Select Image
                    </label>
                  </div>

                  <div className={styles.buttonRow}>
                    <button
                      className={styles.secondaryBtn}
                      onClick={() => setStep(2)}
                    >
                      ← Back
                    </button>

                    <button
                      className={styles.successBtn}
                      onClick={handleSubmit}
                    >
                      Create Course 🚀
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.previewPanel}>
          <div className={styles.previewCard}>
            <div className={styles.previewTop}>
              {preview ? (
                <img
                  src={preview}
                  alt="thumbnail"
                  className={styles.previewImage}
                />
              ) : (
                <p>Thumbnail Preview</p>
              )}
            </div>

            <div className={styles.previewBody}>
              <h3>{formData.courseName || "Course Title"}</h3>
              <span className={styles.categoryText}>
                {formData.category || "Category"}
              </span>

              <p>
                {formData.courseDescription ||
                  "Your course description will appear here."}
              </p>

              <div className={styles.previewMeta}>
                <span>₹ {formData.price || 0}</span>
                <span>{formData.tag || "Tag"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseInstructorOnly;

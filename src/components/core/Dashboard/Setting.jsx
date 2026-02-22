import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Setting.module.css";
import {
  deleteAccount,
  PasswordUpdateService,
} from "../../../services/Oprations/Auth";
import { useNavigate } from "react-router-dom";
import {
  UpdateProfileImage,
  UpdateProfileInfo,
} from "../../../services/Oprations/Profile";
import usePageTitle from "../../../services/Oprations/Title/Title";
import { FiAlertTriangle, FiLock } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Settings() {

  const formatDateTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};


  const user = useSelector((state) => state.profile.user);
  usePageTitle(user?.firstName + " Setting");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [deleteInput, setDeleteInput] = useState("");
 const [shake, setShake] = useState(false);

  const [formData, setFormData] = useState({
    contactNumber: user?.contactNumber || "",
    gender: user?.additionalDetails?.gender || "",
    day: user?.additionalDetails?.dateOfBirth?.split("/")[0] || "",
    month: user?.additionalDetails?.dateOfBirth?.split("/")[1] || "",
    year: user?.additionalDetails?.dateOfBirth?.split("/")[2] || "",
    about: user?.additionalDetails?.about || "",
  });

  const [changePasswordFormData, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [imagePreview, setImagePreview] = useState(user?.image || "");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  function handleImageupload() {
    if (!selectedFile) return;
    UpdateProfileImage(dispatch, selectedFile);
  }

  function handleAccounDelete() {
    if (deleteInput !== "DELETE") {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setShowDeleteModal(false)
    deleteAccount(dispatch);
    navigate("/");
  }

  function handlePasswordChange(e) {
    setChangePasswordForm({
      ...changePasswordFormData,
      [e.target.name]: e.target.value,
    });
  }

  function updatePassword() {
    PasswordUpdateService(dispatch, changePasswordFormData);
    navigate("/");
  }

  function updateAdditonalData() {
    const additionalData = {};

    if (formData.gender) additionalData.gender = formData.gender;
    if (formData.contactNumber)
      additionalData.contactNumber = formData.contactNumber;

    if (formData.day && formData.month && formData.year) {
      additionalData.dateOfBirth =
        formData.day + "/" + formData.month + "/" + formData.year;
    }

    if (formData.about) additionalData.about = formData.about;

    UpdateProfileInfo(dispatch, additionalData);
  }

 function calculateDeletionDate() {
  const now = new Date();
  const deletionDate = new Date(now);
  deletionDate.setDate(now.getDate() + 15);
  return deletionDate;
}


  return (
    <div className={styles.wrapper}>
      <div className={styles.bgGradient}></div>

      <div className={styles.inner}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Account Settings
        </motion.h1>

        {/* Profile Section */}
        <motion.form
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.imageSection}>
            <img
              src={
                imagePreview ||
                "https://api.dicebear.com/7.x/initials/svg?seed=User"
              }
              alt="profile"
              className={styles.avatar}
            />

            <div className={styles.imageButtons}>
              <label className={styles.selectBtn}>
                Select
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>

              <button
                type="button"
                className={styles.uploadBtn}
                onClick={handleImageupload}
              >
                Upload
              </button>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>First Name</label>
              <input value={user?.firstName} disabled />
            </div>

            <div className={styles.field}>
              <label>Last Name</label>
              <input value={user?.lastName} disabled />
            </div>

            <div className={styles.field}>
              <label>Email Address</label>
              <input value={user?.email} disabled />
            </div>

            <div className={styles.field}>
              <label>Phone Number</label>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                disabled
              />
            </div>

            <div className={styles.field}>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Date of Birth</label>
              <div className={styles.dobRow}>
                <select name="day" value={formData.day} onChange={handleChange}>
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Year</option>
                  {[...Array(60)].map((_, i) => (
                    <option key={i} value={2024 - i}>
                      {2024 - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>About You</label>
              <textarea
                rows="4"
                name="about"
                value={formData.about}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="button"
            className={styles.primaryBtn}
            onClick={updateAdditonalData}
          >
            Save Changes
          </button>
        </motion.form>

        {/* Password Section */}
        <motion.div className={styles.card}>
          <h2>Change Password</h2>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Current Password</label>
              <div className={styles.inputWrapper}>
                <FiLock />
                <input
                  type="password"
                  name="currentPassword"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>New Password</label>
              <div className={styles.inputWrapper}>
                <FiLock />
                <input
                  type="password"
                  name="newPassword"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Confirm Password</label>
              <div className={styles.inputWrapper}>
                <FiLock />
                <input
                  type="password"
                  name="confirmNewPassword"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
          </div>

          <button onClick={updatePassword} className={styles.secondaryBtn}>
            Update Password
          </button>
        </motion.div>

        {/* Delete Section */}
       
      </div>
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={`${styles.modal} ${shake ? styles.shake : ""}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className={styles.modalTitle}>Delete Account Permanently</h3>

            <p className={styles.modalText}>
              This action cannot be undone.
              <br />
              <br />
             {`This account will be permanently deleted on ${calculateDeletionDate()}`}

              <br />
              • All your data
              <br />
              • All your courses
              <br />
              • All associated information
              <br />
              <br />
              This cannot be restored.
            </p>

            <p className={styles.confirmText}>
              Type <b>DELETE</b> to confirm
            </p>

            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className={styles.deleteInput}
              placeholder="Type DELETE"
            />

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteInput("");
                }}
              >
                Cancel
              </button>

              <button
                className={styles.confirmDeleteBtn}
                onClick={() => {
                  handleAccounDelete();
                }}
              >
                Delete Permanently
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div>
       {
        user?.additionalDetails?.loginHistory[1] && 

         <motion.form
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.loginHistory}>
          <h2>Recent Login Activity</h2>
          <span>Details of your last account access</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>IP Address</label>
            <input
              value={user?.additionalDetails?.loginHistory[1].ipAddress || "No records available"}
              disabled
            />
          </div>

          <div className={styles.field}>
            <label>Browser Name</label>
            <input
              value={user?.additionalDetails?.loginHistory[1].browserName || "No records available"}
              disabled
            />
          </div>

          <div className={styles.field}>
            <label>Browser Version</label>
            <input
              value={user?.additionalDetails?.loginHistory[1].browserVersion || "No records available"}
              disabled
            />
          </div>

          <div className={styles.field}>
            <label>OS Name</label>
            <input
              value={user?.additionalDetails?.loginHistory[1].osName || "No records available"}
              disabled
            />
          </div>

          <div className={styles.field}>
            <label>OS Version</label>
            <input
              value={user?.additionalDetails?.loginHistory[1].osVersion || "No records available"}
              disabled
            />
          </div>

           <div className={styles.field}>
            <label>Device Type</label>
            <input
              value={user?.additionalDetails?.loginHistory[1].deviceType || "No records available"}
              disabled
            />
          </div>

          <div className={styles.field}>
            <label>Last Accessed At</label>
            <input
              value={formatDateTime(user?.additionalDetails?.loginHistory[1].loginAt) || "No records available"}
              disabled
            />
          </div>
 
                <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Access Location</label>
              <textarea
                rows="4"
                name="about"
                value={user?.additionalDetails?.loginHistory[1]?.location?.fullAddress || "No records available"}
                onChange={handleChange}
                disabled
              />
            </div>


        </div>
      </motion.form>

       }
     
      </div>

       <motion.div className={`${styles.card} ${styles.dangerCard}`}>
          <h2 className={styles.dangerTitle}>
            <FiAlertTriangle /> Delete Account
          </h2>

          <p>This action is permanent and cannot be undone.</p>

          <button
            onClick={() => setShowDeleteModal(true)}
            className={styles.dangerBtn}
          >
            Delete Account
          </button>
        </motion.div>
    </div>
  );
}

export default Settings;

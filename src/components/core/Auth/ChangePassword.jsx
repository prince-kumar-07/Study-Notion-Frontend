import { useState } from "react";
import styles from "./ChangePassword.module.css";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { PasswordChangeService } from "../../../services/Oprations/Auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function ChangePassword() {
  const { token, email } = useParams();
  const dispatch = useDispatch();

  const { passwordResetSuccess } = useSelector((state) => state.signup);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword || newPassword.length < 6) {
      alert("Passwords must match and be at least 6 characters.");
      return;
    }

    PasswordChangeService(dispatch, {
      password: newPassword,
      confirmPassword,
      token,
    });
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>Change Password</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email (Not Editable) */}
          <div className={styles.inputGroup}>
            <input type="email" value={email} disabled />
            {/* <label>Email</label> */}
          </div>

          {/* New Password */}
          <div className={styles.inputGroup}>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>New Password</label>
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.button}
            type="submit"
          >
            Update Password
          </motion.button>
        </form>

        {/* Success Animation */}
        <AnimatePresence>
          {passwordResetSuccess && (
            <motion.div
              className={styles.success}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ✅ Password Successfully Changed
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ChangePassword;

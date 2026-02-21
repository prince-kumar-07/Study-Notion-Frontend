import { useState } from "react";
import styles from "./Login.module.css";
import { Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeShowRevokeModal, removeSubmited, removeBlockedModal} from "../../../Reducer/Slices/SignUpSlice";
import { showSpinner } from "../../../Reducer/Slices/SpinnerSlice";
import { forgotPassword, login } from "../../../services/Oprations/Auth";
import usePageTitle from "../../../services/Oprations/Title/Title";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePageTitle("Login"); 
const {
  showRevokeModal,
  deletionDate,
  submitted,
  blockedModal,
  blockedMessage
} = useSelector(s => s.signup || {});
  const [showModal, setShowModal] = useState(false);
  const [emails, setEmails] = useState({ reset: "", confirm: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = e =>
    setFormData(s => ({ ...s, [e.target.name]: e.target.value }));

  const getLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation)
        return reject(toast.error("Geolocation not supported"));

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve(coords),
        ({ message }) => reject(new Error(message))
      );
    });

  const handleLogin = async (revoke = false) => {
    dispatch(showSpinner("Validating credentials..."));

    let data = { ...formData };

    try {
      const { latitude, longitude, accuracy } = await getLocation();
      data = { ...data, latitude, longitude, accuracy };
    } catch {}

    login(dispatch, data, navigate, revoke);
    revoke && dispatch(removeShowRevokeModal());
  };

  const handleResetSubmit = () => {
    if (!emails.reset || emails.reset !== emails.confirm)
      return toast.error("Emails must match");

    forgotPassword(dispatch, emails.reset);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(removeSubmited());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Login to continue learning</p>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}
          className={styles.form}
        >

          <div className={styles.inputGroup}>
            <Mail size={18} className={styles.icon} />
            <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder=" " />
            <label>Email Address</label>
          </div>

          <div className={styles.inputGroup}>
            <Lock size={18} className={styles.icon} />
            <input name="password" type="password" required value={formData.password} onChange={handleChange} placeholder=" " />
            <label>Password</label>
          </div>

          <div className={styles.forgot}>
            <button
              type="button"
              className={styles.forgotBtn}
              onClick={() => {
                setShowModal(true);
                dispatch(removeSubmited());
                setEmails({ reset: "", confirm: "" });
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={closeModal}>✕</button>

            {!submitted ? (
              <>
                <h3 className={styles.modalTitle}>Reset Password</h3>

                {["reset", "confirm"].map(key => (
                  <div key={key} className={styles.inputGroup}>
                    <input
                      type="email"
                      value={emails[key]}
                      onChange={e => setEmails(s => ({ ...s, [key]: e.target.value }))}
                      placeholder=" "
                    />
                    <label>{key === "reset" ? "Email" : "Confirm Email"}</label>
                  </div>
                ))}

                <button className={styles.modalButton} onClick={handleResetSubmit}>
                  Send Reset Link
                </button>
              </>
            ) : (
              <div className={styles.successBox}>
                📩 Reset link sent to
                <br />
                <strong>{emails.reset}</strong>
                <p>Please check your email.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showRevokeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Account Deletion Scheduled</h3>

            <p>
              Your account will be deleted on
              <br />
              <b>{new Date(deletionDate).toLocaleString("en-IN")}</b>
            </p>

            <p>Logging in now will restore your account.</p>

            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn}
                onClick={() => dispatch(removeShowRevokeModal())}>
                Keep Scheduled
              </button>

              <button className={styles.confirmBtn}
                onClick={() => handleLogin(true)}>
                Revoke Deletion
              </button>
            </div>
          </div>
        </div>
      )}


      {blockedModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>

      <h3 className={styles.modalTitle}>
        Account Blocked
      </h3>

      <p className={styles.modalText}>
        {blockedMessage}
      </p>

      <div className={styles.modalButtons}>
        <button
          className={styles.confirmBtn}
          onClick={() => dispatch(removeBlockedModal())}
        >
          OK
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
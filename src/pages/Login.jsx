import { useState } from "react";
import styles from "./Login.module.css";
import { Mail, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
// import { showSpinner, hideSpinner } from "../Reducer/Slices/SpinnerSlice";
import { removeSubmited } from "../Reducer/Slices/SignUpSlice";
import {forgotPassword, login} from "../services/Oprations/Auth"
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import usePageTitle from "../services/Oprations/Title/Title";


export default function Login() {

  usePageTitle("Login")
  const navigate = useNavigate()




  function handleClose(){
    setShowModal(false)
    dispatch(removeSubmited())
  }

    
   const { submitted } = useSelector(
    (state) => state.signup
  );
  
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  // console.log(submitted)


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Login Data:", formData);
    //  dispatch(showSpinner("Logging in..."));
    login(dispatch, formData, navigate)
  };

  const handleResetSubmit = () => {
    if (!resetEmail || resetEmail !== confirmEmail) {
      alert("Emails must match");
      return;
    }
    forgotPassword(dispatch, resetEmail)
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Login to continue learning</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <Mail size={18} className={styles.icon} />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Email Address</label>
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <Lock size={18} className={styles.icon} />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Password</label>
          </div>

          <div className={styles.forgot}>
            <button
              type="button"
              className={styles.forgotBtn}
              onClick={() => {
                setShowModal(true);
                removeSubmited(false)
                setResetEmail("");
                setConfirmEmail("");
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

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeBtn}
              onClick={handleClose}
            >
              ✕
            </button>

            {!submitted ? (
              <>
              
                <h3 className={styles.modalTitle}>Reset Password</h3>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder=" "
                  />
                  <label>Email</label>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder=" "
                  />
                  <label>Confirm Email</label>
                </div>

                <button
                  className={styles.modalButton}
                  onClick={handleResetSubmit}
                >
                  Send Reset Link
                </button>
              </>
            ) : (
              <div className={styles.successBox}>
                📩 Reset link sent to  
                <br />
                <strong>{resetEmail}</strong>
                <p>Please check your email.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

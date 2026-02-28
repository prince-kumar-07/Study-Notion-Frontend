import { useState, useRef } from "react";
import styles from "./Signup.module.css";
import countryCodes from "../../../../data/countrycode.json";
import { FaEnvelope, FaLock, FaPhone, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCloseOTP } from "../../../Reducer/Slices/SignUpSlice";
import { sendOTP, signUP } from "../../../services/Oprations/Auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../../services/Oprations/Title/Title";

const Signup = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  usePageTitle("SignUP");

  const [accountType, setAccountType] = useState("Student");
  const { showOtp, success } = useSelector((state) => state.signup || {});
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    accountType: "Student",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  // useEffect(() => {
  // }, [formData]);

  const inputRefs = useRef([]);

  // ✅ NEW: Universal Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOTP(formData.email, dispatch);
  };

  /* OTP TIMER */
  // useEffect(() => {
  //   if (showOtp && timer > 0) {
  //     const interval = setInterval(() => {
  //       setTimer((prev) => prev - 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [showOtp, timer]);

  /* Handle OTP Input */
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    // console.log(value)

    const newOtp = [...otp];

    if (value.length === 6) {
      const values = value.split("");
      setOtp(values);
      // setOtpValues(value)

      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    //  setOtpValues(value)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.join("").length === 6) {
      verifyOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = (otpArray = otp) => {
    if (otpArray.join("").length !== 6) {
      setError(true);
      // setTimeout(() => setError(false), 400);
      return;
    }

    signUP(dispatch, formData, otpArray.join(""), naviagte);
  };

  const closeModal = () => {
    dispatch(setCloseOTP());
    setOtp(["", "", "", "", "", ""]);
    setError(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create your StudyNotion account</h2>

    
        <div className={styles.toggle}>
          {["Student", "Instructor"].map((type) => (
            <button
              key={type}
              type="button"
              className={`${styles.toggleBtn} ${
                accountType === type ? styles.active : ""
              }`}
              onClick={() => {
                setAccountType(type);
                setFormData((prev) => ({
                  ...prev,
                  accountType: type,
                }));
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.iconInput}>
              <FaUser className={styles.userIcon} color="white" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                autoComplete="given-name"
              />
            </div>

            <div className={styles.iconInput}>
              <FaUser className={styles.userIcon}  color="white" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className={styles.iconInput}>
            <FaEnvelope  className={styles.userIcon}  color="white" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.phoneRow}>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className={styles.select}
            >
              {countryCodes.map((item, index) => (
                <option
                  className={styles.optiontextcolor}
                  key={index}
                  value={item.code}
                >
                  {item.country} {item.code}
                </option>
              ))}
            </select>

            <div className={styles.iconInput}>
              <FaPhone  className={styles.userIcon}  color="white" />
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                autoComplete="tel"
              />
            </div>
          </div>

       <div className={styles.iconInput}>
  <FaLock className={styles.leftIcon} />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Password"
    required
    autoComplete="new-password"
    className={styles.passinput}
  />

  <span
    className={styles.rightIcon}
    onClick={() => setShowPassword(prev => !prev)}
  >
    {showPassword ? <FaEyeSlash  /> : <FaEye  />}
  </span>
</div>

       <div className={styles.iconInput}>
  <FaLock className={styles.leftIcon} />

  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm Password"
    required
    autoComplete="new-password"
    className={styles.passinput}
  />

  <span
    className={styles.rightIcon}
    onClick={() => setShowConfirmPassword(prev => !prev)}
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye  />}
  </span>
</div>

          <button className={styles.submitBtn}>Create Account</button>
        </form>
        <button 
        onClick={() => naviagte("/login")}
        className={styles.logintext}>Already registered? Log in here</button>
      </div>

      {/* OTP MODAL */}
      {showOtp && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${error ? styles.shake : ""}`}>
            <button className={styles.closeBtn} onClick={closeModal}>
              <IoClose />
            </button>

            {!success ? (
              <>
                <h3 className={styles.modalTitle}>Enter Verification Code</h3>
                <p className={styles.modalSubtitle}>
                  We sent a 6-digit code to your phone
                </p>

                <div className={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      maxLength="1"
                      value={digit}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={styles.otpBox}
                    />
                  ))}
                </div>

                <button
                  onClick={() => verifyOtp()}
                  className={styles.verifyBtn}
                >
                  Verify Code
                </button>

                {/* <p className={styles.resend}>
                  {timer > 0
                    ? `Resend in ${timer}s`
                    : "Resend Code"}
                </p> */}
              </>
            ) : (
              <div className={styles.success}>
                <div className={styles.successCircle}>✓</div>
                <p className={styles.otpSuccess}>
                  Account Created Successfully
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

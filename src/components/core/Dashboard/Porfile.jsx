import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import usePageTitle from "../../../services/Oprations/Title/Title";

function Profile() {
  const user = useSelector((state) => state.profile.user);
  usePageTitle(user?.firstName + " Profile");

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className={styles.wrapper}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* HEADER */}
      <motion.div variants={item} className={styles.header}>
        <div>
          <h1>
            {user?.firstName} <span>{user?.lastName}</span>
          </h1>
          <p className={styles.subtitle}>
            {user?.accountType} • {user?.email}
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={styles.avatar}
        >
          <img
            src={user?.image}
            alt="Profile"
            className={styles.avatarImage}
          />
        </motion.div>
      </motion.div>

      {/* ABOUT */}
      <motion.div variants={item} className={styles.card}>
        <h3>About</h3>
        <p>
          {user?.additionalDetails?.about ||
            "No information has been added yet."}
        </p>
      </motion.div>

      {/* PERSONAL + ADDITIONAL */}
      <motion.div variants={item} className={styles.gridContainer}>
        
        <div className={styles.card}>
          <h3>Personal Information</h3>
          <div className={styles.grid}>
            <div>
              <span>First Name</span>
              <p>{user?.firstName || "Not Provided"}</p>
            </div>
            <div>
              <span>Last Name</span>
              <p>{user?.lastName || "Not Provided"}</p>
            </div>
            <div>
              <span>Contact</span>
              <p>{user?.contactNumber || "Not Available"}</p>
            </div>
            <div>
              <span>User ID</span>
              <p>{user?._id}</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Additional Information</h3>
          <div className={styles.grid}>
            <div>
              <span>Date of Birth</span>
              <p>{user?.additionalDetails?.dateOfBirth || "Not specified"}</p>
            </div>
            <div>
              <span>Gender</span>
              <p>{user?.additionalDetails?.gender || "Not specified"}</p>
            </div>
            <div>
              <span>Email</span>
              <p>{user?.email}</p>
            </div>
            <div>
              <span>Account Type</span>
              <p>{user?.accountType}</p>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

export default Profile;

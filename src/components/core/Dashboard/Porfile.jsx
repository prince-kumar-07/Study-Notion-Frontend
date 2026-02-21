import React, { memo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import styles from "./Profile.module.css";

import usePageTitle from "../../../services/Oprations/Title/Title";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};


const Profile = memo(function Profile() {

  const user = useSelector(
    state => state.profile?.user || null
  );

  usePageTitle(
    user?.firstName
      ? `${user.firstName} Profile`
      : "Profile"
  );

  if (!user) {
    return (
      <div className={styles.wrapper}>
        Loading profile...
      </div>
    );
  }

  return (

    <motion.div
      className={styles.wrapper}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >

      {/* HEADER */}

      <motion.div
        variants={itemVariants}
        className={styles.header}
      >

        <div>

          <h1>
            {user.firstName}
            {" "}
            <span>{user.lastName}</span>
          </h1>

          <p className={styles.subtitle}>
            {user.accountType}
            {" • "}
            {user.email}
          </p>

        </div>


        <motion.div
          whileHover={{ scale: 1.05 }}
          className={styles.avatar}
        >

          <img
            src={
              user.image ||
              "/default-avatar.png"
            }
            alt="Profile"
            className={styles.avatarImage}
          />

        </motion.div>

      </motion.div>


      {/* ABOUT */}

      <motion.div
        variants={itemVariants}
        className={styles.card}
      >

        <h3>About</h3>

        <p>
          {user.additionalDetails?.about ||
            "No information added yet."}
        </p>

      </motion.div>


      {/* INFO GRID */}

      <motion.div
        variants={itemVariants}
        className={styles.gridContainer}
      >

        <div className={styles.card}>

          <h3>Personal Information</h3>

          <div className={styles.grid}>

            <InfoItem
              label="First Name"
              value={user.firstName}
            />

            <InfoItem
              label="Last Name"
              value={user.lastName}
            />

            <InfoItem
              label="Contact"
              value={user.contactNumber}
            />

            <InfoItem
              label="User ID"
              value={user._id}
            />

          </div>

        </div>


        <div className={styles.card}>

          <h3>Additional Information</h3>

          <div className={styles.grid}>

            <InfoItem
              label="Date of Birth"
              value={
                user.additionalDetails?.dateOfBirth
              }
            />

            <InfoItem
              label="Gender"
              value={
                user.additionalDetails?.gender
              }
            />

            <InfoItem
              label="Email"
              value={user.email}
            />

            <InfoItem
              label="Account Type"
              value={user.accountType}
            />

          </div>

        </div>

      </motion.div>

    </motion.div>

  );

});


const InfoItem = memo(function InfoItem({
  label,
  value
}) {

  return (
    <div>

      <span>{label}</span>

      <p>
        {value || "Not provided"}
      </p>

    </div>
  );

});


export default Profile;
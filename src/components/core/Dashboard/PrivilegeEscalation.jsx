import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  VscShield,
  VscArrowUp,
  VscSearch,
  VscVerified,
  VscWarning,
} from "react-icons/vsc";
import styles from "./PrivilegeEscalation.module.css";

export default function PrivilegeEscalation() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // 🔥 Temporary CEO-Level Data
  const users = [
    { id: 1, name: "Jane Smith", email: "jane@gmail.com", role: "Student" },
    { id: 2, name: "Alex Brown", email: "alex@gmail.com", role: "Instructor" },
    { id: 3, name: "Michael Lee", email: "michael@gmail.com", role: "Student" },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  function handlePromote(user) {
    setSelectedUser(user);
    setConfirmOpen(true);
  }

  function confirmPromotion() {
    // 🔥 Replace with API later
    console.log("Promoted:", selectedUser);
    setConfirmOpen(false);
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Privilege Escalation</h1>
          <p>Grant administrative authority to selected users</p>
        </div>

        <div className={styles.securityBadge}>
          <VscShield />
          Admin Access Only
        </div>
      </motion.div>

      {/* SEARCH */}
      <div className={styles.searchBox}>
        <VscSearch />
        <input
          type="text"
          placeholder="Search user by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USER TABLE */}
      <div className={styles.card}>
        {filteredUsers.length === 0 ? (
          <div className={styles.empty}>
            <VscWarning size={40} />
            <p>No eligible users found</p>
          </div>
        ) : (
          filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className={styles.userRow}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div>
                <h4>{user.name}</h4>
                <span>{user.email}</span>
              </div>

              <div className={styles.roleBadge}>{user.role}</div>

              <button
                className={styles.promoteBtn}
                onClick={() => handlePromote(user)}
              >
                <VscArrowUp />
                Promote
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* CONFIRM MODAL */}
      {confirmOpen && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <VscVerified size={45} className={styles.modalIcon} />
            <h3>Confirm Elevation</h3>
            <p>
              You are granting <strong>{selectedUser?.name}</strong>{" "}
              full administrative privileges.
            </p>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>

              <button
                className={styles.confirmBtn}
                onClick={confirmPromotion}
              >
                Confirm Promotion
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

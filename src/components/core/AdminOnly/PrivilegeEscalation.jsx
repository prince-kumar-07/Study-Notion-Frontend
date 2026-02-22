import { useState, useMemo, useEffect } from "react";
import { GraduationCap, Shield, UserCheck } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  VscShield,
  VscArrowUp,
  VscSearch,
  VscWarning,
  VscLock,
  VscUnlock,
} from "react-icons/vsc";
import styles from "./PrivilegeEscalation.module.css";
import {
  fetchAllUser,
  updateUserBlockStatus,
  promoteToAdmin,
} from "../../../services/Oprations/Profile";
import { useSelector, useDispatch } from "react-redux";

export default function PrivilegeEscalation() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.profile.allUsers) || [];

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); 
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchAllUser(dispatch);
  }, []);

    const openModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
    setReason("");
  };

  const filteredUsers = useMemo(() => {
  const q = search.toLowerCase();

  return Array.isArray(users)
    ? users.filter(u =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)
      )
    : [];
}, [users, search]);

  function handlePromote(newAccountType){
    promoteToAdmin(dispatch, {targetUserId:selectedUser._id, newAccountType});
    closeModal();
  };

const handleBlock = async (status, reasonData = "") => {
  
    updateUserBlockStatus(dispatch, {
      targetUserId: selectedUser._id,
      isBlocked: status,
      reason: reasonData,
    });

    closeModal();
  };


  return (
    <div className={styles.container}>
    
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.headerText}>
          <h1>Privilege Escalation</h1>
          <p>Grant administrative authority to selected users</p>
        </div>

        <div className={styles.securityBadge}>
          <VscShield />
          <span>Admin Access Only</span>
        </div>
      </motion.div>

      <div className={styles.searchBox}>
        <VscSearch className={styles.searchIcon} />

        <input
          type="text"
          placeholder="Search user by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.card}>
        {filteredUsers.length === 0 ? (
          <div className={styles.empty}>
            <VscWarning size={42} />
            <p>No users found</p>
          </div>
        ) : (
          filteredUsers.map((user, index) => {
            const isBlocked = user.blockInfo?.isBlocked;

            return (
              <motion.div
                key={user._id}
                className={styles.userRow}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.userInfo}>
                  <h4 className={styles.userName}>
                    {user.firstName} {user.lastName}
                  </h4>

                  <span className={styles.userEmail}>{user.email}</span>
                </div>

                <div
                  className={`${styles.roleBadge} ${
                    user.accountType === "Student"
                      ? styles.student
                      : user.accountType === "Instructor"
                        ? styles.instructor
                        : user.accountType === "Admin"
                          ? styles.admin
                          : ""
                  }`}
                >
                  {user.accountType === "Student" && (
                    <GraduationCap size={14} className={styles.icon} />
                  )}

                  {user.accountType === "Instructor" && (
                    <UserCheck size={14} className={styles.icon} />
                  )}

                  {user.accountType === "Admin" && (
                    <Shield size={14} className={styles.icon} />
                  )}

                  {user.accountType}
                </div>

                <div className={styles.actions}>
                  {user.accountType === "Instructor" && (
                    <button
                      className={styles.promoteBtn}
                      onClick={() => openModal(user, "promote")}
                    >
                      <VscArrowUp />
                      <span>Promote</span>
                    </button>
                  )}

                  {user.accountType === "Admin" && (
                    <button
                      className={styles.downgradeBtn}
                      onClick={() => openModal(user, "downgrade")}
                    >
                      <VscArrowUp style={{ transform: "rotate(180deg)" }} />
                      <span>Downgrade</span>
                    </button>
                  )}

                  {isBlocked ? (
                    <button
                      className={styles.unblockBtn}
                      onClick={() => openModal(user, "unblock")}
                    >
                      <VscUnlock />
                      <span>Unblock</span>
                    </button>
                  ) : (
                    <button
                      className={styles.blockBtn}
                      onClick={() => openModal(user, "block")}
                    >
                      <VscLock />
                      <span>Block</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {modalType && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >

            {modalType === "promote" && (
              <>
                <h3>Promote User</h3>

                <p>
                  Are you sure you want to promote{" "}
                  <strong>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </strong>{" "}
                  to Admin?
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.cancelBtn} onClick={closeModal}>
                    Cancel
                  </button>

                  <button
                    className={styles.confirmBtn}
                    onClick={handlePromote("Admin")}
                  >
                    Confirm Promotion
                  </button>
                </div>
              </>
            )}

            {modalType === "block" && (
              <>
                <h3>Block User</h3>

                <p>
                  Enter reason for blocking{" "}
                  <strong>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </strong>
                </p>

                <textarea
                  className={styles.reasonInput}
                  placeholder="Enter blocking reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />

                <div className={styles.modalActions}>
                  <button className={styles.cancelBtn} onClick={closeModal}>
                    Cancel
                  </button>

                  <button
                    className={styles.dangerBtn}
                    // onClick={confirmBlock}
                    onClick={() => handleBlock(true, reason)}
                    disabled={!reason.trim()}
                  >
                    Confirm Block
                  </button>
                </div>
              </>
            )}

            {modalType === "unblock" && (
              <>
                <h3>Unblock User</h3>

                <p>
                  Are you sure you want to unblock{" "}
                  <strong>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </strong>
                  ?
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.cancelBtn} onClick={closeModal}>
                    Cancel
                  </button>

                  <button
                    className={styles.confirmBtn}
                     onClick={() => handleBlock(false, "")}
                  >
                    Confirm Unblock
                  </button>
                </div>
              </>
            )}

            {modalType === "downgrade" && (
              <>
                <h3>Downgrade Admin</h3>

                <p>
                  Are you sure you want to downgrade{" "}
                  <strong>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </strong>{" "}
                  to Instructor?
                </p>

                <div className={styles.modalActions}>
                  <button className={styles.cancelBtn} onClick={closeModal}>
                    Cancel
                  </button>

                  <button
                    className={styles.dangerBtn}
                    onClick={handlePromote("Instructor")}
                  >
                    Confirm Downgrade
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import styles from "./ManageUserAdmin.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPendingInstructorAllUser, updateInstuctorStatus } from "../../../services/Oprations/Profile";
import { VscShield } from "react-icons/vsc";

export default function ManageUserAdmin() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const users = useSelector((state) => state.profile.pendingInstructor) || [];

  useEffect(() => {
  fetchPendingInstructorAllUser(dispatch);
}, [dispatch]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return users.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q),
    );
  }, [users, search]);

  const statusClass = (status) => {
    if (status === "Approved") return styles.approved;

    if (status === "Rejected") return styles.rejected;

    return styles.pending;
  };

  function handleStatusUpdate(id, status){
   updateInstuctorStatus(dispatch, {instructorId: id, status})
  }

  return (
    <div className={styles.container}>
      {/* Header */}

      <div className={styles.header}>
        <h1 className={styles.title}>Instructor Approval Management</h1>

          <div className={styles.securityBadge}>
                           <VscShield />
                           <span>Admin Access Only</span>
                         </div>

        <input
          className={styles.search}
          placeholder="Search instructor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <span>User</span>
          <span>Email</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filtered.map((user) => {
          const status = user.instructorApproval?.status || "Pending";

          return (
            <div key={user._id} className={styles.row}>
              {/* User */}

              <div className={styles.user}>
                <div className={styles.avatar}>{user.firstName.charAt(0)}</div>
                {user.firstName} {user.lastName}
              </div>

              {/* Email */}

              <div className={styles.email}>{user.email}</div>

              {/* Status */}

              <div className={`${styles.status} ${statusClass(status)}`}>
                {status}
              </div>

              {/* Actions */}

              <div className={styles.actions}>
                <button 
                className={styles.approve}
                onClick={() => handleStatusUpdate(user._id, "Approved")}
                >Approve</button>

                <button 
                className={styles.reject}
                 onClick={() => handleStatusUpdate(user._id, "Rejected")}
                >Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

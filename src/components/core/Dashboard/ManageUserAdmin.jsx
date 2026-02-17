import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ManageUserAdmin.module.css";
import { FiSearch, FiMoreVertical } from "react-icons/fi";

export default function ManageUserAdmin() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const users = [
    { id: 1, name: "Prince Kumar", email: "prince@gmail.com", role: "Instructor", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@gmail.com", role: "Student", status: "Active" },
    { id: 3, name: "Alex Brown", email: "alex@gmail.com", role: "Student", status: "Blocked" },
    { id: 4, name: "John Admin", email: "admin@gmail.com", role: "Admin", status: "Active" },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        roleFilter === "All" || user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.gradientGlow}></div>

      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Executive User Management
      </motion.h1>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={styles.filter}
        >
          <option>All</option>
          <option>Student</option>
          <option>Instructor</option>
          <option>Admin</option>
        </select>
      </div>

      {/* Table */}
      <motion.div
        className={styles.tableContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.tableHeader}>
          <span>User</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span></span>
        </div>

        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            className={styles.row}
            whileHover={{ scale: 1.01 }}
          >
            <div className={styles.userCell}>
              <div className={styles.avatar}>
                {user.name.charAt(0)}
              </div>
              <span>{user.name}</span>
            </div>

            <span className={styles.email}>{user.email}</span>

            <span className={`${styles.roleBadge} ${styles[user.role]}`}>
              {user.role}
            </span>

            <span className={styles.statusWrapper}>
              <span className={`${styles.statusDot} ${styles[user.status]}`}></span>
              {user.status}
            </span>

            <span className={styles.action}>
              <FiMoreVertical />
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

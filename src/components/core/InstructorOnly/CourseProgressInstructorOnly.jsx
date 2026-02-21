import React, { useMemo, useState } from "react";
import styles from "./CourseProgressInstructorOnly.module.css";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { VscGraph, VscShield, VscStarFull } from "react-icons/vsc";

export default function CourseProgressInstructorOnly() {
  const [selectedCourse, setSelectedCourse] = useState("React Mastery");

  // Temporary Course Data (Replace with API Later)
  const courses = [
    { name: "React Mastery", students: 120, completion: 78 },
    { name: "Node.js Advanced", students: 95, completion: 64 },
    { name: "System Design Pro", students: 60, completion: 82 },
  ];

  const performanceData = [
    { month: "Jan", progress: 30 },
    { month: "Feb", progress: 45 },
    { month: "Mar", progress: 60 },
    { month: "Apr", progress: 75 },
    { month: "May", progress: 82 },
  ];

  const leaderboard = [
    { name: "Aman Verma", progress: 98 },
    { name: "Riya Sharma", progress: 92 },
    { name: "Kunal Singh", progress: 89 },
    { name: "Anjali Rao", progress: 85 },
  ];

  const totalStudents = useMemo(
    () => courses.reduce((acc, c) => acc + c.students, 0),
    [courses]
  );

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>
            <VscGraph /> Course Performance
          </h1>
          <span className={styles.badge}>
            <VscShield /> Instructor Only
          </span>
        </div>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className={styles.dropdown}
        >
          {courses.map((course) => (
            <option key={course.name}>{course.name}</option>
          ))}
        </select>
      </motion.div>

      {/* KPI CARDS */}
      <div className={styles.cards}>
        <motion.div whileHover={{ scale: 1.05 }} className={styles.card}>
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className={styles.card}>
          <h3>Avg Completion</h3>
          <p>75%</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className={styles.card}>
          <h3>Top Performer</h3>
          <p>
            <VscStarFull /> Aman Verma
          </p>
        </motion.div>
      </div>

      {/* CHART */}
      <motion.div
        className={styles.chartCard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Performance Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#7c3aed"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* LEADERBOARD */}
      <motion.div
        className={styles.leaderboard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Top Students</h2>
        {leaderboard.map((student, index) => (
          <div key={index} className={styles.studentRow}>
            <span>{student.name}</span>
            <span>{student.progress}%</span>
          </div>
        ))}
      </motion.div>

      {/* AI INSIGHTS */}
      <motion.div
        className={styles.aiCard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>AI Insights</h2>
        <p>
          Completion rate increased by <strong>12%</strong> this month.
          Students struggle most in <strong>Advanced Hooks</strong>.
        </p>
      </motion.div>
    </div>
  );
}

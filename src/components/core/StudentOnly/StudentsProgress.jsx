import { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { VscVerified } from "react-icons/vsc";
import styles from "./StudentsProgress.module.css";
import usePageTitle from "../../../services/Oprations/Title/Title";

export default function StudentsProgress() {
  usePageTitle("Student Progress")
  // TEMP DATA (replace with API later)
  const students = [
    { name: "Prince Kumar", progress: 85 },
    { name: "Jane Smith", progress: 62 },
    { name: "Alex Brown", progress: 45 },
    { name: "John Carter", progress: 95 },
  ];

  const stats = useMemo(() => {
    const avg =
      students.reduce((acc, cur) => acc + cur.progress, 0) /
      students.length;

    const completed = students.filter((s) => s.progress >= 80).length;

    return {
      average: avg.toFixed(1),
      completionRate: ((completed / students.length) * 100).toFixed(0),
      total: students.length,
    };
  }, [students]);

  const topPerformer = students.reduce((a, b) =>
    a.progress > b.progress ? a : b
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Student Performance</h1>

        <div className={styles.badge}>
          <VscVerified />
          Instructor Only
        </div>
      </div>

      {/* KPI CARDS */}
      <div className={styles.kpiGrid}>
        <motion.div whileHover={{ scale: 1.05 }} className={styles.kpiCard}>
          <h3>Average Progress</h3>
          <p>{stats.average}%</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className={styles.kpiCard}>
          <h3>Completion Rate</h3>
          <p>{stats.completionRate}%</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className={styles.kpiCard}>
          <h3>Total Students</h3>
          <p>{stats.total}</p>
        </motion.div>
      </div>

      {/* TOP PERFORMER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.topCard}
      >
        <h2>🏆 Top Performer</h2>
        <div className={styles.topContent}>
          <div className={styles.circle}>
            <svg viewBox="0 0 36 36">
              <path
                className={styles.bg}
                d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
              />
              <path
                className={styles.progress}
                strokeDasharray={`${topPerformer.progress}, 100`}
                d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
              />
            </svg>
            <span>{topPerformer.progress}%</span>
          </div>

          <div>
            <h3>{topPerformer.name}</h3>
            <p>Outstanding learning performance</p>
          </div>
        </div>
      </motion.div>

      {/* BAR CHART */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.chartCard}
      >
        <h2>Student Progress Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={students}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Bar
              dataKey="progress"
              radius={[8, 8, 0, 0]}
              fill="url(#colorGradient)"
            />
          </BarChart>
        </ResponsiveContainer>

        <svg width="0" height="0">
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

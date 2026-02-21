import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  VscGraph,
  VscAdd,
  VscCloudDownload,
  VscCalendar,
} from "react-icons/vsc";
import jsPDF from "jspdf";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import styles from "./RevenueAndExpense.module.css";

export default function RevenueAndExpense() {
  const [monthFilter, setMonthFilter] = useState("All");

  const [transactions, setTransactions] = useState([
    { title: "Course Sales", type: "Revenue", date: "2026-05-12", amount: 185000 },
    { title: "Server Infrastructure", type: "Expense", date: "2026-05-10", amount: -42000 },
    { title: "Corporate Plan Upgrade", type: "Revenue", date: "2026-05-08", amount: 96000 },
    { title: "Marketing Campaign", type: "Expense", date: "2026-04-05", amount: -53000 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Revenue", amount: "" });

  // ================= FILTER =================
  const filteredTransactions = useMemo(() => {
    if (monthFilter === "All") return transactions;
    return transactions.filter((t) =>
      t.date.includes(monthFilter)
    );
  }, [monthFilter, transactions]);

  // ================= SUMMARY =================
  const summary = useMemo(() => {
    const revenue = filteredTransactions
      .filter((t) => t.amount > 0)
      .reduce((a, b) => a + b.amount, 0);

    const expense = filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((a, b) => a + b.amount, 0);

    const tax = revenue * 0.18; // 18% auto tax
    const profit = revenue - Math.abs(expense) - tax;

    return {
      revenue,
      expense: Math.abs(expense),
      tax,
      profit,
    };
  }, [filteredTransactions]);

  // ================= AI FORECAST =================
  const forecast = useMemo(() => {
    return Math.round(summary.profit * 1.12); // 12% projected growth
  }, [summary]);

  // ================= GRAPH DATA =================
  const chartData = filteredTransactions.map((t) => ({
    date: t.date,
    value: t.amount,
  }));

  function addTransaction() {
    if (!form.title || !form.amount) return;

    const newTransaction = {
      title: form.title,
      type: form.type,
      date: new Date().toISOString().split("T")[0],
      amount:
        form.type === "Revenue"
          ? Number(form.amount)
          : -Number(form.amount),
    };

    setTransactions([newTransaction, ...transactions]);
    setShowModal(false);
    setForm({ title: "", type: "Revenue", amount: "" });
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.text("Executive Financial Report", 14, 20);
    filteredTransactions.forEach((t, i) => {
      doc.text(
        `${t.title} | ${t.type} | ₹${t.amount}`,
        14,
        30 + i * 10
      );
    });
    doc.save("financial_report.pdf");
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.glowIcon}>
            <VscGraph />
          </div>
          <h1>Revenue & Expense</h1>
          <span className={styles.ceoBadge}>CEO ONLY</span>
        </div>

        <div className={styles.actions}>
  <div className={styles.toolbarGroup}>
    <select
      onChange={(e) => setMonthFilter(e.target.value)}
      className={styles.monthFilter}
    >
      <option value="All">All Months</option>
      <option value="2026-05">May 2026</option>
      <option value="2026-04">April 2026</option>
    </select>

    <button
      onClick={() => setShowModal(true)}
      className={styles.addBtn}
    >
      + Add
    </button>

    <button
      onClick={exportPDF}
      className={styles.exportBtn}
    >
      ⬇ Export
    </button>
  </div>
</div>

      </div>

      {/* SUMMARY CARDS */}
      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <h4>Total Revenue</h4>
          <p className={styles.green}>₹{summary.revenue.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h4>Total Expense</h4>
          <p className={styles.red}>₹{summary.expense.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h4>Auto Tax (18%)</h4>
          <p className={styles.orange}>₹{summary.tax.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h4>Net Profit</h4>
          <p className={styles.gold}>₹{summary.profit.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h4>AI Forecast</h4>
          <p className={styles.blue}>₹{forecast.toLocaleString()}</p>
        </div>
      </div>

      {/* LIVE GRAPH */}
      <motion.div
        className={styles.chartWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ r: 5 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* TABLE */}
      <div className={styles.table}>
        {filteredTransactions.map((item, index) => (
          <div key={index} className={styles.row}>
            <div>{item.title}</div>
            <div>{item.date}</div>
            <div
              className={
                item.amount > 0
                  ? styles.green
                  : styles.red
              }
            >
              {item.amount > 0 ? "+" : "-"} ₹
              {Math.abs(item.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h2>Add Transaction</h2>

            <input
              placeholder="Transaction Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option>Revenue</option>
              <option>Expense</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <div className={styles.modalActions}>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button onClick={addTransaction}>
                Add
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

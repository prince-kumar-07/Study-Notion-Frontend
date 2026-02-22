import React, { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import styles from "./InvoiceStudent.module.css";
import usePageTitle from "../../../services/Oprations/Title/Title";
import { formatINR } from "../../../services/Oprations/formatCurrency";

const tempInvoices = [
  {
    id: "INV-001",
    course: "Complete Python Bootcamp",
    date: "12 May 2024",
    amount: 1999,
    status: "Paid",
  },
  {
    id: "INV-002",
    course: "React Mastery",
    date: "22 June 2024",
    amount: 2499,
    status: "Paid",
  },
];

function InvoiceStudent() {
  usePageTitle("Invoice")
  const totalSaved = useMemo(() => {
    return tempInvoices.reduce((acc, item) => acc + item.amount, 0);
  }, []);

  const downloadPDF = (invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("StudyNotion Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice.id}`, 20, 40);
    doc.text(`Course: ${invoice.course}`, 20, 50);
    doc.text(`Date: ${invoice.date}`, 20, 60);
    doc.text(`Amount: ₹${invoice.amount}`, 20, 70);
    doc.save(`${invoice.id}.pdf`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Invoices</h1>

      {/* Analytics Cards */}
      <div className={styles.analyticsGrid}>
        <motion.div
          className={styles.analyticsCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>Total Saved</p>
          <h2>₹{formatINR(totalSaved)}</h2>
          <span>Through course bundles & offers</span>
        </motion.div>

        <motion.div
          className={styles.analyticsCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>Total Invoices</p>
          <h2>{tempInvoices.length}</h2>
          <span>Successful transactions</span>
        </motion.div>

        <motion.div
          className={styles.analyticsCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>Status</p>
          <h2>Active</h2>
          <span>All courses unlocked</span>
        </motion.div>
      </div>

      {/* Invoice Table */}
      {tempInvoices.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No Invoices Found</h3>
          <p>You haven’t purchased any courses yet.</p>
        </div>
      ) : (
        <div className={styles.invoiceList}>
          {tempInvoices.map((invoice) => (
            <motion.div
              key={invoice.id}
              className={styles.invoiceCard}
              whileHover={{ scale: 1.01 }}
            >
              <div className={styles.left}>
                <h3>{invoice.course}</h3>
                <p>{invoice.date}</p>
              </div>

              <div className={styles.right}>
                <span className={styles.amount}>
                  ₹{formatINR(invoice.amount)}
                </span>

                <button
                  className={styles.downloadBtn}
                  onClick={() => downloadPDF(invoice)}
                >
                  Download PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InvoiceStudent;

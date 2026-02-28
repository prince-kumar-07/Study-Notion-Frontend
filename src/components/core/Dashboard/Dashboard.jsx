import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../Dashboard/Sidebar";
import styles from "./Dashboard.module.css";
import PageTransition from "../Common/PageTransition";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.dashboard}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={styles.main}>
        {!isOpen && (
          <button className={styles.menuBtn} onClick={() => setIsOpen(true)}>
            ☰
          </button>
        )}

        <div className={styles.contentArea}>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
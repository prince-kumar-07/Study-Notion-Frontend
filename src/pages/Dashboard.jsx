import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../components/core/Dashboard/Sidebar";
import styles from "./Dashboard.module.css";
import PageTransition from "../components/core/Common/PageTransition";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.dashboard}>
      
      {/* Hamburger Button (Mobile Only) */}
      <button
        className={styles.menuBtn}
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar stays STATIC */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Animate only content */}
      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Dashboard;

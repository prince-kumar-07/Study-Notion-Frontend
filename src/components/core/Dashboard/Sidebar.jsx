import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  VscAccount,
  VscBook,
  VscAdd,
  VscSettingsGear,
  VscSignOut,
  VscClose,
  VscGraph 
} from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi"
import { VscShield } from "react-icons/vsc";
import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import {logout}  from "../../../services/Oprations/Auth";


function Sidebar({ isOpen, setIsOpen }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
   
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Get user from redux OR fallback to localStorage
  const { user } = useSelector((state) => state.profile) || {};
  const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

  const role = user?.accountType || storedUser?.accountType;

  const handleLogout = () => {
  logout(dispatch);
  setShowLogoutModal(false)
  navigate("/")
};

  // Role based links
  const sidebarConfig = {
    Student: [
      { name: "My Courses", path: "/dashboard//mycourses", icon: <VscBook /> },
      { name: "Invoices", path: "/dashboard/invoices", icon: <VscBook /> },
      { name: "Cart", path: "/dashboard/cart", icon: <FiShoppingCart /> },
    ],
    Instructor: [
      { name: "My Courses", path: "/dashboard/my-courses", icon: <VscBook /> },
      { name: "Add Course", path: "/dashboard/add-course", icon: <VscAdd /> },
      {
        name: "Student Performance",
        path: "/dashboard/student-performance",
        icon: <VscGraph />,
      },
       {
        name: "Course Performance",
        path: "/dashboard/course-performance",
        icon: <VscGraph />,
      },
      
    ],
    Admin: [
      {
        name: "Manage Users",
        path: "/dashboard/manage-users",
        icon: <VscAccount />,
      },
      {
        name: "Privilege Escalation",
        path: "/dashboard/upgrade-to-admin",
        icon: <VscShield />,
      },
      {
        name: "Financial Overview",
        path: "/dashboard/revenue-and-expense",
        icon: <VscGraph />,
      },
    ],
  };

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
        
        {/* Mobile Close */}
        <div className={styles.mobileHeader}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            <VscClose size={22} />
          </button>
        </div>

        {/* Top Section */}
        <div>
          <div className={styles.heading}>Dashboard</div>

          <div className={styles.links}>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={() => setIsOpen(false)}
            >
              <VscAccount className={styles.icon} />
              My Profile
            </NavLink>

            {sidebarConfig[role]?.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomLinks}>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={() => setIsOpen(false)}
          >
            <VscSettingsGear className={styles.icon} />
            Settings
          </NavLink>

          <button
            className={styles.link}
            onClick={() => setShowLogoutModal(true)}
          >
            <VscSignOut className={styles.icon} />
            Logout
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className={styles.confirmBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;

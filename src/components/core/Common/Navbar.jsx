import React, { useEffect, useRef, useState} from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaChevronDown, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import logo from "../../../../assets/Logo/Logo-Full-Light.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import {logout} from "../../../services/Oprations/Auth"
import { useDispatch } from "react-redux";


const Navbar = () => {
   const { totalItem } = useSelector((state) => state.cart);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  // const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const dropdownRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  // const totalItem = useSelector((state) => state.cart?.totalItem || 0);

  // ================= FETCH CATEGORIES =================
  async function fetchSublinks() {
    try {
      //  console.log("hello")
      const result = await apiConnector(
        "GET",
        categories.CATEGORIES_API
      );
    //  console.log("hi////////////////")
      const namesArray =
        result?.data?.allCategories?.map((item) => item.name) || [];

      setSubLinks(namesArray);
      localStorage.setItem("category", JSON.stringify(result?.data?.allCategories));
    } catch (error) {
      toast.error("Error fetching categories");
    }
  }

  useEffect(() => {
    fetchSublinks();

  }, []);

  // ================= CLOSE DROPDOWN ON OUTSIDE CLICK =================
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);


  function handleLogout(){
    
    logout(dispatch)
    navigate("/")
  }

  function handleMyProfileClick(){
    navigate("dashboard/profile")
    setProfileOpen(false)

  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          {/* LOGO */}
          <div className={styles.logoSection}>
            <img
              src={logo}
              alt="StudyNotion"
              className={styles.logo}
              onClick={() => navigate("/")}
            />
          </div>

          {/* ================= DESKTOP LINKS ================= */}
          <ul className={styles.navLinks}>
            <li onClick={() => navigate("/")}>Home</li>

            {/* CLICK DROPDOWN */}
            <li className={styles.catalogWrapper} ref={dropdownRef}>
              <div
                className={styles.catalog}
                onClick={() => setDropdown(!dropdown)}
              >
                Catalog <FaChevronDown />
              </div>

              {dropdown && (
                <div className={styles.dropdown}>
                  {subLinks.map((name) => (
                    <div key={name} className={styles.dropdownItem}>
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li onClick={() => navigate("/aboutus")}>About Us</li>
            <li onClick={() => navigate("/contactus")}>Contact Us</li>
          </ul>

          {/* ================= DESKTOP AUTH ================= */}
          <div className={styles.desktopAuth}>
            {token ? (
              <div className={styles.userSection}>
                {/* <button
                  className={styles.iconBtn}
                  onClick={() => setSearchOpen(true)}
                >
                  <FaSearch />
                </button> */}

                {user?.accountType === "Student" && (
                  <button
                    className={styles.cartBtn}
                    onClick={() => navigate("/dashboard/cart")}
                  >
                    <CiShoppingCart />
                    {totalItem > 0 && (
                      <span className={styles.cartBadge}>{totalItem}</span>
                    )}
                  </button>
                )}

                {/* PROFILE */}
                <div className={styles.profileWrapper}>
                  <button
                    className={styles.iconBtn}
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <CgProfile />
                  </button>

                  {profileOpen && (
                    <div className={styles.profileCard}>
                      <div className={styles.profileTop}>
                        <img
                          src={user?.image || ""}
                          alt="user"
                          className={styles.profileImage}
                        />
                        <div>
                          <h4>{user?.name}</h4>
                          <p>{user?.email}</p>
                        </div>
                      </div>

                      <div className={styles.profileActions}>
                        <button
                          className={styles.profileBtn}
                          onClick={handleMyProfileClick}
                        >
                          My Profile
                        </button>
                        <button
                          className={styles.logoutBtn}
                          onClick={() => handleLogout()}
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.authSection}>
                <button
                  className={styles.loginBtn}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className={styles.signupBtn}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* HAMBURGER */}
          <div
            className={styles.hamburger}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <IoClose /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)}>
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileHeader}>
              <span>Menu</span>
              <IoClose onClick={() => setMobileOpen(false)} />
            </div>

            <ul className={styles.mobileLinks}>
              <li>Home</li>

              {/* MOBILE DROPDOWN CLICK */}
              <li>
                <div
                  onClick={() => setDropdown(!dropdown)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Catalog <FaChevronDown />
                </div>

                {dropdown && (
                  <div
                    style={{
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {subLinks.map((name) => (
                      <div
                        key={name}
                        style={{
                          padding: "6px 0",
                        }}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </li>

              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

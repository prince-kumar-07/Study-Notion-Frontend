import { useEffect, useRef, useState} from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import logo from "../../../../assets/Logo/Logo-Full-Light.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from "../../../services/Oprations/Auth"
import { useDispatch } from "react-redux";
import { getAllCategory, getSeletedCategoryData } from "../../../services/Oprations/Category"


const Navbar = () => {
const { totalItem } = useSelector((state) => state.cart);
const { allCategory } = useSelector((state) => state.category);

  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
  if (!mobileOpen) {
    setMobileDropdown(false);
  }
}, [mobileOpen]);

 useEffect(() => {
   getAllCategory(dispatch);
   setProfileOpen(false)
 }, []);

 function handleSeletedCategoryData(id){
  getSeletedCategoryData(dispatch, id, navigate)
  setDesktopDropdown(false)
 }
 
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target)
  //     ) {
  //       // setDropdown(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () =>
  //     document.removeEventListener(
  //       "mousedown",
  //       handleClickOutside
  //     );
  // }, []);


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
     
      <nav className={styles.navbar}>
        <div className={styles.container}>
         
          <div className={styles.logoSection}>
            <img
              src={logo}
              alt="StudyNotion"
              className={styles.logo}
              onClick={() => navigate("/")}
            />
          </div>

        
          <ul className={styles.navLinks}>
            <li onClick={() => navigate("/")}>Home</li>

            <li className={styles.catalogWrapper} ref={dropdownRef}>
              <div
                className={styles.catalog}
                onClick={() => setDesktopDropdown(!desktopDropdown)}
              >
                Catalog <FaChevronDown />
              </div>

              {desktopDropdown && (
                <div className={styles.dropdown}>
                  {allCategory.map((data) => (
                    <div key={data._id}
                     className={styles.dropdownItem}
                     onClick={() => handleSeletedCategoryData(data._id)}
                     >
                      {data.name}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li onClick={() => navigate("/aboutus")}>About Us</li>
            <li onClick={() => navigate("/contactus")}>Contact Us</li>
          </ul>

         
          <div className={styles.desktopAuth}>
            {token ? (
              <div className={styles.userSection}>
                {user?.accountType === "Student" && (
                  <button
                    className={styles.cartBtn}
                    onClick={() => navigate("/mycart")}
                  >
                    <CiShoppingCart />
                    {totalItem > 0 && (
                      <span className={styles.cartBadge}>{totalItem}</span>
                    )}
                  </button>
                )}

                
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

         
          <div
            className={styles.hamburger}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <IoClose /> : <FaBars />}
          </div>
        </div>
      </nav>

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
              <li
                onClick={() => {
                  navigate("/");
                  setMobileOpen(false);
                }}
              >
                Home
              </li>

              
              <li>
                <div
                  onClick={() => setMobileDropdown(!mobileDropdown)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Catalog <FaChevronDown />
                </div>

                {mobileDropdown && (
                  <div
                    style={{
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {allCategory.map((data) => (
                      <div
                        key={data._id}
                        style={{
                          padding: "6px 0",
                        }}
                      >
                        {data.name}
                      </div>
                    ))}
                  </div>
                )}
              </li>

              <li
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
              >
                Login
              </li>

              <li
                onClick={() => {
                  navigate("/signup");
                  setMobileOpen(false);
                }}
              >
                SignUP
              </li>

              <li
                onClick={() => {
                  navigate("/aboutus");
                  setMobileOpen(false);
                }}
              >
                About Us
              </li>

              <li
                onClick={() => {
                  navigate("/contactus");
                  setMobileOpen(false);
                }}
              >
                Contact Us
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

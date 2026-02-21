import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/core/Common/Navbar";
import Spinner from "./components/core/Others/Spinner";
import PageTransition from "./components/core/Common/PageTransition";

import PrivateRoute from "./services/Oprations/RouteProtection/PrivateRoute";
import PublicRoute from "./services/Oprations/RouteProtection/PublicRoute";
import RoleRoute from "./services/Oprations/RouteProtection/RoleBaseRoute";

import { showSpinner, hideSpinner } from "./Reducer/Slices/SpinnerSlice";

// Lazy imports
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/core/Auth/Login"));
const Signup = lazy(() => import("./components/core/Auth/Signup"));
const ContactUs = lazy(() => import("./components/core/Others/ContactUs"));
const AboutUs = lazy(() => import("./components/core/Common/AboutUs"));
const ChangePassword = lazy(() =>
  import("./components/core/Auth/ChangePassword")
);
const NotFound = lazy(() =>
  import("./components/core/Others/NotFound")
);

const Dashboard = lazy(() => import("./components/core/Dashboard/Dashboard"));

const Profile = lazy(() =>
  import("./components/core/Dashboard/Porfile")
);
const Settings = lazy(() =>
  import("./components/core/Dashboard/Setting")
);

const MyCoursesStudent = lazy(() =>
  import("./components/core/StudentOnly/MyCoursesStudent")
);
const InvoiceStudent = lazy(() =>
  import("./components/core/StudentOnly/InvoiceStudent")
);
const CartStudent = lazy(() =>
  import("./components/core/StudentOnly/CartStudent")
);

const EntireCourse = lazy(() =>
  import("./components/core/StudentOnly/EntireCourse")
);

const ManageUserAdmin = lazy(() =>
  import("./components/core/AdminOnly/ManageUserAdmin")
);

const AdminConatactManager = lazy(() =>
  import("./components/core/AdminOnly/AdminContactManager")
);

const PrivilegeEscalation = lazy(() =>
  import("./components/core/AdminOnly/PrivilegeEscalation")
);
const RevenueAndExpense = lazy(() =>
  import("./components/core/AdminOnly/RevenueAndExpense")
);

const StudentsProgress = lazy(() =>
  import("./components/core/StudentOnly/StudentsProgress")
);
const CourseProgressInstructorOnly = lazy(() =>
  import("./components/core/InstructorOnly/CourseProgressInstructorOnly")
);
const MyCourseInstructorOnly = lazy(() =>
  import("./components/core/InstructorOnly/MyCourseInstructorOnly")
);
const AddCourseInstructorOnly = lazy(() =>
  import("./components/core/InstructorOnly/AddCourseInstructorOnly")
);

const AddSection = lazy(() =>
  import("./components/core/InstructorOnly/AddSection")
);

const AddSubSection = lazy(() =>
  import("./components/core/InstructorOnly/AddSubSection")
);

function App() {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.spinner);
  const location = useLocation();


  useEffect(() => {

    dispatch(showSpinner());

    const handleLoad = () => {
      dispatch(hideSpinner());
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };

  }, [dispatch]);

  return (
    <div>

      <Navbar />

      <Suspense fallback={<Spinner />}>

        <AnimatePresence mode="wait">

          <Routes location={location} key={location.pathname}>

            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            <Route
              path="/learn-more"
              element={
                <PageTransition>
                  <EntireCourse />
                </PageTransition>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <PageTransition>
                    <Login />
                  </PageTransition>
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <PageTransition>
                    <Signup />
                  </PageTransition>
                </PublicRoute>
              }
            />

            <Route
              path="/contactus"
              element={
                <PageTransition>
                  <ContactUs />
                </PageTransition>
              }
            />

            <Route
              path="/aboutus"
              element={
                <PageTransition>
                  <AboutUs />
                </PageTransition>
              }
            />

            <Route
              path="/reset-password/:token/:email"
              element={
                <PageTransition>
                  <ChangePassword />
                </PageTransition>
              }
            />

            <Route
              path="mycart"
              element={
                <RoleRoute allowedRole="Student">
                  <PageTransition>
                    <CartStudent />
                  </PageTransition>
                </RoleRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >

              <Route index element={<Navigate to="profile" replace />} />

              <Route
                path="profile"
                element={
                  <PageTransition>
                    <Profile />
                  </PageTransition>
                }
              />

              <Route
                path="settings"
                element={
                  <PageTransition>
                    <Settings />
                  </PageTransition>
                }
              />

              <Route
                path="invoices"
                element={
                  <RoleRoute allowedRole="Student">
                    <PageTransition>
                      <InvoiceStudent />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="mycourses"
                element={
                  <RoleRoute allowedRole="Student">
                    <PageTransition>
                      <MyCoursesStudent />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="allcourses"
                element={
                  <RoleRoute allowedRole="Student">
                    <PageTransition>
                      <EntireCourse />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="cart"
                element={
                  <RoleRoute allowedRole="Student">
                    <PageTransition>
                      <CartStudent />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="manage-users"
                element={
                  <RoleRoute allowedRole="Admin">
                    <PageTransition>
                      <ManageUserAdmin />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="upgrade-to-admin"
                element={
                  <RoleRoute allowedRole="Admin">
                    <PageTransition>
                      <PrivilegeEscalation />
                    </PageTransition>
                  </RoleRoute>
                }
              />

               <Route
                path="admin-contact-manager"
                element={
                  <RoleRoute allowedRole="Admin">
                    <PageTransition>
                      <AdminConatactManager />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="revenue-and-expense"
                element={
                  <RoleRoute allowedRole="Admin">
                    <PageTransition>
                      <RevenueAndExpense />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="student-performance"
                element={
                  <RoleRoute allowedRole="Instructor">
                    <PageTransition>
                      <StudentsProgress />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="add-Section"
                element={
                  <RoleRoute allowedRole="Instructor">
                    <PageTransition>
                      <AddSection />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="add-subSection"
                element={
                  <RoleRoute allowedRole="Instructor">
                    <PageTransition>
                      <AddSubSection />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="course-performance"
                element={
                  <RoleRoute allowedRole="Instructor">
                    <PageTransition>
                      <CourseProgressInstructorOnly />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="my-courses"
                element={
                  <RoleRoute allowedRole="Instructor">
                    <PageTransition>
                      <MyCourseInstructorOnly />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              <Route
                path="add-course"
                element={
                  <RoleRoute allowedRole="Instructor">
                    <PageTransition>
                      <AddCourseInstructorOnly />
                    </PageTransition>
                  </RoleRoute>
                }
              />

            </Route>

            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />

          </Routes>

        </AnimatePresence>

      </Suspense>

      {/* Global Redux Spinner */}
      {isLoading && <Spinner />}

    </div>
  );
}

export default App;
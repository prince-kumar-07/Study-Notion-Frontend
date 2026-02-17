import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/core/Common/Navbar";
import Spinner from "./components/core/Others/Spinner";
import PageTransition from "./components/core/Common/PageTransition";


import PrivateRoute from "./services/Oprations/RouteProtection/PrivateRoute";
import PublicRoute from "./services/Oprations/RouteProtection/PublicRoute";
import RoleRoute from "./services/Oprations/RouteProtection/RoleBaseRoute";

// 🔥 Lazy Loaded Pages

// Public
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ContactUs = lazy(() => import("./components/core/Others/ContactUs"));
const AboutUs = lazy(() => import("./components/core/Common/AboutUs"));
const ChangePassword = lazy(() =>
  import("./components/core/Others/ChangePassword")
);
const NotFound = lazy(() =>
  import("./components/core/Others/NotFound")
);

// Dashboard Layout
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Dashboard Common
const Profile = lazy(() =>
  import("./components/core/Dashboard/Porfile")
);
const Settings = lazy(() =>
  import("./components/core/Dashboard/Setting")
);

// Student
const MyCoursesStudent = lazy(() =>
  import("./components/core/Dashboard/MyCoursesStudent")
);
const InvoiceStudent = lazy(() =>
  import("./components/core/Dashboard/InvoiceStudent")
);
const CartStudent = lazy(() =>
  import("./components/core/Dashboard/CartStudent")
);

// Admin
const ManageUserAdmin = lazy(() =>
  import("./components/core/Dashboard/ManageUserAdmin")
);
const PrivilegeEscalation = lazy(() =>
  import("./components/core/Dashboard/PrivilegeEscalation")
);
const RevenueAndExpense = lazy(() =>
  import("./components/core/Dashboard/RevenueAndExpense")
);

// Instructor
const StudentsProgress = lazy(() =>
  import("./components/core/Dashboard/StudentsProgress")
);
const CourseProgressInstructorOnly = lazy(() =>
  import("./components/core/Dashboard/CourseProgressInstructorOnly")
);
const MyCourseInstructorOnly = lazy(() =>
  import("./components/core/Dashboard/MyCourseInstructorOnly")
);
const AddCourseInstructorOnly = lazy(() =>
  import("./components/core/Dashboard/AddCourseInstructorOnly")
);

function App() {
  const { isLoading } = useSelector((state) => state.spinner);
  const location = useLocation();

  return (
    <div>
      <Navbar />

      <Suspense fallback={<Spinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* 🌍 Public Routes */}
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
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

            {/* 🔐 Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              {/* Default Redirect */}
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

              {/* 🎓 Student */}
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
                path="cart"
                element={
                  <RoleRoute allowedRole="Student">
                    <PageTransition>
                      <CartStudent />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              {/* 👨‍💼 Admin */}
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
                path="revenue-and-expense"
                element={
                  <RoleRoute allowedRole="Admin">
                    <PageTransition>
                      <RevenueAndExpense />
                    </PageTransition>
                  </RoleRoute>
                }
              />

              {/* 👨‍🏫 Instructor */}
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

            {/* ❌ 404 */}
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

      {isLoading && <Spinner />}
    </div>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route, Link } from "react-router"

import HelloWorld from "./templates/HelloWorld";
import Home from "./templates/Home"
import Crud from "./templates/todo/Crud";
import SchoolPortal from "./templates/SchoolPortal";
import LoginPage from "./projects/school_portal/LoginPage";
import RegisterPage from "./projects/school_portal/registerPage";
import VerifyEmailPage from "./projects/school_portal/VerifyEmailPage";

const App = () => {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello-world" element={<HelloWorld />} />

        {/* Todo Project  */}
        <Route path="/crud" element={<Crud />} />


        {/* Authentication Priject  */}
        <Route path="/school-portal" element={<SchoolPortal />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email/:uid/:token" element={<VerifyEmailPage />} />


        {/* Protected Routes */}
        {/* <Route
          path="/teacher"
          element={
            <PrivateRoute role="teacher">
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student"
          element={
            <PrivateRoute role="student">
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } 
        />*/}
      </Routes>
    </Router>
  )
}

export default App
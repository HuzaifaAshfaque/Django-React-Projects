// TeacherDashboard.js
import React from "react";
import DashboardLayout from "../..//Components/DashboardLayout";
import { Navigate, useNavigate } from "react-router-dom";


const TeacherDashboard = ({ user }) => {
    const navigate = useNavigate()

    const navItems = [
    { label: "Dashboard", path: "/teacher", icon: "bi bi-house-door-fill" },
    { label: "Profile", path: "/teacher/profile", icon: "bi bi-person-circle" },
    { label: "My Classes", path: "/teacher/classes", icon: "bi bi-people-fill" },
    { label: "Assignments", path: "/teacher/assignments", icon: "bi bi-file-earmark-text-fill" },
    { label: "Settings", path: "/teacher/settings", icon: "bi bi-gear-fill" },
  ];

   // 👇 Logout function
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <DashboardLayout title="Teacher Dashboard" navItems={navItems} user={user}>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card glassmorphism card-hover text-white p-4">
            <h5>Total Students</h5>
            <h2 className="fw-bold">124</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card glassmorphism card-hover text-white p-4">
            <h5>Active Classes</h5>
            <h2 className="fw-bold">8</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card glassmorphism card-hover text-white p-4">
            <h5>Pending Reviews</h5>
            <h2 className="fw-bold">15</h2>
          </div>
        </div>
      </div>
        {/* Logout Button */}
      <div className="mt-5 text-end">
        <button
          className="btn btn-danger px-4 py-2 rounded-pill fw-semibold"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;

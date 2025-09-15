// StudentDashboard.js
import React from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import { Navigate, useNavigate } from "react-router-dom";

const StudentDashboard = ({ user }) => {
    const navigate = useNavigate()

  const navItems = [
    { label: "Dashboard", path: "/student", icon: "bi bi-house-door-fill" },
    { label: "Profile", path: "/student/profile", icon: "bi bi-person-circle" },
    { label: "Courses", path: "/student/courses", icon: "bi bi-book-fill" },
    { label: "Messages", path: "/student/messages", icon: "bi bi-chat-dots-fill" },
    { label: "Settings", path: "/student/settings", icon: "bi bi-gear-fill" },
  ];

 const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  return (
    <DashboardLayout title="Student Dashboard" navItems={navItems} user={user}>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card glassmorphism card-hover text-white p-4">
            <h5>Enrolled Courses</h5>
            <h2 className="fw-bold">5</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card glassmorphism card-hover text-white p-4">
            <h5>Assignments</h5>
            <h2 className="fw-bold">12</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card glassmorphism card-hover text-white p-4">
            <h5>Messages</h5>
            <h2 className="fw-bold">3</h2>
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

export default StudentDashboard;

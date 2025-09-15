// SchoolPortal.js
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import StudentDashboard from "../projects/school_portal/StudentDashboard";
import TeacherDashboard from "../projects/school_portal/TeacherDashboard";

const SchoolPortal = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <button
        onClick={logout}
        className="btn btn-danger position-absolute top-0 end-0 m-3"
      >
        Logout
      </button>

      {user.role == 'Teacher' ? (
        <TeacherDashboard user={user} />
      ) : (
        <StudentDashboard user={user} />
      )}
    </>
  );
};

export default SchoolPortal;

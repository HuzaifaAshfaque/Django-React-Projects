import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SchoolPortal = () => {
  const navigate = useNavigate()
  // Check if user and access token exist in localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access");


  if (!user || !token) {
    // User not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  const logout = () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });


  }

  return (
    <div>
      <h1>Welcome to My Portal</h1>
      <p>Hello, {user.username}</p>
      <p>You are a {user.is_teacher ? 'Teacher' : 'Student'}</p>
     
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default SchoolPortal;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../Components/AuthForm";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // 👈 default student
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/user/register/", {
        email,
        username,
        password,
        role, // 👈 send role instead of is_teacher/is_student
      });

      setError(""); // clear any previous errors

      if (res.data.success) {
        setMessage(
          "✅ Registration successful! Check your email to verify your account before logging in."
        );
        setTimeout(() => navigate("/login"), 5000);
      } else {
        setMessage("⚠️ Registration failed: " + res.data.message);
      }
    } catch (err) {
      if (err.response?.data?.email) {
        setError(err.response.data.email[0]);
      } else if (err.response?.data?.username) {
        setError(err.response.data.username[0]);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        title="Create Account"
        onSubmit={handleRegister}
        loading={loading}
        error={error}
        submitText="Register"
        fields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
          },
          {
            id: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter your username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true,
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
          },
          {
            id: "role",
            label: "Role",
            type: "select", // 👈 dropdown for teacher/student
            value: role,
            onChange: (e) => setRole(e.target.value),
            options: [
              { value: "student", label: "Student" },
              { value: "teacher", label: "Teacher" },
              { value: "admin", label: "Admin" }, // optional
            ],
          },
        ]}
        footer={
          <>
            Already have an account? <Link to="/login">Login here</Link>
          </>
        }
        message={message}
      />
    </>
  );
};

export default RegisterPage;

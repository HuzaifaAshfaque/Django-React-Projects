import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthForm from "../../Components/AuthForm";
import { PORTAL_URL } from "../../Config";
import '../../styles/css/Login.css'


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${PORTAL_URL}login/`, { email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/school-portal");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="School Portal Login"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      submitText="Login"
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
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
        },
      ]}
      footer={
        <>
          Don’t have an account? <Link to="/register">Register here</Link>
        </>
      }
    />
  );
};

export default LoginPage;

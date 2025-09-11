// VerifyEmailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/user/verify/${uid}/${token}/`);
        if (res.data.success) {
          setStatus("Your email has been verified! You can now login.");
        } else {
          setStatus(res.data.message);
        }
      } catch (err) {
        setStatus("Verification failed. Link may be expired or invalid.");
      }
    };
    verifyEmail();
  }, [uid, token]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{status}</h2>
      {status.includes("verified") && <Link to="/login">Go to Login</Link>}
    </div>
  );
};

export default VerifyEmailPage;

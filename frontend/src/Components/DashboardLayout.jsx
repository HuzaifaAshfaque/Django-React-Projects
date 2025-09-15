// DashboardLayout.js
import React from "react";
import { NavLink } from "react-router-dom";


const DashboardLayout = ({ title, navItems, children, user }) => {
  return (
    <div 
      className="container-fluid vh-100 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Floating animations */}
      <div 
        className="position-absolute"
        style={{
          top: "-10%",
          right: "-10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite"
        }}
      ></div>
      <div 
        className="position-absolute"
        style={{
          bottom: "-5%",
          left: "-5%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse"
        }}
      ></div>

      {/* Custom CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        .nav-link-modern {
          transition: all 0.3s ease;
          border-radius: 12px;
          margin: 4px 0;
        }
        .nav-link-modern:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }
        .nav-link-modern.active {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-lg-2 col-md-3 p-0">
          <div 
            className="h-100 d-flex flex-column p-3 text-white glassmorphism"
            style={{ borderRadius: "0 25px 25px 0", position: "relative", zIndex: 10 }}
          >
            {/* Brand */}
            <div className="text-center mb-4 pb-3 border-bottom border-light border-opacity-25">
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #ff6b6b, #ffa500)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
              >
                <i className="bi bi-mortarboard-fill fs-3 text-white"></i>
              </div>
              <h5 className="fw-bold mb-0">EduPortal</h5>
              <small className="text-white-50">Learning Hub</small>
            </div>

            {/* Navigation */}
            <nav className="flex-grow-1">
              <ul className="nav nav-pills flex-column">
                {navItems.map((item, idx) => (
                  <li className="nav-item" key={idx}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) =>
                        `nav-link text-white nav-link-modern d-flex align-items-center ${isActive ? "active" : ""}`
                      }
                    >
                      <i className={`${item.icon} me-3 fs-5`}></i>
                      <span className="fw-semibold">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User Info */}
            <div className="mt-auto pt-3 border-top border-light border-opacity-25">
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #667eea, #764ba2)"
                  }}
                >
                  <i className="bi bi-person-fill text-white"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold small">{user?.username || "Guest"}</div>
                  <div className="text-white-50" style={{ fontSize: "0.75rem" }}>
                    {user?.is_teacher ? "Teacher" : "Student"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-10 col-md-9 p-4" style={{ overflowY: "auto", height: "100vh" }}>
          {/* Header */}
          <div className="row mb-4">
            <div className="col">
              <div 
                className="p-4 rounded-4 text-white position-relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}
              >
                <div className="position-relative" style={{ zIndex: 2 }}>
                  <h2 className="fw-bold mb-1">{title}</h2>
                  <p className="mb-0 text-white-75">Welcome back! Here’s what’s happening today.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="position-relative" style={{ zIndex: 1 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

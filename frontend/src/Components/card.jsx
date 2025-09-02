import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card shadow-sm h-100"
      style={{ width: "18rem", cursor: "pointer", transition: "transform 0.2s" }}
      onClick={() => navigateTo && navigate(navigateTo)}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={(e) => { 
            e.stopPropagation(); // prevent double navigation
            navigateTo && navigate(navigateTo);
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default Card;

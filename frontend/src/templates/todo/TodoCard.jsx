import React from "react";

const TodoCard = ({ todo, onEdit, onDelete, completedLabel }) => {
  return (
    <div className={`card mb-3 shadow-sm ${todo.completed ? "bg-success-subtle" : ""}`}>
      <div
        className="card-body"
        style={{ cursor: "pointer" }}
        onClick={() => onEdit(todo)}
      >
        <h6 className="card-title">{todo.title}</h6>
        <p className="card-text small">{todo.description}</p>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center">
        {todo.completed && <span>{completedLabel}</span>}
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;

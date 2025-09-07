import React from "react";
import TodoCard from "./TodoCard";

const TodoList = ({ title, todos, onEdit, onDelete, completedLabel }) => {
  return (
    <div className="col-md-3" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <h5 className="text-white mb-3 text-center">{title}</h5>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          completedLabel={completedLabel}
        />
      ))}
    </div>
  );
};

export default TodoList;

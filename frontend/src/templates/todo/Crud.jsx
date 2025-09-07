import React, { useState, useEffect } from "react";
import axios from "axios";
import GoingToHome from "../../Components/GoingToHome";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { BASE_URL } from "../../Config";

const Crud = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null); // editTodo stores the object to edit
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create / Update todo
  const handleSubmit = async (data) => {
    try {
      if (editTodo) {
        await axios.put(`${BASE_URL}${editTodo.id}/`, data);
        setResponse("Todo updated successfully!");
      } else {
        await axios.post(BASE_URL, data);
        setResponse("Todo created successfully!");
      }
      setError("");
      setEditTodo(null);
      fetchTodos();
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data || "Something went wrong");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await axios.delete(`${BASE_URL}${id}/`);
      setResponse("Todo deleted successfully!");
      fetchTodos();
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data || "Delete failed");
    }
  };

  // Separate completed and incomplete
  const incompleteTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="bg-primary min-vh-100 d-flex flex-column">
      <GoingToHome />

      <section
        className="flex-grow-1 d-flex align-items-start justify-content-center pt-5 mt-5"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="container">
          <div className="row g-4">
            {/* Left - Incomplete Todos */}
            <TodoList
              title="Incomplete Todos"
              todos={incompleteTodos}
              onEdit={setEditTodo}
              onDelete={deleteTodo}
            />

            {/* Center - Form */}
            <div className="col-md-6">
              <TodoForm
                todo={editTodo}
                onCancel={() => setEditTodo(null)}
                onSubmit={handleSubmit}
                response={response}
                error={error}
              />
            </div>

            {/* Right - Completed Todos */}
            <TodoList
              title="Completed Todos"
              todos={completedTodos}
              onEdit={setEditTodo}
              onDelete={deleteTodo}
              completedLabel="This Todo is Completed"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Crud;

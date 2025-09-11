import React, { useState, useEffect } from "react";

const TodoForm = ({ todo, onSubmit, onCancel, response, error }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({ title, description, completed });
    setTitle('')
    setDescription('')
  };

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-3 p-md-4 p-xl-5">
        <div className="mb-5 text-center d-flex justify-content-evenly">
          <h3>{todo ? "Update Todo" : "Create Todo"}</h3>
          {todo && (
            <button
              type="button"
              className="btn btn-sm btn-secondary ms-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row gy-3 overflow-hidden">
            <div className="col-12">
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the title"
                  required
                />
                <label htmlFor="title">Title</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  style={{ height: "100px" }}
                />
                <label htmlFor="description">Description</label>
              </div>
            </div>

            {todo && (
              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                  <label className="form-check-label">Completed</label>
                </div>
              </div>
            )}

            {response && <b className="text-primary d-block">{response}</b>}
            {error && (
              <div className="alert alert-danger mt-2">
                {typeof error === "string"
                  ? error
                  : Object.entries(error).map(([k, v]) => (
                      <p key={k}>
                        {k}: {Array.isArray(v) ? v.join(", ") : v}
                      </p>
                    ))}
              </div>
            )}

            <div className="col-12">
              <div className="d-grid">
                <button className="btn btn-primary btn-lg" type="submit">
                  {todo ? "Update Todo" : "Create Todo"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;

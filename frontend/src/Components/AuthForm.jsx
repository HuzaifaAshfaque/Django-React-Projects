import React from "react";

const AuthForm = ({
  title,
  fields,
  onSubmit,
  loading,
  error,
  message,   // ✅ added here
  submitText,
  footer,
}) => {
  return (
    <div className="login-background d-flex justify-content-center align-items-center vh-100">
      <div className="card login-card shadow p-4">
        <h2 className="text-center mb-4">{title}</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-info">{message}</div>}  {/* ✅ show message */}

        <form onSubmit={onSubmit}>
          {fields.map((field, idx) => {
            if (field.id === "teacherSwitch") {
              return (
                <div className="form-check form-switch mb-3" key={idx}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="teacherSwitch"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                  <label className="form-check-label" htmlFor="teacherSwitch">
                    Teacher?
                  </label>
                </div>
              );
            }

            return (
              <div className="mb-3" key={idx}>
                <label htmlFor={field.id} className="form-label">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  className="form-control"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required}
                />
              </div>
            );
          })}

          <button
            type="submit"
            className="btn btn-login w-100 d-flex justify-content-center align-items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {submitText}...
              </>
            ) : (
              submitText
            )}
          </button>
        </form>

        {footer && <p className="text-center mt-3">{footer}</p>}
      </div>
    </div>
  );
};

export default AuthForm;

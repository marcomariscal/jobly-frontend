import React, { useState } from "react";
import "./LoginForm.css";
import Alert from "./Alert";

const LoginForm = ({ login, register, messages }) => {
  const [view, setView] = useState({
    activeView: "login",
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleViewChange = (e) => {
    const { value } = e.target;

    if (value === "login") {
      setView({ activeView: "login" });
    }
    if (value === "signup") {
      setView({ activeView: "signup" });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // assess the current view and either log in or register accordingly
    if (view.activeView === "login") {
      await login(formData);
    } else if (view.activeView === "signup") {
      await register(formData);
    } else {
      alert("Hmmm, that didn't work. Please try again.");
    }
  };

  const { username, password, first_name, last_name, email } = formData;

  const signupFormRender = (
    <>
      <div className="form-group">
        <div className="input-group-prepend">
          <label htmlFor="first_name">First Name</label>
        </div>
        <input
          type="text"
          className="LoginForm form-control"
          id="first-name"
          name="first_name"
          onChange={handleFormChange}
          value={first_name}
        />
      </div>
      <div className="form-group">
        <div className="input-group-prepend">
          <label htmlFor="last_name">Last Name</label>
        </div>
        <input
          type="text"
          className="LoginForm form-control"
          id="last-name"
          name="last_name"
          onChange={handleFormChange}
          value={last_name}
        />
      </div>
      <div className="form-group">
        <div className="input-group-prepend">
          <label htmlFor="email">Email</label>
        </div>
        <input
          type="email"
          className="LoginForm form-control"
          id="email"
          name="email"
          onChange={handleFormChange}
          value={email}
        />
      </div>
    </>
  );

  const { activeView } = view;

  return (
    <div className="LoginForm container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <div className="d-flex justify-content-end">
        <div className="btn-group">
          <button
            onClick={handleViewChange}
            className={`LoginForm btn btn-primary ${
              activeView === "login" ? "active" : ""
            }`}
            value="login"
          >
            Login
          </button>
          <button
            onClick={handleViewChange}
            className={`LoginForm btn btn-primary ${
              activeView === "signup" ? "active" : ""
            }`}
            value="signup"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="username">Username</label>
              </div>
              <input
                type="text"
                className="LoginForm form-control"
                name="username"
                onChange={handleFormChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="password">Password</label>
              </div>
              <input
                type="password"
                className="LoginForm form-control"
                name="password"
                onChange={handleFormChange}
                value={password}
              />
            </div>
            {activeView === "signup" && signupFormRender}
            {messages.length > 0 && (
              <Alert type={"danger"} messages={messages} />
            )}
            <button className="LoginForm submit btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState, useEffect, useContext } from "react";
import AuthError from "./AuthError";
import "./Profile.css";
import JoblyApi from "./JoblyApi";
import Alert from "./Alert";
import Spinner from "./Spinner";
import UserContext from "./UserContext";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    photo_url: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        photo_url: currentUser.photo_url || "",
        password: "",
      });
    }
  }, [currentUser]);

  const [msgs, setMessages] = useState({ messages: [], type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await JoblyApi.updateUser(
        currentUser.username,
        formData
      );

      // set the form inputs to be the newly updated user info
      setFormData((fData) => ({
        ...fData,
        ...user,
        password: "",
      }));

      setMessages({ messages: ["user updated successfully"], type: "success" });
    } catch (e) {
      setMessages({ messages: e, type: "danger" });
    }
  };

  const { first_name, last_name, email, photo_url, password } = formData;
  const { messages, type } = msgs;

  const render = (
    <div className="Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="username">Username</label>
              </div>
              <p className="form-control-plaintext d-flex justify-content-start">
                {currentUser.username}
              </p>
            </div>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="first_name">First Name</label>
              </div>
              <input
                type="text"
                className="Profile form-control"
                id="first-name"
                name="first_name"
                onChange={handleChange}
                value={first_name}
              />
            </div>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="last_name">Last Name</label>
              </div>
              <input
                type="text"
                className="Profile form-control"
                id="last-name"
                name="last_name"
                onChange={handleChange}
                value={last_name}
              />
            </div>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                className="Profile form-control"
                id="email"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="photo_url">Photo URL</label>
              </div>
              <input
                type="url"
                className="Profile form-control"
                id="photo-url"
                name="photo_url"
                onChange={handleChange}
                value={photo_url}
              />
            </div>
            <div className="form-group">
              <div className="input-group-prepend">
                <label htmlFor="password">Password</label>
              </div>
              <input
                type="password"
                className="Profile form-control"
                id="password"
                name="password"
                onChange={handleChange}
                value={password}
              />
            </div>
            {messages.length > 0 && <Alert type={type} messages={messages} />}
            {password.length > 0 ? (
              <button
                className={`Profile btn btn-primary btn-block mt-4 ${
                  password.length > 0 ? "" : "disabled"
                }`}
              >
                Save Changes
              </button>
            ) : (
              <button
                className={`Profile btn btn-primary btn-block mt-4 ${
                  password.length > 0 ? "" : "disabled"
                }`}
                disabled
              >
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );

  return <div>{render}</div>;
};

export default Profile;

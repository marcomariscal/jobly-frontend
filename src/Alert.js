import React from "react";

const Alert = ({ type, messages }) => {
  return (
    <div className={`alert alert-${type} fade show`} role="alert">
      {messages.map((m) => (
        <p key={m} className="mb-0 small">
          {m}
        </p>
      ))}
    </div>
  );
};

export default Alert;

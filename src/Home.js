import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import "./Home.css";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Home">
      <div className="container text-center">
        <header>
          <h1 className="mb-4 font-weight-bold">Jobly</h1>
        </header>
        <p className="lead">All the jobs in one, convenient place.</p>
        {currentUser ? (
          <h2>{`Welcome ${currentUser.username}!`}</h2>
        ) : (
          <Link to="/login" className="btn btn-primary font-weight-bold">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;

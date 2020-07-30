import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import useLocalStorageState from "./hooks/useLocalStorageState";

import Routes from "./Routes";
import Navigation from "./Navigation";
import JoblyApi from "./JoblyApi";

function App() {
  const [user, setUser] = useState({ currentUser: null });
  const [token, setToken] = useLocalStorageState("token", null);
  const [username, setUsername] = useLocalStorageState("username", null);

  const tokenToStorage = (token) => {
    setToken(token);
  };

  const usernameToStorage = (username) => {
    setUsername(username);
  };

  useEffect(() => {
    async function getUser() {
      const { user } = await JoblyApi.getUser(username);
      setUser({ currentUser: user });
    }
    getUser();
  }, [username, token]);

  const getCurrentUser = (username) => {
    setUsername({ username });
  };

  const { currentUser } = user;

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation
          currentUser={currentUser}
          setToken={setToken}
          setCurrUser={setUser}
        />
        <div className="pt-5">
          <Routes
            tokenToStorage={tokenToStorage}
            getCurrentUser={getCurrentUser}
            currentUser={currentUser}
            usernameToStorage={usernameToStorage}
          />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { decode } from "jsonwebtoken";
import "./App.css";
import Routes from "./Routes";
import Navigation from "./Navigation";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import Spinner from "./Spinner";

export const TOKEN_STORAGE_ID = "token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorageState(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getUser() {
      try {
        const { username } = decode(token);
        const currentUser = await JoblyApi.getUser(username);
        setCurrentUser(currentUser);
      } catch (e) {
        setCurrentUser(null);
      }
    }
    getUser();
  }, [token]);

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={handleLogout} />
          <Routes setToken={setToken} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

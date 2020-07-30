import React from "react";
import "./Navigation.css";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const Navigation = ({ currentUser, setToken, setCurrUser }) => {
  const handleLogout = () => {
    window.localStorage.clear();
    setToken(null);
    setCurrUser({ currentUser: null });
  };

  return (
    <div className="Navigation">
      <Navbar className="Navigation navbar-expand-md">
        <NavbarBrand href="/">Jobly</NavbarBrand>
        {currentUser ? (
          <Nav className="ml-auto">
            <NavItem className="mr-4">
              <NavLink exact to="/companies">
                Companies
              </NavLink>
            </NavItem>
            <NavItem className="mr-4">
              <NavLink exact to="/jobs">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem className="mr-4">
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem className="logout mr-4">
              <NavLink exact to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav className="login ml-auto">
            <NavItem>
              <NavLink className="mr-4" exact to="/login">
                Login
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
};

export default Navigation;

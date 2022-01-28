import React from "react";
import { Nav, Navbar, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const AppNavbar = ({ refreshUsers }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };
  return (
    <div>
      <Navbar color="light" expand="md" light>
        <Link to="/" style={linkStyle} className="me-5" onClick={refreshUsers}>
          User Details
        </Link>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/addUser" style={linkStyle} className="me-5">
              Add a User
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/removeUser" style={linkStyle}>
              Remove a User
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default AppNavbar;

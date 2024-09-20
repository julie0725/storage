import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="조각집 로고" className="logo" />
      <div className="nav-items">
        <Link to="/create-group">
          <button className="create-group-button">그룹 만들기</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

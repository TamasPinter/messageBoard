import React from "react";
import logo from "../assets/logo.jpg";

function NavLinks({ currentPage, handlePageChange }) {
  return (
    <div class="navContainer">
      <img class="logo" src={logo} alt="logo" />
      <ul class="navlinks">
        <li class="nav-item">
          <a
            href="#home"
            onClick={() => handlePageChange("Home")}
            className={currentPage === "Home" ? "nav-link active" : "nav-link"}
          >
            Home
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#signup"
            onClick={() => handlePageChange("SignUp")}
            className={
              currentPage === "SignUp" ? "nav-link active" : "nav-link"
            }
          >
            Sign Up
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#login"
            onClick={() => handlePageChange("LogIn")}
            className={currentPage === "LogIn" ? "nav-link active" : "nav-link"}
          >
            Log In
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#newmessage"
            onClick={() => handlePageChange("NewMessage")}
            className={
              currentPage === "NewMessage" ? "nav-link active" : "nav-link"
            }
          >
            New Message
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#profile"
            onClick={() => handlePageChange("ProfilePage")}
            className={
              currentPage === "ProfilePage" ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavLinks;

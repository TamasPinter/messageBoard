import React, { useState } from "react";
import NavLinks from "./components/NavLinks";
import Footer from "./components/Footer";
import CommentForm from "./components/CommentSection";
import MainPage from "./components/MainPage";
import NewMessage from "./components/NewMessageForm";
import ProfilePage from "./components/ProfilePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

export default function HomeContainer() {
  const [currentPage, setCurrentPage] = useState("MainPage");

  const renderPage = () => {
    if (currentPage === "MainPage") {
      return <MainPage />;
    }
    if (currentPage === "SignUp") {
      return <SignUp />;
    }
    if (currentPage === "LogIn") {
      return <LogIn />;
    }
    if (currentPage === "NewMessage") {
      return <NewMessage />;
    }
    if (currentPage === "ProfilePage") {
      return <ProfilePage />;
    }
    if (currentPage === "CommentForm") {
      return <CommentForm />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div class="homeContainer">
      <NavLinks currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </div>
  );
}

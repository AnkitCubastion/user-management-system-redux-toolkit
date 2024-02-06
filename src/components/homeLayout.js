import React from "react";
import Navbar from "./navbar";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;

import React from "react";
import Header from "../components/Home/Header";
import Search from "../components/Home/Search";

// import Header from "../components/home/Header";
// import Footer from "../components/home/Footer";
// import Navbars from "../components/home/Navbars";

export default function LayoutHome({ children }) {
  return (
    <div>
      <Header />

      <div className="ps-5">{children}</div>
      <div className="ps-5"></div>
    </div>
  );
}

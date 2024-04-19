import React from "react";
import Header from "../components/Home/Header";
import FormLogin from "../components/Login/FormLogin";
import Login from "./Login";
import Dashboard from "../components/Home/DashBoard";
import Search from "../components/Home/Search";

export default function Home() {
  return (
    <div>
      <Dashboard />
      <Header />
    </div>
  );
}

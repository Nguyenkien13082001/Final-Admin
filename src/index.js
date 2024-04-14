import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./Pages/Home";
import UserManagementPage from "./Pages/UserManagementPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ClassManagerPage from "./Pages/ClassManagerPage";
import ChapterManagementPage from "./Pages/ChapterManagementPage";
import TopicManagerPage from "./Pages/TopicManagerPage";
import QuestionManagerPage from "./Pages/QuestionManagerPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="admin/home" element={<Home />} />
        <Route path="admin/UserManagement" element={<UserManagementPage />} />
        <Route path="admin/ClassManager" element={<ClassManagerPage />} />
        <Route
          path="admin/ChapterManagement"
          element={<ChapterManagementPage />}
        />
        <Route path="admin/TopicManagement" element={<TopicManagerPage />} />
        <Route
          path="admin/QuestionManagement"
          element={<QuestionManagerPage />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

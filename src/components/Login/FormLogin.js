import React, { useEffect, useState } from "react";
// import logo from "../../img/logoE.png";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import "./Login.css";

function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/login", formData);
      console.log("login", response);
      if (response.access_token !== "") {
        localStorage.setItem("token", response.access_token);
        // localStorage.setItem("role", response.role);
        navigate("/admin/home");
        toast.success("Login successfully!");
      } else {
        toast.error("Email or Password incorrect!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container login-container">
        <form onSubmit={handleLoginSubmit}>
          {/* <img style={{ width: "80px", height: "80px" }} src={logo} alt="" /> */}
          <h2 style={{ color: "Highlight" }}>Admin Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="btnlogin">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;

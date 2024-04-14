import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import logo from "../../Image/logoE.png";
import { SiGoogleclassroom } from "react-icons/si";
import { GrChapterAdd } from "react-icons/gr";
import { MdOutlineTopic } from "react-icons/md";
import { TbMessage2Question } from "react-icons/tb";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    window.location.href = "/";
  };
  return (
    <div className={`header ${isOpen ? "open" : ""}`}>
      <div className="logo">
        <img style={{ width: "70px", height: "70px" }} src={logo} alt="" />
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </div>
      <div className="menu-items">
        <NavItem
          isOpen={isOpen}
          imageSrc=<AiOutlineHome className="seticon" />
          text="Home"
          to="/admin/home"
        />
        <NavItem
          isOpen={isOpen}
          imageSrc=<MdOutlineSupervisorAccount className="seticon" />
          text="Account Manager"
          to="/admin/UserManagement"
        />
        <NavItem
          isOpen={isOpen}
          imageSrc=<SiGoogleclassroom className="seticon" />
          text="Class Manager"
          to="/admin/ClassManager"
        />

        <NavItem
          isOpen={isOpen}
          imageSrc=<GrChapterAdd className="seticon" />
          text="Chapter Manager"
          to="/admin/ChapterManagement"
        />

        <NavItem
          isOpen={isOpen}
          imageSrc=<MdOutlineTopic className="seticon" />
          text="Topic Manager"
          to="/admin/TopicManagement"
        />

        <NavItem
          isOpen={isOpen}
          imageSrc=<TbMessage2Question className="seticon" />
          text="Question Manager"
          to="/admin/QuestionManagement"
        />

        <NavItem
          isOpen={isOpen}
          imageSrc=<AiOutlineLogout className="seticon" />
          text="Logout"
          onClick={handleLogout}
        ></NavItem>
      </div>
    </div>
  );
}

const NavItem = ({ isOpen, imageSrc, text, to, onClick }) => {
  return (
    <div className="nav-item" style={{ cursor: "pointer" }}>
      {isOpen ? (
        <Link to={to} onClick={onClick}>
          {imageSrc}
          <span>{text}</span>
        </Link>
      ) : (
        <Link to={to} onClick={onClick}>
          {imageSrc}
        </Link>
      )}
    </div>
  );
};
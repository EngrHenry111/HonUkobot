import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.clear();

    navigate(
      "/admin/login",
      {
        replace: true,
      }
    );
  };

  return (
    <div className="sidebar">

      <h2>Admin Panel</h2>

      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/leadership">Leadership</Link>
      <Link to="/admin/achievements">Achievements</Link>
      <Link to="/admin/education">Education</Link>
      <Link to="/admin/skills">Skills</Link>
      <Link to="/admin/gallery">Gallery</Link>
      <Link to="/admin/news">News</Link>
      <Link to="/admin/profile">Profile</Link>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
};

export default Sidebar;
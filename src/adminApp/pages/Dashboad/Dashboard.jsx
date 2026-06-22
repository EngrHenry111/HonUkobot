import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    news: [],
    gallery: [],
    achievements: [],
    leadership: [],
    skills: [],
    education: []
  });

  useEffect(() => {
    const fetchAll = async () => {
      const news = await API.get("/news");
      const gallery = await API.get("/gallery");
      const achievements = await API.get("/achievement");
      const leadership = await API.get("/career");
      const skills = await API.get("/skill");
      const education = await API.get("/education");

      setData({
        news: news.data,
        gallery: gallery.data,
        achievements: achievements.data,
        leadership: leadership.data,
        skills: skills.data,
        education: education.data
      });
    };

    fetchAll();
  }, []);

  return (
    <Layout>

      <h2>Admin Overview</h2>

      {/* 🔥 STATS */}
      <div className="stats">

        <div className="card glow">News: {data.news.length}</div>
        <div className="card glow">Gallery: {data.gallery.length}</div>
        <div className="card glow">Achievements: {data.achievements.length}</div>
        <div className="card glow">Leadership: {data.leadership.length}</div>
        <div className="card glow">Skills: {data.skills.length}</div>
        <div className="card glow">Education: {data.education.length}</div>

      </div>

      {/* ⚡ QUICK ACTIONS */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>

        <div className="actions-grid">
          <Link to="/admin/news">➕ Add News</Link>
          <Link to="/admin/gallery">📸 Upload Image</Link>
          <Link to="/admin/leadership">🏛 Add Leadership</Link>
          <Link to="/admin/achievements">🏆 Add Achievement</Link>
          <Link to="/admin/skills">💡 Add Skill</Link>
          <Link to="/admin/education">🎓 Add Education</Link>
        </div>
      </div>

      {/* 📰 RECENT NEWS */}
      <div className="section">
        <h3>Recent News</h3>

        {data.news.slice(0, 3).map(item => (
          <div key={item._id} className="item">
            <h4>{item.title}</h4>
            <p>{item.content?.slice(0, 80)}...</p>
          </div>
        ))}
      </div>

      {/* 🏛 LEADERSHIP */}
      <div className="section">
        <h3>Leadership Timeline</h3>

        {data.leadership.slice(0, 3).map(item => (
          <div key={item._id} className="item">
            <h4>{item.title}</h4>
            <p>{item.startYear} - {item.endYear}</p>
          </div>
        ))}
      </div>

      {/* 📸 GALLERY */}
      <div className="section">
        <h3>Recent Gallery</h3>

        <div className="gallery-preview">
          {data.gallery.slice(0, 4).map(img => (
            <img key={img._id} src={img.image} />
          ))}
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;
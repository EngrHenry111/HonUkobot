import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./About.css"

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/profile").then(res => {
      setProfile(res.data[0]); // 🔥 get latest profile
    });
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <section className="about section">
      <h2>About</h2>

      <h3>{profile.name}</h3>
      <p>{profile.position}</p>
      <p>{profile.bio}</p>

      <h3>Vision</h3>
      <p>{profile.vision}</p>

      <h3>Mission</h3>
      <p>{profile.mission}</p>
    </section>
  );
};

export default About;
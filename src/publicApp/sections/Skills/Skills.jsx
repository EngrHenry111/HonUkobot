import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    API.get("/skill").then((res) => setSkills(res.data));
  }, []);

  return (
    <section className="skills section">
      <div className="container">

        <h2 className="section-title">
          Skills & Competencies
        </h2>

        {skills.map((skill) => (
          <div className="skill-item" key={skill._id}>

            <div className="skill-header">
              <span>{skill.name}</span>
              <span>{skill.percentage}%</span>
            </div>

            <div className="skill-bar">
              <div
                className="skill-progress"
                style={{
                  "--progress": `${skill.percentage}%`,
                  width: `${skill.percentage}%`,
                }}
              ></div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Skills;
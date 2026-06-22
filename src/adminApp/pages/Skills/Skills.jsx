
import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./skills.css";

const SkillsPage = () => {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    name: "",
    percentage: "",
  });

  const [id, setId] = useState(null);

  // Fetch Skills
  const fetchSkills = async () => {
    try {
      const res = await API.get("/skill");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Submit
  const submit = async () => {
    try {
      if (!form.name || !form.percentage) {
        return alert("Please fill all fields");
      }

      if (
        Number(form.percentage) < 0 ||
        Number(form.percentage) > 100
      ) {
        return alert("Percentage must be between 0 and 100");
      }

      if (id) {
        await API.put(`/skill/${id}`, form);

        alert("Skill updated successfully");
      } else {
        await API.post("/skill", form);

        alert("Skill added successfully");
      }

      setForm({
        name: "",
        percentage: "",
      });

      setId(null);

      fetchSkills();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // Delete
  const removeSkill = async (skillId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this skill?"
      );

      if (!confirmDelete) return;

      await API.delete(`/skill/${skillId}`);

      fetchSkills();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit
  const editSkill = (skill) => {
    setForm({
      name: skill.name,
      percentage: skill.percentage,
    });

    setId(skill._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <section className="admin-skills">

        <div className="admin-header">
          <h2>Skills Management</h2>
          <p>
            Add, update and manage chairman skills and competencies.
          </p>
        </div>

        <div className="skill-form">

          <input
            type="text"
            placeholder="Skill Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Percentage (0 - 100)"
            value={form.percentage}
            onChange={(e) =>
              setForm({
                ...form,
                percentage: e.target.value,
              })
            }
          />

          <button onClick={submit}>
            {id ? "Update Skill" : "Add Skill"}
          </button>

        </div>

        <div className="skills-list">

          {data.length === 0 ? (
            <p>No skills added yet.</p>
          ) : (
            data.map((item) => (
              <div
                key={item._id}
                className="skill-card"
              >
                <div className="skill-info">

                  <h4>{item.name}</h4>

                  <span>
                    {item.percentage}%
                  </span>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />

                </div>

                <div className="actions">

                  <button
                    className="edit-btn"
                    onClick={() => editSkill(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeSkill(item._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </section>
    </Layout>
  );
};

export default SkillsPage;


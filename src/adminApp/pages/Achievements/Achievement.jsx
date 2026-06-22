
import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./achievement.css";

const AchievementsPage = () => {

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
  });

  const [id, setId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await API.get("/achievement");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = async () => {
    try {

      if (
        !form.title ||
        !form.year ||
        !form.description
      ) {
        return alert(
          "Please fill all fields"
        );
      }

      if (id) {

        await API.put(
          `/achievement/${id}`,
          form
        );

        alert(
          "Achievement Updated Successfully"
        );

      } else {

        await API.post(
          "/achievement",
          form
        );

        alert(
          "Achievement Added Successfully"
        );
      }

      setForm({
        title: "",
        year: "",
        description: "",
      });

      setId(null);

      fetchData();

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const editAchievement = (item) => {

    setForm({
      title: item.title,
      year: item.year,
      description: item.description,
    });

    setId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const removeAchievement = async (
    achievementId
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this achievement?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/achievement/${achievementId}`
      );

      fetchData();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>

      <section className="admin-achievements">

        <div className="admin-header">

          <h2>
            Achievement Management
          </h2>

          <p>
            Manage chairman awards,
            recognitions and milestones.
          </p>

        </div>

        <div className="achievement-form">

          <input
            type="text"
            placeholder="Achievement Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={(e) =>
              setForm({
                ...form,
                year: e.target.value,
              })
            }
          />

          <textarea
            rows="5"
            placeholder="Achievement Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <button onClick={submit}>
            {id
              ? "Update Achievement"
              : "Add Achievement"}
          </button>

        </div>

        <div className="achievement-list">

          {data.map((item) => (

            <div
              className="achievement-card"
              key={item._id}
            >

              <div className="achievement-top">

                <h3>
                  {item.title}
                </h3>

                <span>
                  {item.year}
                </span>

              </div>

              <p>
                {item.description}
              </p>

              <div className="actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    editAchievement(item)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeAchievement(
                      item._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </Layout>
  );
};

export default AchievementsPage;


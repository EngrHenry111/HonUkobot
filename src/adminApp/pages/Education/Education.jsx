
import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./Educaaton.css";

const EducationPage = () => {

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    school: "",
    degree: "",
    startYear: "",
    endYear: "",
  });

  const [id, setId] = useState(null);

  const fetchData = async () => {
    try {

      const res = await API.get("/education");

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
        !form.school ||
        !form.degree ||
        !form.startYear ||
        !form.endYear
      ) {
        return alert(
          "Please fill all fields"
        );
      }

      if (
        Number(form.endYear) <
        Number(form.startYear)
      ) {
        return alert(
          "End Year cannot be less than Start Year"
        );
      }

      if (id) {

        await API.put(
          `/education/${id}`,
          form
        );

        alert(
          "Education Updated Successfully"
        );

      } else {

        await API.post(
          "/education",
          form
        );

        alert(
          "Education Added Successfully"
        );
      }

      setForm({
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
      });

      setId(null);

      fetchData();

    } catch (error) {
      console.error(error);
    }
  };

  const editEducation = (item) => {

    setForm({
      school: item.school,
      degree: item.degree,
      startYear: item.startYear,
      endYear: item.endYear,
    });

    setId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const removeEducation = async (
    educationId
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this education record?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/education/${educationId}`
      );

      fetchData();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>

      <section className="admin-education">

        <div className="admin-header">

          <h2>
            Education Management
          </h2>

          <p>
            Manage educational background.
          </p>

        </div>

        <div className="education-form">

          <input
            type="text"
            placeholder="Institution"
            value={form.school}
            onChange={(e) =>
              setForm({
                ...form,
                school: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Degree / Qualification"
            value={form.degree}
            onChange={(e) =>
              setForm({
                ...form,
                degree: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Start Year"
            value={form.startYear}
            onChange={(e) =>
              setForm({
                ...form,
                startYear: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="End Year"
            value={form.endYear}
            onChange={(e) =>
              setForm({
                ...form,
                endYear: e.target.value,
              })
            }
          />

          <button onClick={submit}>
            {id
              ? "Update Education"
              : "Add Education"}
          </button>

        </div>

        <div className="education-list">

          {data.map((item) => (

            <div
              className="education-card"
              key={item._id}
            >

              <h3>{item.school}</h3>

              <h4>{item.degree}</h4>

              <p>
                {item.startYear}
                {" - "}
                {item.endYear}
              </p>

              <div className="actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    editEducation(item)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeEducation(
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

export default EducationPage;


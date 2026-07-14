import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./profile.css";

const ProfilePage = () => {

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    name: "",
    position: "",
    bio: "",
    vision: "",
    mission: ""
  });

  const [file, setFile] = useState(null);

  const [id, setId] = useState(null);

  const fetchData = async () => {

    try {

      const res = await API.get("/profile");

      setData(res.data.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load profile.");

    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  const resetForm = () => {

    setForm({
      name: "",
      position: "",
      bio: "",
      vision: "",
      mission: ""
    });

    setFile(null);

    setId(null);

  };

  const submit = async () => {

    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("position", form.position);
      formData.append("bio", form.bio);
      formData.append("vision", form.vision);
      formData.append("mission", form.mission);

      if (file) {
        formData.append("image", file);
      }

      let res;

      if (id) {

        res = await API.put(
          `/profile/${id}`,
          formData
        );

      } else {

        res = await API.post(
          "/profile",
          formData
        );

      }

      alert(res.data.message);

      resetForm();

      fetchData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Operation failed."
      );

    }

  };

  const remove = async (profileId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    if (!confirmDelete) return;

    try {

      const res = await API.delete(
        `/profile/${profileId}`
      );

      alert(res.data.message);

      fetchData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Delete failed."
      );

    }

  };

  const edit = (item) => {

    setForm({
      name: item.name,
      position: item.position,
      bio: item.bio,
      vision: item.vision,
      mission: item.mission
    });

    setId(item._id);

    setFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  return (

    <Layout>

      <section className="admin-profile">

        <h2>Profile Management</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) =>
            setForm({
              ...form,
              position: e.target.value
            })
          }
        />

        <textarea
          rows="5"
          placeholder="Biography"
          value={form.bio}
          onChange={(e) =>
            setForm({
              ...form,
              bio: e.target.value
            })
          }
        />

        <textarea
          rows="5"
          placeholder="Vision"
          value={form.vision}
          onChange={(e) =>
            setForm({
              ...form,
              vision: e.target.value
            })
          }
        />

        <textarea
          rows="5"
          placeholder="Mission"
          value={form.mission}
          onChange={(e) =>
            setForm({
              ...form,
              mission: e.target.value
            })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <div className="profile-buttons">

          <button onClick={submit}>

            {id
              ? "Update Profile"
              : "Create Profile"}

          </button>

          {id && (

            <button
              onClick={resetForm}
            >
              Cancel Edit
            </button>

          )}

        </div>

        <hr />

        <div className="profile-list">

          {data.length === 0 && (

            <p>No profile created yet.</p>

          )}

          {data.map((item) => (

            <div
              className="profile-card"
              key={item._id}
            >

              {item.image?.trim() ? (
  <img
    src={item.image}
    alt={item.name}
    width="120"
  />
) : null}

             

              <h3>{item.name}</h3>

              <p>
                <strong>Position:</strong>{" "}
                {item.position}
              </p>

              <div className="profile-actions">

                <button
                  onClick={() =>
                    edit(item)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    remove(item._id)
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

export default ProfilePage;
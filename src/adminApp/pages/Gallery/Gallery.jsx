
import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./Gallery.css";

const GalleryPage = () => {

  const [events, setEvents] = useState([]);

  const [id, setId] = useState(null);

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    category: "Leadership",
  });

  const fetchData = async () => {

    try {

      const res = await API.get("/gallery");

      const sorted = res.data.sort(
        (a, b) =>
          new Date(b.eventDate) -
          new Date(a.eventDate)
      );

      setEvents(sorted);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = async () => {

    try {

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (file) {
        formData.append("image", file);
      }

      if (id) {

        await API.put(
          `/gallery/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert("Event Updated");

      } else {

        await API.post(
          "/gallery",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert("Event Added");
      }

      setForm({
        title: "",
        description: "",
        eventDate: "",
        location: "",
        category: "Leadership",
      });

      setFile(null);
      setId(null);

      fetchData();

    } catch (error) {
      console.error(error);
    }
  };

  const editEvent = (item) => {

    setForm({
      title: item.title,
      description: item.description,
      eventDate:
        item.eventDate?.split("T")[0],
      location: item.location,
      category: item.category,
    });

    setId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const removeEvent = async (eventId) => {

    const confirmDelete =
      window.confirm(
        "Delete this event?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/gallery/${eventId}`
      );

      fetchData();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>

      <section className="admin-gallery">

        <h2>
          Leadership Moments &
          Achievements
        </h2>

        <div className="gallery-form">

          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            rows="5"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <input
            type="date"
            value={form.eventDate}
            onChange={(e) =>
              setForm({
                ...form,
                eventDate:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location:
                  e.target.value,
              })
            }
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
          >
            <option>Award</option>
            <option>Project</option>
            <option>Community</option>
            <option>Meeting</option>
            <option>Education</option>
            <option>Leadership</option>
          </select>

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <button onClick={submit}>
            {id
              ? "Update Event"
              : "Add Event"}
          </button>

        </div>

        <div className="gallery-list">

          {events.map((item) => (

            <div
              key={item._id}
              className="gallery-card"
            >

              <img
                src={item.image}
                alt={item.title}
              />
888
              <div className="card-content">

                <h3>
                  {item.title}
                </h3>

                <span>
                  {item.category}
                </span>

                <p>
                  {item.location}
                </p>

                <p>
                  {new Date(
                    item.eventDate
                  ).toLocaleDateString()}
                </p>

                <div className="actions">

                  <button
                    onClick={() =>
                      editEvent(item)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      removeEvent(
                        item._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </Layout>
  );
};

export default GalleryPage;


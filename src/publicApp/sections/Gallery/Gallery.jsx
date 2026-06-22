
import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./Gallery.css";

const Gallery = () => {

  const [events, setEvents] =
    useState([]);

  useEffect(() => {

    API.get("/gallery")
      .then((res) => {

        const sorted =
          res.data.sort(
            (a, b) =>
              new Date(
                b.eventDate
              ) -
              new Date(
                a.eventDate
              )
          );

        setEvents(sorted);
      });

  }, []);

  return (
    <section className="gallery section">

      <div className="container">

        <h2>
          Leadership Moments &
          Achievements
        </h2>

        <div className="events-grid">

          {events.map((item) => (

            <div
              className="event-card"
              key={item._id}
            >

              <img
                src={item.image}
                alt={item.title}
                className="event-image"
              />

              <div className="event-content">

                <span className="badge">
                  {item.category}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p className="event-date">

                  {new Date(
                    item.eventDate
                  ).toLocaleDateString()}

                </p>

                <p className="event-location">

                  {item.location}

                </p>

                <p className="event-description">

                  {item.description}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Gallery;


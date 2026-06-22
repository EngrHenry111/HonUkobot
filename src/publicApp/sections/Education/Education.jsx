import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./education.css";

const Education = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    API.get("/education")
      .then((res) => {

        const sorted =
          res.data.sort(
            (a, b) =>
              b.endYear - a.endYear
          );

        setData(sorted);
      });

  }, []);

  return (
    <section className="education section">

      <h2>
        Educational Background
      </h2>

      <div className="education-timeline">

        {data.map((item) => (

          <div
            className="timeline-item"
            key={item._id}
          >

            <div className="timeline-year">
              {item.endYear}
            </div>

            <div className="timeline-content">

              <h3>
                {item.school}
              </h3>

              <h4>
                {item.degree}
              </h4>

              <p>
                {item.startYear}
                {" - "}
                {item.endYear}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Education;
import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./Achievement.css";

const Achievements = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   API.get("/achievement").then(res => setData(res.data));
  // }, []);

  useEffect(() => {
  API.get("/achievement")
    .then((res) => {

      const sorted =
        res.data.sort(
          (a, b) =>
            b.year - a.year
        );

      setData(sorted);
    });
}, []);

  return (
    <section className="achievements">
      <h2>Achievements</h2>

      <div className="cards">
        {data.map(item => (
          <div className="card glass glow" key={item._id}>
            <h3>{item.title}</h3>
            <span>{item.year}</span>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./Leadership.css";

const Leadership = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/career").then(res => setData(res.data));
  }, []);

  return (
    <section id="leadership" className="leadership">
      <h2>Leadership Journey</h2>

      <div className="timeline">
        {data.map((item, i) => (
          <motion.div
            key={item._id}
            className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="timeline-content glass">
              <h3>{item.title}</h3>
              <p>{item.startYear} - {item.endYear}</p>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;
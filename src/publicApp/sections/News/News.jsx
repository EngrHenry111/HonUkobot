import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./News.css";

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/news").then(res => setData(res.data));
  }, []);

  return (
    <section className="news section">
  <h2>Latest News</h2>

  <div className="news-grid">
    {data.map(item => (
      <div key={item._id} className="news-card">
        <img src={item.image} />
        <h3>{item.title}</h3>
        <p>{item.content}</p>
      </div>
    ))}
  </div>
</section>
  );
};

export default News;
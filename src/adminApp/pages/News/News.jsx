import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./News.css"

const NewsPage = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    const res = await API.get("/news");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const submit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (file) formData.append("image", file);

    if (id) {
      await API.put(`/news/${id}`, formData);
      setId(null);
    } else {
      await API.post("/news", formData);
    }

    setForm({ title: "", content: "" });
    setFile(null);
    fetchData();
  };

  const remove = async (id) => {
    await API.delete(`/news/${id}`);
    fetchData();
  };

  const edit = (item) => {
    setForm({ title: item.title, content: item.content });
    setId(item._id);
  };

  return (
      <Layout>
        <section className="admin-news">
      <h2>News Management</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      />

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button onClick={submit}>{id ? "Update" : "Add"}</button>

      {data.map(item => (
        <div key={item._id}>
          <h4>{item.title}</h4>
          <img src={item.image} width="100" />
          <button onClick={() => edit(item)}>Edit</button>
          <button onClick={() => remove(item._id)}>Delete</button>
        </div>
      ))}
      </section>
     </Layout>
  );
};

export default NewsPage;
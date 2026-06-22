import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./Leadership.css"
const LeadershipPage = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  // FETCH
  const fetchData = async () => {
    const res = await API.get("/career");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE / UPDATE
  const submit = async () => {
    if (editingId) {
      await API.put(`/career/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/career", form);
    }

    setForm({ title: "", startYear: "", endYear: "", description: "" });
    fetchData();
  };

  // DELETE
  const remove = async (id) => {
    await API.delete(`/career/${id}`);
    fetchData();
  };

  // EDIT
  const edit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  return (
      <Layout>
        <section className="admin-leadership">
      <h2>Leadership Management</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Start Year"
        value={form.startYear}
        onChange={(e) => setForm({ ...form, startYear: e.target.value })}
      />

      <input
        placeholder="End Year"
        value={form.endYear}
        onChange={(e) => setForm({ ...form, endYear: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button onClick={submit}>
        {editingId ? "Update" : "Add"}
      </button>

      <hr />

      {data.map(item => (
        <div key={item._id}>
          <h4>{item.title}</h4>
          <p>{item.startYear} - {item.endYear}</p>

          <button onClick={() => edit(item)}>Edit</button>
          <button onClick={() => remove(item._id)}>Delete</button>
        </div>
      ))}
      </section>
      </Layout>
  );
};

export default LeadershipPage;
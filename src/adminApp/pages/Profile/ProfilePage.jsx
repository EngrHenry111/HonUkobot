import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./profile.css"
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
    const res = await API.get("/profile");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const submit = async () => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("position", form.position);
  formData.append("bio", form.bio);
  formData.append("vision", form.vision);
  formData.append("mission", form.mission);

  if (file) {
    formData.append("image", file); // 🔥 VERY IMPORTANT
  }

  if (id) {
    await API.put(`/profile/${id}`, formData);
  } else {
    await API.post("/profile", formData);
  }

  fetchData();
};
  // const submit = async () => {
  //   const formData = new FormData();

  //   Object.keys(form).forEach(key => {
  //     formData.append(key, form[key]);
  //   });

  //   if (file) formData.append("image", file);

  //   if (id) {
  //     await API.put(`/profile/${id}`, formData);
  //     setId(null);
  //   } else {
  //     await API.post("/profile", formData);
  //   }

  //   setForm({
  //     name: "",
  //     position: "",
  //     bio: "",
  //     vision: "",
  //     mission: ""
  //   });
  //   setFile(null);

  //   fetchData();
  // };

  const remove = async (id) => {
    await API.delete(`/profile/${id}`);
    fetchData();
  };

  const edit = (item) => {
    setForm(item);
    setId(item._id);
  };

  return (
    <Layout>
      <section className="admin-profile">

      <h2>Profile Management</h2>

      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Position" value={form.position}
        onChange={e => setForm({ ...form, position: e.target.value })} />

      <textarea placeholder="Bio" value={form.bio}
        onChange={e => setForm({ ...form, bio: e.target.value })} />

      <textarea placeholder="Vision" value={form.vision}
        onChange={e => setForm({ ...form, vision: e.target.value })} />

      <textarea placeholder="Mission" value={form.mission}
        onChange={e => setForm({ ...form, mission: e.target.value })} />

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button onClick={submit}>{id ? "Update" : "Create"}</button>

      <hr />

      {data.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.position}</p>

          <button onClick={() => edit(item)}>Edit</button>
          <button onClick={() => remove(item._id)}>Delete</button>
        </div>
      ))}
   
      </section>
    </Layout>
  );
};

export default ProfilePage;
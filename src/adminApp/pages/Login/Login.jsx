import { useState } from "react";
import API from "../../../services/api";
import "./Login.css"
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert("Login failed", error);
    }
  };

  return (
    <div className="login-page">
  <div className="login-box">
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

export default Login;
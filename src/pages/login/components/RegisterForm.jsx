import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    registerType: "",
    email: "",
    username: "",
    password: "",
    idToken: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      setMessage("Registration successful!");
    } catch (err) {
      setMessage("Failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="registerType"
        value={formData.registerType}
        onChange={handleChange}
        placeholder="Register Type"
        required
      />
      <br />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <br />
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <br />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <br />
      <input
        name="idToken"
        value={formData.idToken}
        onChange={handleChange}
        placeholder="ID Token"
      />
      <br />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      // Example API call for authentication
      const response = await axios.post("/api/login", { email, password });

      if (response.status === 200) {
        toast.success("Login successful!");
        // Trigger page refresh
        // window.location.reload();
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <h3>Signin</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button className="btn btn-primary" onClick={login}>
          Submit
        </button>
      </div>
    </>
  );
}

export default Signin;

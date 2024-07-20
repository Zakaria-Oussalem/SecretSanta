import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css";

function CreateSessionPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/user", {
        username: username,
        role: "admin",
      });
      const session_id = data.session;
      console.log("Username:", username);
      console.log("Session ID:", session_id);
      navigate(`/session/${username}/${session_id}`);
    } catch (err) {
      console.error("Error creating session:", err);
      setError("Failed to create session. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>Secret Santa - Session Creation</h1>
        </div>
        <div className="small-box">
          <h3>Choose your name</h3>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="submitForm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default CreateSessionPage;

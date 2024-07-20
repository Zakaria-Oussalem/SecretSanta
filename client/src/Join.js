import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./join.css";

function JoinSessionPage() {
  const [username, setUsername] = useState("");
  const [session_id, setSession] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submitting
    try {
      console.log("Submitting: ", { username, session_id }); // Debugging line
      await axios.post("http://127.0.0.1:5000/user", {
        username: username,
        role: "user",
        session_id: session_id,
      });
      console.log("Username:", username);
      console.log("Session ID:", session_id);
      navigate(`/session/${username}/${session_id}`);
    } catch (err) {
      console.error("Error joining session:", err);
      setError(
        "Failed to join session. Please check the session ID and try again."
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>Secret Santa - Join Session</h1>
        </div>
        <div className="small-box">
          <h3>Submit your name and the session ID</h3>
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
          <label htmlFor="session_id">Session ID</label>
          <input
            type="text"
            name="session_id"
            id="session_id"
            value={session_id}
            onChange={(e) => setSession(e.target.value)}
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

export default JoinSessionPage;

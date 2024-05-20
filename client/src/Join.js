import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function JoinSessionPage() {
  const [username, setUsername] = useState("");
  const [session_id, setSession] = useState("");

  const navigate = useNavigate();
  const navigateToSessionPage = () => {
    navigate(`/session/${username}/${session_id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${"http://127.0.0.1:5000"}/user`, {
        username,
        role: "user",
        session_id,
      });
      console.log(username);
      console.log(session_id);
      navigateToSessionPage();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>Secret Santa - Join Session</h1>
        </div>
        {/* a box h2 title saying Number of players and the entry below it and a submit button on the side * */}
        <div className="small-box">
          <h3>Submit your name and the session Id</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="submitForm">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="players">Session ID</label>
            <input
              type="text"
              name="session ID"
              id="session_id"
              value={session_id}
              onChange={(e) => setSession(e.target.value)}
            />
            <button type="submit" className="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default JoinSessionPage;

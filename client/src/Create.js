import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function CreateSessionPage() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${"http://127.0.0.1:5000"}/user`, {
        username: username,
        role: "admin",
        session: "",
      });
      const session_id = data.session;
      console.log(username);
      console.log(session_id);
      navigate(`/session/${username}/${session_id}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>Secret Santa - Session Creation</h1>
        </div>
        {/* a box h2 title saying Number of players and the entry below it and a submit button on the side * */}
        <div className="small-box">
          <h3>Choose your name</h3>
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
            <button type="submit" className="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default CreateSessionPage;

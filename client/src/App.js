import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import CreateSessionPage from "./CreateSessionPage";

function App() {
  const navigate = useNavigate();

  const navigateToCreateSession = () => {
    // 👇️ navigate to /contacts
    navigate("/CreateSessionPage");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>WELCOME TO SECRET SANTA</h1>
        </div>
        <div className="button-container">
          <button className="button" onClick={navigateToCreateSession}>
            Create a session
          </button>
          <button className="button">Join a session</button>
        </div>
        <Routes>
          <Route path="/CreateSessionPage" element={<CreateSessionPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./attribute.css";

function AttributionPage() {
  const { user_id, session_id } = useParams();
  const [attributed, setAttributed] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttributed = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:5000/attributed/${user_id}`
        );
        console.log("Attributed fetched:", data);
        setAttributed(data.attributed);
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching attributed player:", error);
        setError("Failed to fetch attributed player. Please try again.");
      }
    };
    fetchAttributed();
  }, [user_id]);

  const handleHomeClick = () => {
    navigate("/");
  };

  if (attributed === "" && error === "") {
    return (
      <div className="App">
        <header className="App-header">
          <div className="title-box">
            <h1>Loading ...</h1>
          </div>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="title-box">
            <h1>Error</h1>
          </div>
          <p className="error-message">{error}</p>
          <button className="button" onClick={handleHomeClick}>
            Return to Home
          </button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>SECRET SANTA - Attribution Page</h1>
        </div>
        <h2>{username}, your attributed player is:</h2>
        <div className="attributed-box">
          <h3>{attributed}</h3>
        </div>
        <div className="session-info">
          <h3>Session ID: {session_id}</h3>
          <h3>Thank You For Playing!</h3>
        </div>
      </header>
      <button className="button home-button" onClick={handleHomeClick}>
        Home
      </button>
    </div>
  );
}

export default AttributionPage;

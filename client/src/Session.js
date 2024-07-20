import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./session.css";

function SessionPage() {
  const { username, session_id } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://127.0.0.1:5000/launch", {
        session: session_id,
      });
      console.log("Session launched");
      setIsSubmitting(false);
    } catch (err) {
      console.error("Error launching session:", err);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:5000/session/${session_id}`
        );
        setPlayers(data.users);
        setLoading(false);
        console.log("Players are fetched:", data.users);

        const currentPlayer = data.users.find(
          (player) => player.username === username
        );
        if (currentPlayer && currentPlayer.attributed !== null) {
          navigate(`/attribution/${currentPlayer.id}/${session_id}`);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false);
      }
    };

    fetchPlayers();
    const intervalId = setInterval(fetchPlayers, 5000);

    return () => clearInterval(intervalId);
  }, [session_id, username, navigate]);

  if (loading) {
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

  if (players.length === 0) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="title-box">
            <h1>No players in the session</h1>
          </div>
        </header>
      </div>
    );
  }

  const currentPlayer = players.find((player) => player.username === username);

  if (!currentPlayer) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="title-box">
            <h1>Invalid player</h1>
          </div>
        </header>
      </div>
    );
  }

  const isAdmin = currentPlayer.role === "admin";

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>SECRET SANTA - Waiting Room</h1>
        </div>
        <h2>Welcome, {username}</h2>
        <p className="invite-message">
          Invite your friends to join by sending them the session ID and website
          link.
        </p>
        <div className="info-box">
          <p>
            <strong>Session ID:</strong> {session_id}
          </p>
          <p>
            <strong>Number of players:</strong> {players.length}
          </p>
          <div className="players-list">
            <h3>Players:</h3>
            <ul>
              {players.map((player, i) => (
                <li key={i}>
                  {player.username}{" "}
                  <span className="player-role">({player.role})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isAdmin ? (
          <div className="button-container">
            <button
              type="submit"
              className="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Start Attribution"}
            </button>
          </div>
        ) : (
          <div className="spinner-container">
            <div className="spinner"></div>
            <h3>Waiting for all players to join</h3>
          </div>
        )}
      </header>
    </div>
  );
}

export default SessionPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

function SessionPage() {
  const { username, session_id } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/launch", {
        session: session_id,
      });
      console.log("Session launched");
    } catch (err) {
      console.error("Error launching session:", err);
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
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div>
        <h1>No players in the session</h1>
      </div>
    );
  }

  const currentPlayer = players.find((player) => player.username === username);

  if (!currentPlayer) {
    return (
      <div>
        <h1>Invalid player</h1>
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
        <h2>Welcome {username}</h2>
        <div className="small-box">
          <h3>Session ID: {session_id}</h3>
          <h3>Number of players: {players.length}</h3>
          <h3>Players:</h3>
          <ul>
            {players.map((player, i) => (
              <li key={i}>
                {player.username} role: {player.role}
              </li>
            ))}
          </ul>
          <h3>Invite your friends to join the session</h3>
        </div>
        {isAdmin ? (
          <div className="button-container">
            <button type="submit" className="button" onClick={handleSubmit}>
              Start Attribution
            </button>
          </div>
        ) : (
          <div className="spinner">
            <h3>Waiting for all players to join ...</h3>
          </div>
        )}
      </header>
    </div>
  );
}

export default SessionPage;

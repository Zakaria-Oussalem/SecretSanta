import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SessionPage() {
  const { username, session_id } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await axios.get(
          `http://127.0.0.1:5000/session/${session_id}`
        );
        const players = data.data.users;
        setPlayers(players);
        setLoading(false);
        console.log(players);
        // Process the players data
        // ...
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false);
      }
    };

    fetchPlayers();

    // Then call fetchPlayers every 5 seconds
    const intervalId = setInterval(fetchPlayers, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Use the username, session_id, and players in your session page component
  // ...
  if (loading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }
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
              <li key={i}>{player.username}</li>
            ))}
          </ul>
          <h3>Invite your friends to join the session</h3>
        </div>
        <div className="button-container">
          <button className="button">Start Attribution</button>
        </div>
      </header>
    </div>
  );
}

export default SessionPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function AttributionPage() {
  const { user_id, session_id } = useParams();
  const [attributed, setAttributed] = useState("");
  const [username, setUsername] = useState("");

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
      }
    };
    fetchAttributed();
  }, [user_id]);

  if (attributed === null || attributed === "") {
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
          <h1>SECRET SANTA - Attribution Page</h1>
        </div>
        <h2>{username}, Your attributed player is:</h2>
        <div className="small-box">
          <h3>
            {"-->"} {attributed} {"<--"}
          </h3>
          <h3>Session ID: {session_id}</h3>
          <h3>Thank You For Playing</h3>
        </div>
      </header>
    </div>
  );
}

export default AttributionPage;

import { useNavigate } from "react-router-dom";
import "./App.css";

function HomePage() {
  const navigate = useNavigate();

  const navigateToCreateSession = () => {
    navigate("/create");
  };

  const navigateToJoinSession = () => {
    navigate("/join");
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
          <button className="button" onClick={navigateToJoinSession}>
            Join a session
          </button>
        </div>
      </header>
    </div>
  );
}

export default HomePage;

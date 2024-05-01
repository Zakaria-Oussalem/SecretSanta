import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./homePage";
import CreateSessionPage from "./CreateSessionPage";
import JoinSessionPage from "./JoinSessionPage";
import SessionPage from "./sessionPage";

function App() {
  return (
    <Routes>
      <Route path="/CreateSessionPage" element={<CreateSessionPage />} />
      <Route path="/JoinSessionPage" element={<JoinSessionPage />} />
      <Route
        path="/sessionPage/:username/:session_id"
        element={<SessionPage />}
      />
      <Route path="*" element={<HomePage />} />{" "}
    </Routes>
  );
}

export default App;

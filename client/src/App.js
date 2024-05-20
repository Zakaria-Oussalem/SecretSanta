import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import CreateSessionPage from "./Create";
import JoinSessionPage from "./Join";
import SessionPage from "./Session";
import AttributionPage from "./Attribution";

function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateSessionPage />} />
      <Route path="/join" element={<JoinSessionPage />} />
      <Route path="/session/:username/:session_id" element={<SessionPage />} />
      <Route
        path="/attribution/:user_id/:session_id"
        element={<AttributionPage />}
      />
      <Route path="*" element={<HomePage />} />{" "}
    </Routes>
  );
}

export default App;

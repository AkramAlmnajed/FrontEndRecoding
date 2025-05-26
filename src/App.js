import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ControlPanel from "./pages/ControlPanel";
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage';
import MapPage from "./pages/MapPage";
import PositionPage from "./pages/PositionPage";
import Profile from "./pages/Profile";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import VerificationPage from "./pages/VerificationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/control-panel" element={<ControlPanel />} />

      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Routes>
        <Route path="/resetPass" element={<ResetPasswordPage />} />
      </Routes>
      <Routes>
        <Route path="/position" element={<PositionPage />} />
      </Routes>
      <Routes>
        <Route path="/map" element={<MapPage />} />
      </Routes>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Routes>
        <Route path="/verify" element={<VerificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;

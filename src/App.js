import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
          <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

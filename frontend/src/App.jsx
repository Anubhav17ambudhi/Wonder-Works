import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import Citizen from "./pages/Citizen";
import Supervisor from "./pages/Supervisior";
import Mayor from "./pages/Mayor";
import Login from "./pages/Login";           // your existing form page
import LoginChoice from "./pages/LoginChoice"; // ⬅️ new

function App() {
  return (
    <Router>
      <nav style={{ background: "#333", padding: "10px" }}>
        <Link to="/" style={{ color: "white", margin: "10px" }}>Home</Link>
        <Link to="/complaints" style={{ color: "white", margin: "10px" }}>Complaints</Link>
        <Link to="/login" style={{ color: "white", margin: "10px" }}>Login</Link>
      </nav>

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/login" element={<LoginChoice />} />     {/* ⬅️ role selection */}
          <Route path="/login/:role" element={<Login />} />     {/* ⬅️ actual form */}
          <Route path="/citizen" element={<Citizen />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/mayor" element={<Mayor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

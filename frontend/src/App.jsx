import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import Citizen from "./pages/Citizen";
import Supervisor from "./pages/Supervisior";
import Mayor from "./pages/Mayor";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/citizen" element={<Citizen />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/mayor" element={<Mayor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

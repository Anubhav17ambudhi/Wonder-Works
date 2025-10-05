import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#333", padding: "10px" }}>
      <Link to="/" style={{ color: "white", margin: "10px" }}>Home</Link>
      <Link to="/complaints" style={{ color: "white", margin: "10px" }}>Complaints</Link>
      <Link to="/citizen" style={{ color: "white", margin: "10px" }}>Citizen</Link>
      <Link to="/supervisor" style={{ color: "white", margin: "10px" }}>Supervisor</Link>
      <Link to="/mayor" style={{ color: "white", margin: "10px" }}>Mayor</Link>
    </nav>
  );
}

export default Navbar;

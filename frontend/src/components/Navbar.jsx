import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#333", padding: "10px" }}>
      <Link to="/" style={{ color: "white", margin: "10px" }}>Home</Link>
      <Link to="/complaints" style={{ color: "white", margin: "10px" }}>Complaints</Link>
      <Link to="/login" style={{ color: "white", margin: "10px" }}>Login</Link>
    </nav>
  );
}

export default Navbar;

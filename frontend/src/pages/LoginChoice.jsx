import { Link } from "react-router-dom";

export default function LoginChoice() {
  return (
    <div>
      <h2>Choose your role to log in</h2>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login/citizen">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Login as Citizen
          </button>
        </Link>
        <Link to="/login/supervisor">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Login as Supervisor
          </button>
        </Link>
        <Link to="/login/mayor">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Login as Mayor
          </button>
        </Link>
      </div>

      <div style={{ marginTop: 20, fontSize: 14, color: "#666" }}>
        <p><b>Demo accounts</b></p>
        <p>Citizen: citizen@city.com / 1234</p>
        <p>Supervisor: supervisor@city.com / 1234</p>
        <p>Mayor: mayor@city.com / 1234</p>
      </div>
    </div>
  );
}

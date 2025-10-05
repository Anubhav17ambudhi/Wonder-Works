import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";

const DEMO_USERS = {
  citizen:    { email: "citizen@city.com",    password: "1234", name: "Test Citizen" },
  supervisor: { email: "supervisor@city.com", password: "1234", name: "Area Supervisor" },
  mayor:      { email: "mayor@city.com",      password: "1234", name: "City Mayor" },
};

export default function Login() {
  const { role } = useParams();               // citizen | supervisor | mayor
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const roleLabel = useMemo(() => {
    const x = String(role || "").toLowerCase();
    if (x === "citizen" || x === "supervisor" || x === "mayor") return x;
    return "citizen";
  }, [role]);

  const onSubmit = (e) => {
    e.preventDefault();
    const demo = DEMO_USERS[roleLabel];

    if (email === demo.email && password === demo.password) {
      localStorage.setItem("gr_user", JSON.stringify({ role: roleLabel, email, name: demo.name }));
      navigate(`/${roleLabel}`);
    } else {
      setErr("Invalid credentials for " + roleLabel);
    }
  };

  return (
    <div>
      <h2>Login — {roleLabel[0].toUpperCase() + roleLabel.slice(1)}</h2>

      {/* Back to Home Link */}
      <div style={{ marginBottom: "15px" }}>
        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Home
        </Link>
      </div>

      <form onSubmit={onSubmit} style={{ maxWidth: 380 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "8px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "8px 0" }}
        />
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <button type="submit" style={{ padding: "10px 18px" }}>Login</button>
      </form>

      <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
        <p>Demo → {DEMO_USERS[roleLabel].email} / {DEMO_USERS[roleLabel].password}</p>
      </div>
    </div>
  );
}

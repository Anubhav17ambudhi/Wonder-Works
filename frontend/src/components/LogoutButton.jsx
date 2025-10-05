import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gr_user");  // clear session
    navigate("/");  // go back to Home
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "red",
        color: "white",
        padding: "8px 15px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "15px"
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;

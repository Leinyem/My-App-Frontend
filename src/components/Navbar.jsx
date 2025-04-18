import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  console.log("Navbar - isLoggedIn:", isLoggedIn);

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#eee",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>FABER'S PROJECT 101</h1>

      {isLoggedIn && (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/profile">
            <button style={{ backgroundColor: "orange" }}>Profile</button>
          </Link>
          <button style={{ backgroundColor: "red" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1>FABER'S PROJECT 101</h1>

      {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : undefined}
    </nav>
  );
};

export default Navbar;

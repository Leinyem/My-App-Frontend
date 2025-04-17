import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleSignup(event) {
    event.preventDefault();
    const userToCreateInDB = { username, email, password };
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signUp`, userToCreateInDB)
      .then((res) => {
        console.log("user created in the DB", res);
        nav("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="signup-page">
      <h3>Sign Up with us</h3>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            placeholder="enter a username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            placeholder="enter an email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="enter the password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Signup</button>
      </form>
      <p>
        Already a member... <Link to="/logIn">Login</Link>
      </p>
    </div>
  );
};

export default SignUpPage;

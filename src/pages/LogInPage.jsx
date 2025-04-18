import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const nav = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  function handleLogIn(event) {
    event.preventDefault();

    const userToLogIn = { email, password };
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/logIn`, userToLogIn)
      .then((res) => {
        console.log("user was logged in!", res.data);
        localStorage.setItem("authToken", res.data.authToken);

        return authenticateUser();
      })
      .then(() => {
        nav("/profile");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.errorMessage);
      });
  }

  return (
    <div className="login-page">
      <h3>LOG IN</h3>
      <form onSubmit={handleLogIn}>
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
        <button>LogIn</button>
      </form>

      {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}

      <p>
        Story wanderer? <Link to="/">Join the Book People</Link>
      </p>
    </div>
  );
};

export default LogInPage;

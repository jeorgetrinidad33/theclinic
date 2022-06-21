import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

function Login({ signedIn, onUpdate }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3001/api/login", {
      name: name,
      password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message) {
          console.log(response.data.message);
          setError(response.data.message);
      } else {
        onUpdate(true, response.data);
      }
    });
  };

  if (signedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="card w-500 m-auto">
      <h2 className="center">Login Page</h2>
      <div className="input">
        {error && <h3>{error}</h3>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={name}
          className="rounded"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          className="rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="center">
        <button type="submit" className="block" onClick={() => login()}>
          Login
        </button>
        <Link to={"/register"} className="mb-3">
          Create an accout here.
        </Link>
      </div>
    </div>
  );
};

export default Login;

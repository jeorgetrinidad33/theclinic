import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="card w-500 m-auto">
      <h2 className="center">Login Page</h2>
      <div className="input">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          className="rounded"
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="block">
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

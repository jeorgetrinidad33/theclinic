import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const navigate = useNavigate();

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Pleasse enter Email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (repeatPassword && value !== repeatPassword) {
            stateObj["repeatPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["repeatPassword"] = repeatPassword
              ? ""
              : error.repeatPassword;
          }
          break;

        case "repeatPassword":
          if (!value) {
            stateObj[name] = "Please enter Password again.";
          } else if (password && value !== password) {
            stateObj[name] = "Password and Password repeat does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (error.name || error.email || error.password || error.repeatPassword) {
      return;
    }

    let data = {
      name,
      email,
      password,
      role: "patient",
    };

    axios
      .post("http://localhost:3001/api/register", data)
      .then((res) => {
        data = {
          id: res.data.insertId,
          ...data,
        };
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="card w-500 m-auto">
        <h2 className="center">Register Page</h2>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validateInput}
          />
          {error.name && <span className="error">{error.name}</span>}
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateInput}
          />
          {error.email && <span className="error">{error.email}</span>}
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validateInput}
          />
          {error.password && <span className="error">{error.password}</span>}
        </div>
        <div className="input">
          <label htmlFor="repeatPasswor">Repeat Password</label>
          <input
            name="repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            onBlur={validateInput}
          />
          {error.repeatPassword && (
            <span className="error">{error.repeatPassword}</span>
          )}
        </div>
        <div className="center">
          <button type="submit" className="block">
            Register
          </button>
          <Link to={"/login"} className="mb-3">
            Already have an account? Login here.
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
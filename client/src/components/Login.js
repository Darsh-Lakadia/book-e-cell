import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { toast } from "react-toastify";
const Login = ({ user, setUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const postresponse = () => {
    fetch("/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        if (response.error) {
          console.log(response.error);
          toast.error(response.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
          });
        } else {
          localStorage.setItem("jwt", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          console.log(response.user);
          localStorage.getItem("user") &&
            toast.success("User Login Successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
            });
          // history.push("/");
          setUser(response.user);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="title">User Login</div>
        {/* <form > */}
        <div className="user-details">
          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="login-btn" onClick={() => postresponse()}>
          Login Here!!
        </button>
        <h4>
          <Link to="/register">Dont have an account ?</Link>
        </h4>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Login;

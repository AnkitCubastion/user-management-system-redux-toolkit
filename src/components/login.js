import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
// import { useDispatch } from "react-redux";
// import { setUser } from "../features/user/userSlice";

import { useDispatch } from "react-redux";
import { setUserAsLogin } from "../features/authentication/authenticationSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/user", {
        params: {
          role: formData.role,
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.data.length === 0) {
        alert("Invalid email or password. Please try again.");
        return;
      }
      alert("User logged in successfully:");
      const user = response.data[0];
      // console.log(user);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      dispatch(setUserAsLogin(user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Error logging in:");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <div className="login-subcontainer">
            <label htmlFor="role">Choose Role:</label>
            <select
              className="role-selector"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div className="login-subcontainer">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="login-subcontainer">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="login-subcontainer">
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
      <div className="signup-subcontainer">
        <div>Not a member?</div>
        <Link to={"/signup"}>
          <button className="signup-btn">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

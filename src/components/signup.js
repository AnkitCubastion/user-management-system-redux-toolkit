import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    password: "",
    profilePicture: "",
    bio: "",
    interests: "",
    department: "",
    empID: "",
  });

  const [validations, setValidations] = useState({
    fullName: { isValid: true, errorMessage: "" },
    email: { isValid: true, errorMessage: "" },
    password: { isValid: true, errorMessage: "" },
    profilePicture: { isValid: true, errorMessage: "" },
    bio: { isValid: true, errorMessage: "" },
    interests: { isValid: true, errorMessage: "" },
    department: { isValid: true, errorMessage: "" },
    empID: { isValid: true, errorMessage: "" },
  });

  const [touchedFields, setTouchedFields] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouchedFields((prevTouchedFields) => [
      ...new Set([...prevTouchedFields, name]),
    ]);
  };

  useEffect(() => {
    validateInput("fullName", formData.fullName);
    validateInput("email", formData.email);
    validateInput("password", formData.password);
    validateInput("profilePicture", formData.profilePicture);
    validateInput("bio", formData.bio);
    validateInput("interests", formData.interests);
    validateInput("department", formData.department);
    validateInput("empID", formData.empID);
  });

  const validateInput = (fieldName, value) => {
    let isValid = true;
    let errorMessage = "";

    if (
      fieldName === "email" &&
      touchedFields.includes("email") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      isValid = false;
      errorMessage = "Invalid email format";
    }

    if (
      fieldName === "fullName" &&
      touchedFields.includes("fullName") &&
      !/^[a-zA-Z\s]+$/.test(value)
    ) {
      isValid = false;
      errorMessage =
        "Full name can only contain alphabetic characters and spaces";
    }

    if (fieldName === "password" && touchedFields.includes("password")) {
      if (value.length < 5) {
        isValid = false;
        errorMessage = "Password must be at least 5 characters long";
      } else if (
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value)
      ) {
        isValid = false;
        errorMessage =
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit";
      }
    }

    if (
      (fieldName === "bio" || fieldName === "interests") &&
      touchedFields.includes(fieldName)
    ) {
      if (value.trim() === "") {
        isValid = false;
        errorMessage = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } cannot be empty`;
      }
    }

    setValidations((prevValidations) => ({
      ...prevValidations,
      [fieldName]: { isValid, errorMessage },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = Object.values(validations).every(
      (validation) => validation.isValid
    );

    if (!isValidForm) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    try {
      const existingUser = await axios.get("http://localhost:3000/user", {
        params: { email: formData.email },
      });

      if (existingUser.data.length > 0) {
        alert(
          "User with this email already exists. Please use a different email."
        );
        return;
      }

      const response = await axios.post("http://localhost:3000/user", formData);
      console.log(response.data);
      alert("User signed up successfully:");
      navigate("/login");
    } catch (error) {
      alert("Error signing up:");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <div className="signup-subcontainer">
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

          <div className="signup-subcontainer">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="signup-subcontainer">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="signup-subcontainer">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="signup-subcontainer">
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="url"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
            />
          </div>
          <div className="signup-subcontainer">
            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="signup-subcontainer">
            <label htmlFor="interests">Interests:</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
            />
          </div>

          {formData.role === "admin" && (
            <div className="signup-subcontainer">
              <label htmlFor="empID">empID:</label>
              <input
                type="text"
                name="empID"
                value={formData.empID}
                onChange={handleInputChange}
              />
            </div>
          )}

          {formData.role === "editor" && (
            <div className="signup-subcontainer">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="signup-error-messages">
            <div>{validations.fullName.errorMessage}</div>
            <div>{validations.email.errorMessage}</div>
            <div>{validations.password.errorMessage}</div>
            <div>{validations.profilePicture.errorMessage}</div>
            <div>{validations.bio.errorMessage}</div>
            <div>{validations.interests.errorMessage}</div>
            <div>{validations.department.errorMessage}</div>
            <div>{validations.empID.errorMessage}</div>
          </div>

          <div className="signup-subcontainer">
            <button className="signup-btn" type="submit">
              Signup
            </button>
          </div>
        </div>
      </form>
      <div className="login-subcontainer">
        <div>Already a member?</div>
        <Link to={"/login"}>
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;

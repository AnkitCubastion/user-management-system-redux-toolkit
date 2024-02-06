import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const email = localStorage.getItem("email");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          params: {
            email: email,
          },
        });
        setData(response.data[0]);
      } catch (error) {
        alert("Some Error Happen!");
      }
    };
    fetchData();
  }, [email]);

  return (
    <div className="profile-container">
      <div className="left-container">
        <img src={data.profilePicture} alt={data.fullName} />
      </div>
      <div className="right-container">
        <h3>Name: {data.fullName}</h3>
        <h4>Role: {data.role}</h4>
        <h4>
          Email: <a href={data.email}>{data.email}</a>
        </h4>
        <h4>Bio: {data.bio}</h4>
        <h4>Interests: {data.interests}</h4>
      </div>
    </div>
  );
};

export default Profile;

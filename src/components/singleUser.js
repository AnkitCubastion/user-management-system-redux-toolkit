import React, { useState } from "react";
import axios from "axios";
import "./singleUser.css";

import { useSelector, useDispatch } from "react-redux";
import { updateUserList, selectUsers } from "../features/user/userSlice";

const SingleUser = ({ user }) => {
  const { id, profilePicture, fullName, email, bio, interests } = user;
  const role = localStorage.getItem("role");

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const [editedInfo, setEditedInfo] = useState({
    fullName: fullName,
    email: email,
    bio: bio,
    interests: interests,
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const updateReduxUserList = (updatedUsers) => {
    dispatch(updateUserList(updatedUsers));
  };

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/user/${id}`,
        editedInfo
      );

      const updatedUsers = users.map((u) => (u.id === id ? response.data : u));
      updateReduxUserList(updatedUsers);

      alert(`User with ID ${id} edited successfully`);
      setEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert("Error editing user:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);

      const updatedUsers = users.filter((u) => u.id !== id);
      updateReduxUserList(updatedUsers);

      alert(`User with ID ${id} deleted successfully`);
      setDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert("Error deleting user:", error.message);
    }
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="single-user">
      <div>
        <img src={profilePicture} alt="" />
      </div>
      <div className="info-container">
        <p>{fullName}</p>
        <p>{email}</p>
        <p>{bio}</p>
        <p>{interests}</p>
      </div>
      <div className="manipulation-btn">
        <button onClick={openEditModal} className="edit-btn">
          Edit
        </button>
        {editModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeEditModal}>
                &times;
              </span>
              <label htmlFor="edit-user-information">
                Edit User Information
              </label>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={editedInfo.fullName}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedInfo.email}
                onChange={handleInputChange}
              />
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={editedInfo.bio}
                onChange={handleInputChange}
              />
              <label htmlFor="interests">Interests:</label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={editedInfo.interests}
                onChange={handleInputChange}
              />
              <button onClick={handleEdit} className="confirm-edit-btn">
                Confirm Edit
              </button>
            </div>
          </div>
        )}
        {role === "admin" && (
          <>
            <button onClick={openDeleteModal} className="delete-btn">
              Delete
            </button>
            {deleteModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeDeleteModal}>
                    &times;
                  </span>
                  <label>Are you sure you want to delete this user?</label>
                  <button onClick={handleDelete} className="confirm-delete-btn">
                    Confirm Delete
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleUser;

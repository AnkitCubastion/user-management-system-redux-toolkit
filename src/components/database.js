import React, { useEffect } from "react";
import axios from "axios";
import SingleUser from "./singleUser";
import { useSelector, useDispatch } from "react-redux";
import { updateUserList } from "../features/user/userSlice";

const Database = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          params: {
            role: "user",
          },
        });
        const data = response.data;
        dispatch(updateUserList(data));
      } catch (error) {
        alert("Some Error Happend!");
      }
    };
    fetchData();
  }, [dispatch]);

  // console.log(users);

  return (
    <div className="database-container">
      <h1>Database</h1>
      <div className="database-subcontainer">
        {users.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Database;

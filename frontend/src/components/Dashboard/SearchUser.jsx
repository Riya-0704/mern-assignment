import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (search.trim() === "") {
        setUsers([]);
        return;
      }

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/search?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data.message);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [search]);

  const sendFriendRequest = async (friendId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/friend-request",
        { friendId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Friend request sent!");
    } catch (error) {
      console.error(
        "Error sending friend request:",
        error.response?.data.message
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {/*{users.map((user) => (
          <li key={user._id}>
            {user.username}
            <button onClick={() => sendFriendRequest(user._id)}>Add Friend</button>
          </li>
        ))}*/}
        {Array.isArray(users) &&
          users.map((user) => (
            <li key={user._id}>
              {user.username}
              <button onClick={() => sendFriendRequest(user._id)}>Add Friend</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchUsers;

import React, { useEffect, useState } from "react";
import axios from "axios";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/friends",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFriends(data);
    } catch (err) {
      setError("Failed to fetch friends. Please try again later.");
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfriend = async (friendId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/unfriend",
        { friendId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert(response.data.message || "Unfriended successfully!");
      setFriends(friends.filter((friend) => friend._id !== friendId)); // Update UI
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to unfriend. Please try again."
      );
    }
  };

  if (loading) {
    return <p>Loading friends...</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Your Friends</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {friends.length === 0 ? (
        <p className="text-gray-500">You have no friends yet.</p>
      ) : (
        <ul className="space-y-4">
          {Array.isArray(friends) &&
            friends.map((friend) => (
              <li
                key={friend._id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
              >
                <span className="font-medium">{friend.username}</span>
                <button
                  onClick={() => handleUnfriend(friend._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                >
                  Unfriend
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;

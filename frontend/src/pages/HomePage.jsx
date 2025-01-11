import React from "react";
import { useNavigate } from "react-router-dom";
import FriendList from "../components/Dashboard/FriendList";
import SearchUsers from "../components/Dashboard/SerachUser";
import Recommendations from "../components/Dashboard/FriendRecommendation";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Search Users */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Search Users
          </h2>
          <SearchUsers />
        </div>
        {/* Your Friends */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your Friends
          </h2>
          <FriendList />
        </div>
        {/* Friend Recommendations */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Friend Recommendations
          </h2>
          <Recommendations />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

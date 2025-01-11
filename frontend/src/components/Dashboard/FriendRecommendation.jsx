import React, { useEffect, useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users/recommend",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRecommendations(data);
      } catch (error) {
        console.error(
          "Error fetching recommendations:",
          error.response?.data.message
        );
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h3>Friend Recommendations</h3>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <ul>
          {Array.isArray(recommendations) &&
            recommendations.map((recommendation) => (
              <li key={recommendation._id}>
                {recommendation.username}
                <button>Add Friend</button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;

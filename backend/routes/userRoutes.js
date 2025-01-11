/*const express = require("express");
const {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  recommendFriends,
} = require("../controllers/usercontroller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/search", authMiddleware, searchUsers);
router.post("/friend-request", authMiddleware, sendFriendRequest);
router.post("/friend-request/accept", authMiddleware, acceptFriendRequest);
router.get("/recommend", authMiddleware, recommendFriends);

module.exports = router;
*/

const express = require("express");
const {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  recommendFriends,
  getFriends,
  unfriend,
} = require("../controllers/usercontroller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Search for users
router.get("/search", authMiddleware, searchUsers);

// Send a friend request
router.post("/friend-request", authMiddleware, sendFriendRequest);

// Accept a friend request
router.post("/friend-request/accept", authMiddleware, acceptFriendRequest);

// Get friend recommendations
router.get("/recommend", authMiddleware, recommendFriends);

// Get the user's friends
router.get("/friends", authMiddleware, getFriends);

// Unfriend a user
router.post("/unfriend", authMiddleware, unfriend);

module.exports = router;

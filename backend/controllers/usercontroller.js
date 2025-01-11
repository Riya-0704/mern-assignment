const User = require("../models/User");

// Search Users by username
const searchUsers = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const users = await User.find({
      username: { $regex: search, $options: "i" }, // Case-insensitive search
      _id: { $ne: req.user.id }, // Exclude current user
    }).select("username");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error searching users" });
  }
};

// Send Friend Request
const sendFriendRequest = async (req, res) => {
  const { friendId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(400).json({ message: "Invalid friend request" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    if (!friend.friendRequests.includes(req.user.id)) {
      friend.friendRequests.push(req.user.id);
      await friend.save();
    }

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending friend request" });
  }
};

//Get friend list
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "username"
    );
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: "Error fetching friends" });
  }
};

const unfriend = async (req, res) => {
  const { friendId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend || !user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Invalid unfriend request" });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter(
      (id) => id.toString() !== req.user.id
    );

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Unfriended successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unfriending user" });
  }
};

// Accept Friend Request
const acceptFriendRequest = async (req, res) => {
  const { requesterId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const requester = await User.findById(requesterId);

    if (!requester || !user.friendRequests.includes(requesterId)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    user.friends.push(requesterId);
    requester.friends.push(req.user.id);

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== requesterId
    );
    await user.save();
    await requester.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: "Error accepting friend request" });
  }
};

// Recommend Friends based on mutual connections
const recommendFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friends", "_id");
    const userFriends = user.friends.map((friend) => friend._id.toString());

    const recommendations = await User.find({
      _id: { $nin: [req.user.id, ...userFriends] },
      friends: { $in: userFriends },
    })
      .select("username")
      .limit(10);

    res.status(200).json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recommendations" });
  }
};

module.exports = {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  recommendFriends,
  getFriends,
  unfriend,
};

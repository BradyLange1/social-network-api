const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      await user.populate(["thoughts", "friends"]);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //add a friend
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //delete a friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

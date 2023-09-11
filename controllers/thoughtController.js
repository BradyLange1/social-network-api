const { ObjectId } = require('mongoose').Types;
const { Thought, reactionSchema } = require("../models");

module.exports = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.find(req.params.thoughtId);

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(req.body);

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //add a friend
  async createReaction(req, res) {
    try {
      const friend = await reactionSchema.create(req.body);

      res.json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //delete a friend
  async deleteReaction(req, res) {
    try {
      const thought = await reactionSchema.findOneAndRemove({ _id: req.params.friendId });

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
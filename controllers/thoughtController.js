const Thought = require('../models/Thought');

//get all thoiughts
const getAllThoughts = async (req, res) => {
    try{
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server Error'})
    }
};
//get one thought
const getThoughtById = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      if (!thought) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
//make new thought
const createThought = async (req, res) => {
    try{
        const thought = await Thought.create(req.body);
        res.status(201).json(thought);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'invalid input'});
    }

    
};
//update thougnt by id
const updateThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true, 
        runValidators: true, // Validates the new data?
      });
      if (!thought) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid input' });
    }
  };
//delete by id
const deleteThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndRemove(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
  }

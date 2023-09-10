const User = require('../models/User');

//getAllUsers
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().populate('thoughts friends');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};
//getUserById
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts friends');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
//createUser
const createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid input' });
    }
  };
//updateUser
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true, 
            runValidators: true, // this again
          });
          if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
          }
          res.json(user);
        } catch (error) {
          console.error(error);
          res.status(400).json({ message: 'Invalid input' });
        }
      };
//deleteUser
const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
//addFriend
const addFriend = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      user.friends.push(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
//removeFriend
const removeFriend = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
  };
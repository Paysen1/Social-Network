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
    try{
        
    }
}
//createUser

//updateUser

//deleteUser

//addFriend

//removeFriend
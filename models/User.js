const mongoose = require('mongoose')
const reactionSchema = require('./Reaction');
const thoughtSchema = require('./Thought');




const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      },
      thoughts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.lengh;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
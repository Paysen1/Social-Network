const mongoose = require('mongoose')

const ReactionSchema = new mongoose.Schema({
    reactionId: mongoose.Schema.Types.ObjectId,
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 220,
    },
    username: {
        type: String,
        required: true,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = ReactionSchema;
const mongoose = require('mongoose')

const ThoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        requred: true,
        minlength: 1,
        maxlength: 220
    },
    timeCreated: {
        type: Date,
        defult: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction',
    },],
});

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
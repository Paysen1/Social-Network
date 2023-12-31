const mongoose = require('mongoose')
const reactionSchema = require('./Reaction');

const ThoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        requred: true,
        minlength: 1,
        maxlength: 280
    },
    timeCreated: {
        type: Date,
        default: Date.now,
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
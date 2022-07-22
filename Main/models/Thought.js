const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const date = new Date;

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: [280, 'Text Too long!']    
    },
    createdAt: {
        type: Date,
        default: date.toDateString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema)



module.exports = Thought;
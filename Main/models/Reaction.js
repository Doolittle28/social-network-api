const { Schema, model, Types } = require('mongoose');
const date = new Date;


const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280, 'Text Too long!']    
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: date.toDateString()
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;
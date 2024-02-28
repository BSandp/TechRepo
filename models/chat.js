const mongoose = require('mongoose');
const UserSchema = require('./user');
const MessageSchema = require('./message');

const ChatSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('chat', ChatSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new mongoose.Schema(
    {
        skill: {
            type: mongoose.Types.ObjectId,
            ref: 'Skill',
            required: true
        },
        sender: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxLength: 500
        }
    },
    { timestamps: true }
);
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

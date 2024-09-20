const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String },
    content: { type: String },
    tags: { type: [String] },
    location: { type: String },
    moment: { type: Date },
    isPublic: { type: Boolean, default: true },
    password: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);

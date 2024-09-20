const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    nickname: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    postPassword: { type: String, required: true },
    imageUrl: { type: String },
    tags: { type: [String] },
    location: { type: String },
    moment: { type: Date },
    isPublic: { type: Boolean, default: true },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Post 모델 생성
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

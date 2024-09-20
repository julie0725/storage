// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     nickname: { type: String, required: true },
//     title: { type: String, required: true },
//     image: { type: String },
//     content: { type: String },
//     tags: { type: [String] },
//     location: { type: String },
//     moment: { type: Date },
//     isPublic: { type: Boolean, default: true },
//     password: { type: String, required: true },
//     groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    groupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Group', // 그룹 모델과의 관계 설정
        required: true 
    },
    nickname: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    postPassword: { 
        type: String, 
        required: true // 비밀번호는 필수
    },
    imageUrl: { 
        type: String 
    },
    tags: { 
        type: [String] // 문자열 배열
    },
    location: { 
        type: String 
    },
    moment: { 
        type: Date 
    },
    isPublic: { 
        type: Boolean, 
        default: true 
    },
    likeCount: { 
        type: Number, 
        default: 0 // 초기 좋아요 수
    },
    commentCount: { 
        type: Number, 
        default: 0 // 초기 댓글 수
    },
    createdAt: { 
        type: Date, 
        default: Date.now // 생성일자 기본값 설정
    }
});

// Post 모델 생성
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

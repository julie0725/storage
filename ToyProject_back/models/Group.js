// const mongoose = require('mongoose');

// const groupSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     image: { type: String },
//     description: { type: String },
//     isPublic: { type: Boolean, default: true },
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Group', groupSchema);

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
  isPublic: { type: Boolean, default: true },
  introduction: { type: String },
  likeCount: { type: Number, default: 0 },
  badges: { type: Array, default: [] },
  postCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;

const mongoose = require('mongoose');

const facebookPostSchema = new mongoose.Schema({
  userProfileUrl: String,
  username: String,
  isVerified: Boolean,
  postDate: Date,
  post: String,
  postImageUrl: String,
  numberOfComments: Number,
  numberOfShares: Number,
  numberOfLikes: Number,
});

const FacebookPost = mongoose.model('FacebookPost', facebookPostSchema);
module.exports = FacebookPost;

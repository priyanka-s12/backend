const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //in 1 model you can reference multiple models, key must be different
});

const POST = mongoose.model('Post', postSchema);
module.exports = POST;

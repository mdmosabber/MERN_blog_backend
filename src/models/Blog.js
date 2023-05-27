const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title for your blog post.'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please enter the content for your blog post.'],
      trim: true,
      maxlength: [2000, 'Content cannot exceed 2000 characters.'],
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

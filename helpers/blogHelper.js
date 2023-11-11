const blogModel = require("../models/blogModel");
const mongoose = require("mongoose");

module.exports = {
  ///create blog
  createBlog: (tittle, content, author) => {
    console.log(tittle, content);
    try {
      return new Promise(async (resolve, reject) => {
        await new blogModel({ tittle, content, author })
          .save()
          .then((response) => {
            resolve(response);
          });
      });
    } catch (error) {}
  },

  ///get blog
  getBlog: (id) => {
    try {
      return new Promise(async (resolve, reject) => {
        const blogId = mongoose.Types.ObjectId(id);
        await blogModel.findOne({ _id: blogId }).then((response) => {
          resolve(response);
        });
      });
    } catch (error) {}
  },

  ///get all blogs
  getAllBlog: () => {
    try {
      return new Promise(async (resolve, reject) => {
        await blogModel.find().then((response) => {
          resolve(response);
        });
      });
    } catch (error) {}
  },

  ///paginatedBlogs
  paginatedBlogs: (limit, skip) => {
    try {
      return new Promise(async (resolve, reject) => {
        await blogModel
          .find()
          .skip(skip)
          .limit(limit)
          .then((response) => {
            resolve(response);
          });
      });
    } catch (error) {}
  },
};

const blogModel = require("../models/blogModel");
const mongoose = require("mongoose");

module.exports = {
  ///create blog
  createBlog: (payload) => {
    try {
      return new Promise(async (resolve, reject) => {
        await new blogModel(payload)
          .save()
          .then((response) => {
            resolve(response);
          });
      });
    } catch (error) {
      throw new Error('Error found')
    }
  },

  ///get blog
  getBlog: (id) => {
    try {
      if (id?.length !== 24) {
        throw new Error("Invalid Id")
      }
      return new Promise(async (resolve, reject) => {
        const blogId = mongoose.Types.ObjectId(id);
        await blogModel.findOne({ _id: blogId })
          .populate({
            path: 'author',
            select: { password: 0 }
          })
          .then((response) => {
            resolve(response);
          }).catch((error) => {
            reject(error)
          });
      });
    } catch (error) {
      throw new Error('Error found')
    }
  },

  ///get all blogs
  getAllBlog: () => {
    try {
      return new Promise(async (resolve, reject) => {
        await blogModel.find().then((response) => {
          resolve(response);
        });
      });
    } catch (error) {
      throw new Error('Error found')
    }
  },

  ///paginatedBlogs
  paginatedBlogs: async (limit, skip) => {
    try {
      const totalCount = await blogModel.count({})
      return new Promise(async (resolve, reject) => {
        await blogModel
          .find()
          .populate({
            path: 'author',
            select: { password: 0 }
          })
          .skip(skip)
          .limit(limit)
          .sort({createdAt:-1 })
          .then((response) => {
            resolve({ data: response, count: totalCount, totalPage: Math.ceil(totalCount / limit) });
          });
      });
    } catch (error) {
      throw new Error('Error found')
    }
  },

  updateBlog: async(payload, id=null) => {
    try {
      if(!id) throw new Error('Missing id');
      const updated = await blogModel.findByIdAndUpdate(id, payload)
      return updated
    } catch (error) {
      throw new Error('Error found')
    }
  }

}

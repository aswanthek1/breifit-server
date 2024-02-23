const { validationResult } = require("express-validator");
const blogHelper = require("../helpers/blogHelper");
const blogModel = require("../models/blogModel");

exports.checkValidation = (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new HttpException(400, "Validation failed", result.array());
  }
};

module.exports = {
  ///add new blog
  addBlog: async (req, res, next) => {
    try {
      this.checkValidation(req, res)
      const { tittle, content } = req.body;
      console.log(req.user, 'req.user at ')
      const author = req.user?._id;
      blogHelper.createBlog(tittle, content, author).then((response) => {
        res.status(200).json({ message: "Blog added successfully" });
      });
    } catch (error) {
      console.log(error)
      next()
    }
  },

  ///get blog
  getBlog: async (req, res, next) => {
    try {
      blogHelper
        .getBlog(req.params.id)
        .then((blog) => {
          res.status(200).json(blog);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      next()
    }
  },

  //getAllBlogs
  getAllBlogs: async (req, res, next) => {
    try {
      blogHelper
        .getAllBlog()
        .then((blogs) => {
          res.status(200).json(blogs);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      next()
    }
  },

  getBlogsByPaginate: async (req, res, next) => {
    try {
      const pages = parseInt(req.params.pages);
      const limit = req.query?.limit ? req.query?.limit : 3;
      const skip = (pages - 1) * limit;
      await blogHelper.paginatedBlogs(limit, skip).then((paginationBlogs) => {
        res.status(200).json(paginationBlogs);
      });
    } catch (error) {
      next()
    }
  },
};

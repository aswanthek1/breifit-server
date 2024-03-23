const { validationResult } = require("express-validator");
const blogHelper = require("../helpers/blogHelper");
const blogModel = require("../models/blogModel");
const { cloudinaryUpload } = require("../helpers/upload");
const HttpException = require("../utils/httpException");
const { BLOG_ASSETS_FOLDER_NAME } = require("../constants/constants");

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
      if(req.file) {
        const uploadedResult = await cloudinaryUpload(req.file?.path, BLOG_ASSETS_FOLDER_NAME)
        if(uploadedResult) {
            req.body.image = uploadedResult.secure_url
        }
      }
      req.body.author = req.user?._id
      blogHelper.createBlog(req.body).then((response) => {
        res.status(200).json({ message: "Blog added successfully" });
      });
    } catch (error) {
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
      const page = parseInt(req.params.pages);
      const limit = req.query?.limit ? req.query?.limit : 3;
      const skip = limit * page - limit;
      await blogHelper.paginatedBlogs(limit, skip).then((paginationBlogs) => {
        res.status(200).json(paginationBlogs);
      });
    } catch (error) {
      next()
    }
  },

  updateBlog: async (req, res, next) => {
    try {
      this.checkValidation(req, res)
      if(req.file) {
        const uploadedResult = await cloudinaryUpload(req.file?.path, BLOG_ASSETS_FOLDER_NAME)
        if(uploadedResult) {
            req.body.image = uploadedResult.secure_url
        }
      }
      const updated = await blogHelper.updateBlog(req.body, req.params?.id);
      res.status(200).json({ message: "Blog Updated successfully" });
    } catch (error) {
      next()
    }
  }

};

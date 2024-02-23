const express = require("express");
const router = express.Router();
const {
  addBlog,
  getBlog,
  getAllBlogs,
  getBlogsByPaginate,
} = require("../controllers/blogController");
const { authenticate } = require("../middlewares/auth.middleware");
const { createBlogSchema } = require("../middlewares/validators/blogValidators");

router.post("/addBlog",authenticate, createBlogSchema, addBlog);
router.get("/getBlog/:id", getBlog);
router.get("/allBlog", getAllBlogs);
router.get("/getBlogsByPaginage/:pages", getBlogsByPaginate);

module.exports = router;

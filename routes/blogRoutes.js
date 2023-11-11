const express = require("express");
const router = express();
const {
  addBlog,
  getBlog,
  getAllBlogs,
  getBlogsByPaginate,
} = require("../controllers/blogController");

router.post("/addBlog", addBlog);
router.get("/getBlog/:id", getBlog);
router.get("/allBlog", getAllBlogs);
router.get("/getBlogsByPaginage/:pages", getBlogsByPaginate);

module.exports = router;

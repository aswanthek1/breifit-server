const express = require("express");
const router = express.Router();
const {
  addBlog,
  getBlog,
  getAllBlogs,
  getBlogsByPaginate,
  updateBlog
} = require("../controllers/blogController");
const { authenticate, checkAuthor } = require("../middlewares/auth.middleware");
const { createBlogSchema, updateBlogSchema } = require("../middlewares/validators/blogValidators");
const multer = require("multer");

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  filename: function(req, file , cb) {
      cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 2e+7 } })

router.post("/addBlog",authenticate, upload.single('image'), createBlogSchema, addBlog);
router.get("/getBlog/:id", getBlog);
router.get("/allBlog", getAllBlogs);
router.get("/getBlogsByPaginage/:pages", getBlogsByPaginate);
router.put("/edit/:id", authenticate, upload.single('image'), checkAuthor, updateBlogSchema, updateBlog)

module.exports = router;

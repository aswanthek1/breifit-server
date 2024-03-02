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

module.exports = router;

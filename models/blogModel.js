const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // author: {
    //   type: String,
    //   required: true,
    // },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors',
      required:true
    },
    image: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);

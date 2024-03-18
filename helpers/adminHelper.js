const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

module.exports = {

  getBlogCount: async (date = {}) => {
    try {

      // const blogCount = await blogModel.aggregate([
      //   { 
      //     $match: { 
      //       createdAt: { $gte: date }, 
      //       createdAt: {$lte: date?.getDate() + 1}}
      //   },
      //   {
      //     $group: {
      //       _id: null,
      //       count: { $sum: 1 }
      //     }
      //   }
      // ])

      const endDate = new Date(date); // Current date and time
      const startDate = new Date(endDate - 24 * 60 * 60 * 1000);
      console.log(endDate, 'date payload', startDate)
      const blogCount = await blogModel.find({
        $and: [
          {
            createdAt: { $gte: startDate },
          },
          {
            createdAt: { $lt: endDate }
          }
        ]
      }).count()
      console.log(blogCount, 'blogcount at helper')
      return blogCount
    } catch (error) {
      console.log(error, 'error')
      throw new Error('Error found')
    }
  },

  getUserCount: async (date = {}) => {
    try {
      const endDate = new Date(date); // Current date and time
      const startDate = new Date(endDate - 24 * 60 * 60 * 1000);
      const userCount = await authorModel.find({
        $and: [
          {
            createdAt: { $gte: startDate },
          },
          {
            createdAt: { $lt: endDate }
          }
        ]
      }).count()
      return userCount
    } catch (error) {
      throw new Error('Error found')
    }
  },

}


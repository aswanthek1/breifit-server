const { getBlogCount, getUserCount } = require("../helpers/adminHelper");
const { generateLast5DaysDate } = require("../utils/commonUtils")

exports.getChartData = async(req, res, next) => {
    try {
        // we need to find last 5 days.
        // Then need to take the number of blogs and users created in the those days
        const last5days = generateLast5DaysDate();
        console.log(last5days, 'last 5 days')
        let blogs = [];
        let users = [];
        for(let day of last5days.originalDate) {
            const blogCount = await getBlogCount(day)
            blogs.push(blogCount)
            const userCount = await getUserCount(day)
            users.push(userCount)
        }
        res.send({
            days:last5days,
            blogs,
            users
        })
    } catch (error) {
        next(error)
    }
}
const authorModel = require('../models/authorModel')
const FILE_NAME = '/helpers/authorHelper'


exports.createAuthor = async(body) => {
    try {
        await new authorModel(body).save()
        return {message: 'Author Created Successfully'}
    } catch (error) {
        throw new Error('Error Found While creating Author in' + FILE_NAME +error)
    }
}
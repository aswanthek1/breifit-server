const authorModel = require('../models/authorModel')
const FILE_NAME = '/helpers/authorHelper'


exports.createAuthor = async(body) => {
    try {
       const data = await new authorModel(body).save()
        return {message: 'Author Created Successfully',data:data}
    } catch (error) {
        throw new Error('Error Found While creating Author in' + FILE_NAME +error)
    }
}

exports.findAuthorByCred = async(credentials={}) => {
    try {
        if(!credentials || !Object.keys(credentials).length || !Object.values(credentials).length) {
             throw new Error('Email is missing' + FILE_NAME +error)
        }
        const author = await authorModel.findOne(credentials)
        return author
    } catch (error) {
        throw new Error('Error Found While Finding Author by email' + FILE_NAME +error)
    }
}
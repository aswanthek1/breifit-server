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
             throw new Error('Missing credentials' + FILE_NAME +error)
        }
        const author = await authorModel.findOne(credentials).select(["-password"])
        return author
    } catch (error) {
        throw new Error('Error Found While Finding Author by email' + FILE_NAME +error)
    }
}

exports.updateAuthorById = async(authorId, payload) => {
    try {
        if(!authorId) return;
        await authorModel.findByIdAndUpdate(authorId, payload)
        return {message: 'Author Updated Successfully'}
    }catch(error) {
        throw new Error('Error Found at updateAuthorById' + FILE_NAME +error)
    }
}
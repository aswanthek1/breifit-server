const cloudinary = require('cloudinary').v2
const FILE_NAME = 'helpers/upload.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

exports.cloudinaryUpload = async (filePath, folder) => {
    console.log(filePath, `file path at ${FILE_NAME}`)
    if(!filePath || !folder) return
    try {
       const uploadResult =  await cloudinary.uploader
            .upload(filePath, {folder:folder})
            .then(result => {
                return result
            }).catch((error) => {
                throw new Error('Error found while uploading image'+error)
            });
        return uploadResult
    } catch (error) {
        throw error
    }
}
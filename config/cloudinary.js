const config = require('config');
const CLOUDINARY_NAME = config.get('CLOUDINARY_NAME');
const CLOUDINARY_API_KEY = config.get('CLOUDINARY_API_KEY');
const CLOUDINARY_API_SECRET = config.get('CLOUDINARY_API_SECRET');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
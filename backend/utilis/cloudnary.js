const cloudinary = require('cloudinary').v2;
const fs = require('fs')
require('dotenv').config();
cloudinary.config({
 cloud_name: process.env.CLOUDNAME,
 api_key: process.env.APIKEY,
 api_secret: process.env.APISECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)   // this get  remove from local system  and  goes to   cloud
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



module.exports= {uploadOnCloudinary}
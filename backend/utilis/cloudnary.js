const cloudinary = require('cloudinary').v2;
const fs = require('fs')

cloudinary.config({
 cloud_name: 'dptuz8xop',
 api_key: '516258619764779',
 api_secret: 'DN6fYvECgCUxRo9Teqiloan1kec'
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



export {uploadOnCloudinary}
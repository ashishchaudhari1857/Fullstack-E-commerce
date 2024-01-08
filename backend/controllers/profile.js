const { where } = require("../config/dbconfig");
const Profile = require("../models/profile");
const { uploadOnCloudinary } = require("../utilis/cloudnary");
const User = require("../models/user");
const sequelize=require('../config/dbconfig');


const updateProfile = async (req, res) => {
  const { user_id, username } = req.body;

  try {
    // Find the profile based on user_id
    const profile = await Profile.findOne({ where: { userId: user_id } });

    // If profile not found, return 404
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update profile properties based on the form data
    profile.username = username;

    // Handle file upload if needed
    // if (req.file) {
      
    //   const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    //   profile.cloudinaryUrl = cloudinaryResponse.secure_url;
    //   console.log(cloudinaryResponse.secure_url)
    // }


    if (req.files && req.files.length > 0) {
      const cloudinaryUrls = [];

      for (let i = 0; i < req.files.length; i++) {
        const cloudinaryResponse = await uploadOnCloudinary(req.files[i].path);
        cloudinaryUrls.push(cloudinaryResponse.secure_url);
      }
        console.log(cloudinaryUrls)
      // Update profile with Cloudinary URLs
      profile.cloudinaryUrls = cloudinaryUrls;
    }
    // Save the updated profile
    await profile.save();

    // Respond with the updated profile and a success message
    res.status(200).json({ updatedProfile: profile, message: 'Update profile successfully' });
  } catch (error) {
    // Handle errors, such as database errors or internal server issues
    console.error('Error during profile update:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



const  getProfile = async(req ,res)=>{
    const {userId} =req.params;
     try {
          const   profile = await Profile.findOne({where:{userId}});
          if(!profile){
            return res.status(404).json({message : 'User not  found'
            })
            }
            res.status(200).json(profile)
            }catch(e){
              res.status(500).json({message : e})
              }   
      }


      const deleteAccount = async (req, res) => {
        const { userId } = req.params;
        const transaction = await sequelize.transaction();
      
        try {
          const user = await User.findByPk(userId);
          if (!user) {
            await transaction.rollback();
            return res.status(404).json({ message: 'User Not Found!' });
          }
      
          // Delete the user, Sequelize will automatically delete associated records
          await user.destroy({ transaction });
      
          await transaction.commit();
      
          res.status(200).json({ message: "Account deleted Successfully" });
        } catch (error) {
          await transaction.rollback();
          res.status(500).json({ message: "Internal server error", error: error.message });
        }
      };
      
    
module.exports = {
  updateProfile,
  getProfile,
  deleteAccount
}

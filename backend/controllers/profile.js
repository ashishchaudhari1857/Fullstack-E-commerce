const { where } = require("../config/dbconfig");
const Profile = require("../models/profile");
const { uploadOnCloudinary } = require("../utilis/cloudnary");
const User = require("../models/user");
const sequelize=require('../config/dbconfig');


const updateProfile = async (req, res) => {
  const { userId, username, name, email, phone, address, dob, gender } = req.body;

  try {
    const profile = await Profile.findOne({ where: { userId} });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (username) {
      profile.username = username;
    }
    if (name) {
      profile.name = name;
    }
    if (email) {
      profile.email = email;
    }
    if (phone) {
      profile.phone = phone;
    }
    if (address) {
      profile.address = address;
    }
    if (dob) {
      profile.dob = dob;
    }
    if (gender) {
      profile.gender = gender;
    }
       console.log(req.file)
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      profile.ImgUrl = cloudinaryResponse.secure_url;
    }

    await profile.save();

    res.status(200).json({ updatedProfile: profile, message: 'Update profile successfully' });
  } catch (error) {
    console.error('Error during profile update:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
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

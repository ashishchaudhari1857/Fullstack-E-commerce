const  express =require("express");
const router =express.Router();
const { upload }= require('../middlewares/multer')
const ProfileController=require('../controllers/profile');

 router.put('/update' ,  upload.array('files'),ProfileController.updateProfile);
 router.get('/:userId' ,ProfileController.getProfile);
 router.delete('/delete/:userId' ,ProfileController.deleteAccount);


 module.exports =router;
const  express= require('express');
const  router =  express.Router();
const AuthController =require('../controllers/authController')

router.post('/signup' , AuthController.register)
router.post('/login' ,AuthController.login)
router.get('/forget' ,AuthController.forgetPassword)

router.get('/users' ,AuthController.getUsers)
router.get('/user/:userId' ,AuthController.getUser)



module.exports=router;

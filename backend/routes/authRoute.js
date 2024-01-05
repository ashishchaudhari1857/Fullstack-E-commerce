const  express= require('express');
const  router =  express.Router();
const AuthController =require('../controllers/authController')

router.post('/signup' , AuthController.register)
router.post('/login' ,AuthController.login)
router.get('/users' ,AuthController.getUsers)



module.exports=router;

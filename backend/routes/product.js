const express=require('express')
const router=express.Router();
const  productController =require('../controllers/product');
const {upload}=require('../middlewares/multer')
const { userCheck, adminCheck ,loginCheck } = require('../middlewares/auth');
 

router.get('/', loginCheck , productController.getAllProducts);
router.get('/:id',  loginCheck ,productController.getSingleProduct);

router.post('/addproduct', adminCheck , upload.array('files'),productController.addProduct);
router.put('/update/:userId/:id',  adminCheck ,productController.updateProduct);
router.delete('/delete/:userId/:id', adminCheck, productController.deleteProduct);
router.get('/admin/allproducts/:userId', adminCheck, productController.getAdminProducts);


module.exports=router;
module.exports=router;
const express=require('express')
const router=express.Router();
const  productController =require('../controllers/product');
const {upload}=require('../middlewares/multer')
 

router.get('/', productController.getAllProducts);

router.post('/addproduct', upload.array('files'),productController.addProduct);
router.get('/:id', productController.getSingleProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports=router;
const express=require('express')
const router=express.Router();
const  productController =require('../controllers/product');
 

router.get('/', productController.getAllProducts);

router.post('/addproduct', productController.addProduct);
router.get('/:id', productController.getSingleProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports=router;
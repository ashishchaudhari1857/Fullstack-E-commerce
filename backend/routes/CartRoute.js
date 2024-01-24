  const  express =require('express')
  const router =express.Router();
  const cartController = require('../controllers/cartController');


   router.post('/create' ,cartController.create_cart)
   router.post('/add_to_cart' ,cartController.add_to_cart)
   router.delete('/delete/:cartId/:productId' ,cartController.remove_from_cart)
   router.get('/getcart/:cartId' ,cartController.getCart)
   router.delete('/remove_from_cart_at_once/:cartId/:productId' ,cartController.remove_from_cart_at_once)



module.exports=router;
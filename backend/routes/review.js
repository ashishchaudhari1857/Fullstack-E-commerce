const express=require('express')
const router=express.Router();

const ReviewController=require('../controllers/review')

router.post('/postreview/:id' ,ReviewController.AddReviewTo)
router.get('/:id' ,ReviewController.getReview)

module.exports=router;
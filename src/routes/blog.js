const router = require('express').Router();
const blogController = require('../controllers/blogController');
const {requireSign} = require('../middleware/auth')



//C Create
router.post('/blog', requireSign,blogController.store);

//R Read
router.get('/blog', requireSign,blogController.view);

//U Update
router.put('/blog/:id', requireSign,blogController.update);

//D Delete
router.delete('/blog/:id', requireSign,blogController.destroy);



module.exports = router;
const router = require('express').Router();
const authController = require('../controllers/authController');
const {requireSign} = require('../middleware/auth')



router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update-profile',requireSign, authController.updateProfile);


module.exports = router; 
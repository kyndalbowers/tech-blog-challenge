app.post('/api/users/login', userController.login);

const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/profile', userController.getProfile);

router.post('/logout', userController.logout);

module.exports = router;
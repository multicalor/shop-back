const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.put('/registration', userController.registration)
router.post('/update', authMiddleware, userController.update)
router.get('/auth', authMiddleware, userController.check)
router.get('/login', userController.login)

//todo ADMIN functions
// router.put('/admin', checkRole('ADMIN'),  userController.changeRole);
// router.put('/seller', checkRole('SELLER'),  userController.changeRole);

module.exports = router;

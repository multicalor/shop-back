const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const validationMiddleware = require('../middleware/validationMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.put('/registration',validationMiddleware,  userController.registration)//
router.post('/update', validationMiddleware, authMiddleware, userController.update)
router.get('/auth', authMiddleware, userController.check)
router.get('/login', userController.login)//validationMiddleware,

//todo ADMIN functions
// router.put('/admin', checkRole('ADMIN'),  userController.changeRole);
// router.put('/seller', checkRole('SELLER'),  userController.changeRole);

module.exports = router;

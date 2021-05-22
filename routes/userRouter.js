const Router = require('express');
const { body, validationResult } = require('express-validator');
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const validationMiddleware = require('../middleware/validationMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

// router.put('/registration',validationMiddleware,  userController.registration)//
router.get('/',  authMiddleware, userController.getUser);
//todo remove to middlver
router.put('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const { value, msg } = errors.array()[0];
        return res.status(200).json({errors: { value, msg }});
      }
      userController.registration(req, res)
      console.log("test")
    }
    )
router.post('/update', validationMiddleware, authMiddleware, userController.update)
router.get('/auth', authMiddleware, userController.check)
router.post('/login', userController.login)//validationMiddleware,

//todo ADMIN functions
// router.put('/admin', checkRole('ADMIN'),  userController.changeRole);
// router.put('/seller', checkRole('SELLER'),  userController.changeRole);

module.exports = router;

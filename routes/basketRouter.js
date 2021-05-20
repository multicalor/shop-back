const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.create);
router.get('/',authMiddleware, basketController.getAll);
router.put('/',authMiddleware, authMiddleware, basketController.update);
router.put('/', authMiddleware, basketController.removeOne);

module.exports = router;

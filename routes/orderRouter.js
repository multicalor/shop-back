const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, orderController.buy);
router.get('/',authMiddleware, orderController.getAll);
router.put('/',authMiddleware, orderController.update);
router.patch('/',checkRole("ADMIN"), authMiddleware,  orderController.status);

module.exports = router;

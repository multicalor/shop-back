const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.put('/', authMiddleware, basketController.create);
router.get('/', basketController.getAll);
router.post('/', basketController.addOne);
router.delete('/', authMiddleware, basketController.deleteOne);
// router.delete('/', basketController.buy);

module.exports = router;

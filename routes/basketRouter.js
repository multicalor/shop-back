const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.create);
router.get('/',authMiddleware, basketController.getAll);
router.post('/del', authMiddleware, basketController.removeOne);
router.put('/', authMiddleware, basketController.addOne);
router.patch('/',authMiddleware, basketController.update);
// router.('/', authMiddleware, basketController.updateOne);


module.exports = router;

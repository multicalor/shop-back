const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.create);
router.get('/',authMiddleware, basketController.getAll);
router.delete('/', authMiddleware, basketController.removeOne);
router.put('/', authMiddleware, basketController.addOne);
// router.('/', authMiddleware, basketController.updateOne);
// router.put('/',authMiddleware, basketController.update);


module.exports = router;

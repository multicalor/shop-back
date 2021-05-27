const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.put('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.get('/cat', typeController.getCategory);
router.put('/link', typeController.linkToCategories);

module.exports = router;


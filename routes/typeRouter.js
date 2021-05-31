const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.get('/hard', typeController.getAllR);
router.get('/:id', typeController.getCategory);
// router.get('/:parentId', typeController.getCatalog);

module.exports = router;


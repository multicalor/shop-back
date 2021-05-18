const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.delete('/:id', basketController.create);
router.delete('/:id', basketController.getAll);
router.post('/basket', basketController.add);
router.put('/basket', basketController.delete);
router.delete('/:id', basketController.buy);





module.exports = router;

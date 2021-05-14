const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');

router.use('/user', userRouter);

//todo implement admin and seller function
// router.use('/admin', userRouter);
// router.use('/seller', userRouter);

router.use('/product', productRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);


module.exports = router;


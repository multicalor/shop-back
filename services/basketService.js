const {Product, ProductInfo, BasketProduct, Basket} = require('../models/models')
class BasketService {

  async create(productIds, userId) { // productIds[], userId int
    const basket = await Basket.findOne({where: {userId}});
    let basketProducts = [];
      for (const productId of productIds) {
        basketProducts.push( await BasketProduct.create({productId, basketId:basket.id}))// = await BasketProduct.create({productId, userId})
      }
    return basketProducts;
  }
  //todo implement return item id of product basket
  async getAll(userId) {
    let basketProducts = await BasketProduct.findAll(
        {where: {basketId: userId}});

    const productsIds = basketProducts.map(product => {
      console.log('------>', product.dataValues.id);
       return {productId: product.productId, id:product.id }
    })

    let productsInfo = [];
    for (let prodId of productsIds){
      let { name, id, price, img, info, typeId, brandId } = (await Product.findOne(
          {
            where: {id: prodId.productId},
            include: [{model:ProductInfo, as: 'info'}]
          },
      ))
      info = info.map( i => {
        const {title, description} = i;
        return {title, description};
      });
      productsInfo.push({ name, id, price, img, info, typeId, brandId, productBasketId: prodId.id});
    }
    return productsInfo;
  }

  async update(productIds, userId) {
    await BasketProduct.destroy(
        {where: {basketId: userId}});
    const basket = await Basket.findOne({where: {userId}});
    let basketProducts = [];
    for (const productId of productIds) {
      basketProducts.push( await BasketProduct.create({productId, basketId:basket.id}))// = await BasketProduct.create({productId, userId})
    }
    return basketProducts;
  }


  async addOne(productId, userId) { // productIds[], userId int
    const basket = await Basket.findOne({where: {userId}});
    return  await BasketProduct.create({productId, basketId:basket.id})// = await BasketProduct.create({productId, userId})
  }

  async removeOne(userId, productBasketId) { // productIds[], userId int
    const basket = await Basket.findOne({where: {userId}});
    return  await BasketProduct.destroy({ id:productBasketId})// = await BasketProduct.create({productId, userId})
  }

}


module.exports = new BasketService();
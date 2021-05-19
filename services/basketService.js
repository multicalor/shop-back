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

  async getAll(userId) {
    let basketProducts = await BasketProduct.findAll(
        {where: {basketId: userId}});

    const productsIds = basketProducts.map(product => {
       return product.productId
    })

    let productsInfo = [];
    for (let prodId of productsIds){
      let { name, id, price, img, info, typeId, brandId } = (await Product.findOne(
          {
            where: {id: prodId},
            include: [{model:ProductInfo, as: 'info'}]
          },
      ))
      info = info.map( i => {
        const {title, description} = i;
        return {title, description};
      });
      productsInfo.push({ name, id, price, img, info, typeId, brandId });
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

  //todo transfer to sevice
  async buy(req, res) {

  }
}


module.exports = new BasketService();
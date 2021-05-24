const {Product, ProductInfo, BasketProduct, Basket} = require('../models/models')
const sequelize = require('../db');

class BasketService {

  async create(productsSet, userId) { // productIds[], userId int
    const basket = await Basket.findOne({where: {userId}});
    let productsId = [];
    let basketProducts = [];
      for (const product of productsSet) {
        BasketProduct.create({productId: product.productId, quantity:product.quantity, basketId:basket.id});
        productsId.push(product.productId)

      }
    basketProducts = await Product.findAll({where: {id: productsId}})
    return basketProducts;
  }
  //todo implement return item id of product basket
  async getAll(userId) {
    let basket = await Basket.findOne(
        {

          where: {userId},
          attributes:[],//'id'
          include: [{model:BasketProduct,
            include: [{model: Product,
              attributes:["name", "price", "id", "img"]
            }],
            attributes:["id", "quantity"],
          }]});
  //   const basketId = basket.id;//[0].dataValues.
  //   let basketProducts = await BasketProduct.findAll(
  //       {
  //         where: {basketId}
  //       },
  // );

    // attributes: [
    //   'id',
    //   'quantity',
    //   // 'name ',
    //   [sequelize.fn('SUM', sequelize.col('ammount')), 'totalAmount'],
    // ],
    // console.log(basketProducts)

    // const productsIds = basketProducts.map(product => {
    //   // console.log('------>', product.dataValues);
    //    return {productId: product.productId, id:product.id }
    // })
    //
    // let productsInfo = [];
    // for (let prodId of productsIds){
    //   let { name, id, price, img, info, typeId, brandId } = (await Product.findOne(
    //       {
    //         attributes: [
    //           'id',
    //           'name',
    //           'price',
    //           [sequelize.fn('SUM', sequelize.col('price')), 'totalAmount']
    //           ],
    //         where: {id: prodId.productId},
    //         // include: [{model:ProductInfo, as: 'info'}]
    //       },
    //   ))
    //   info = info.map( i => {
    //     const {title, description} = i;
    //     return {title, description};
    //   });
    //   productsInfo.push({ name, id, price, img, info, typeId, brandId, productBasketId: prodId.id});
    // }
    return basket;
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

  async updateOne(oldProductId, newProduct , userId) {
    let product = await BasketProduct.findOne(
        {
          where: {id: oldProductId},
        });
    product = await product.update({productId:newProduct.productId,quantity:newProduct.quantity})

    return product;
  }

  async addOne(productId, quantity, userId) { // productIds[], userId int

    const { id } = await Basket.findOne(
        {
          where: {userId},attributes:['id'],
        })
    try{
      const product = await BasketProduct.findOne(
          {
            where: {basketId:id, productId: productId}
          });

      if (product){

        return await product.update( {quantity})
      }
    }catch(e) {
      return res.status(403).json({message: e.message })

        }
     await BasketProduct.create({productId, quantity, basketId:id})
    return true;

  }

  async removeOne(productId, userId) { // productIds[], userId int
    const basket = await Basket.findOne({where: {userId}});
    return  await BasketProduct.destroy({where: {productId}} )// = await BasketProduct.create({productId, userId})
  }

  async buy(userId) { // productIds[], userId int
    const basket = await Basket.findOne({where: {userId}, attributes:["id"]});
    return console.log("basket", basket)
    // return  await BasketProduct.destroy({ id:basketItemId})// = await BasketProduct.create({productId, userId})
  }

}


module.exports = new BasketService();
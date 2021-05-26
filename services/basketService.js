const {Product, ProductInfo, BasketProduct, Basket} = require('../models/models')
const sequelize = require('../db');
const ApiError = require('../error/ApiError')


class BasketService {
// productIds[], userId int
//   async create(productsSet, userId) {
//     console.log("productsSet", productsSet);
//     const basket = await Basket.findOne({where: {userId}});
//     let productsId = [];
//     let basketProducts = [];
//       for (const product of productsSet) {
//         BasketProduct.create({productId: product.productId, quantity:product.quantity, basketId:basket.id});
//         productsId.push(product.productId)
//
//       }
//     basketProducts = await Product.findAll({where: {id: productsId}})
//     return basketProducts;
//   }

  //todo : refactor to ORM style check наличие товаров в карзине,
  async getAll(userId) {
    let { basket_products } = await Basket.findOne(
        {
          where: {userId},
          group:["basket.id"],
          attributes:['id'],//'id'
          include: [{model:BasketProduct,
            raw:true,
            attributes:["quantity"],
            include: [{model: Product,
              attributes:["id", "name", "price", "img"]
            }],

          }]});

    let coast = 0;

    const products = basket_products.map(item => {
      const { quantity } = item
      const { id, name, price, img } = item.product;
      coast+=(price*100)*quantity/100;
      return { id, name,  img, price, quantity,  products_coast:(item.dataValues.quantity*(item.dataValues.product.price*100))/100,};
    })
    // if( coast === 0 ){return "empty basket"};
    // console.log(basket_products)
    return {coast:coast, products, basket_products};//
  }

  async create(products, userId) {
    const {basket_products} = await this.getAll(userId)
    const oldProducts = basket_products.dataValues
    console.log(oldProducts, products)
    // await BasketProduct.destroy(
    //     {where: {basketId: userId}});
    // const basket = await Basket.findOne({where: {userId}});

    for (const product of products) {

      await this.addOne(product.productId, product.quantity, userId)// = await BasketProduct.create({productId, userId})
    }
    // console.log(await this.getAll(userId))
    return this.getAll(userId);
  }

  // async updateOne(oldProductId, newProduct , userId) {
  //   let product = await BasketProduct.findOne(
  //       {
  //         where: {id: oldProductId},
  //       });
  //   product = await product.update({productId:newProduct.productId,quantity:newProduct.quantity})
  //
  //   return product;
  // }

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
      await BasketProduct.create({productId, quantity, basketId:id})
      return true;
    }catch(e) {
      if ("insert or update on table \"basket_products\" violates foreign key constraint \"basket_products_productId_fkey\"" === e.message){
        return ApiError.badRequest("incorect product ID")
      }
      return ApiError.badRequest(e.message)

      // return res.status(403).json({message: e.message })
    }


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
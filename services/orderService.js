const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, BasketProduct, Basket, Order, User} = require('../models/models')
const ApiError = require('../error/ApiError')

const jwt = require('jsonwebtoken')

class OrderService {
  //todo
  async buy(userId) {

    const {basket_products} = await Basket.findOne(
        {
          where: {userId},
          attributes:[],//'id'
          include: [{model:BasketProduct,
            include: [{model: Product,
              attributes:["price", "id"]
            }],
            attributes:["id", "quantity"],
          }]});


    const order = await OrderProducts.create({userId, coast:100});// attributes:["id"]
    console.log("order", order)
    // console.log(basketId.id);
    // const {id} = basketId;
    // const products = await BasketProduct.findAll({
    //   where:{basketId:id},
    //
    //   attributes:["id"]
    // })
    return  basket_products;
  }

  async getAll(id) {
    return  await User.findOne({
      attributes:[],//'id'
      where: {id},
      include: [{model:Order,
        include: [{model: Product,
          attributes:["name", "price", "id"]
        }],
         attributes:[]}],
    })
  }
  //todo
  async getOne(productId) {
  }

  async update(productId) {
  }

  async status (productId){

  }
}

module.exports = new OrderService();
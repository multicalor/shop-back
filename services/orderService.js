
const {Product, ProductInfo, BasketProduct, Basket, Order, User, OrderProducts} = require('../models/models')
const ApiError = require('../error/ApiError')
const basketService = require('./basketService')

const jwt = require('jsonwebtoken')

function payment() {
  return true;
}

class OrderService {
  //todo
  async buy(userId) {
    // console.log("coast, products", userId);
    const {coast, products} = await basketService.getAll(userId);//
    if( coast === 0 ){return "empty basket"};
    console.log("coast", coast)
    const order = await Order.create({userId, coast});// attributes:["id"]
    console.log("order", order.id);
      for (let info of products) {
        console.log(info)
        await OrderProducts.create({orderId:order.id, quantity:info.quantity, productId:info.id})
    };
    return  order;
  }

  async getAll(userId) {
   return await Order.findAll({
        attributes:["coast", "status"],
        where: {userId},
          include: [{model: OrderProducts,
            include: [{model: Product,
            attributes:["name", "price", "id"]
          }],
          }]})
  }

  async getOne(orderId, userId) {
    return await Order.findAll({
      attributes:["coast", "status"],//'id'
      where: {userId},
      include: [{model: OrderProducts,
        include: [{model: Product,
          attributes:["name", "price", "id"]
        }],
      }]})
  }
  //todo
  async getOne(id, userId) {
    return await Order.findOne({
      attributes:["id","coast", "status"],//'id'
      where: {id},
      include: [{model: OrderProducts,
        include: [{model: Product,
          attributes:["name", "price", "id"]
        }],
      }]})
  }
  async payment (id, userId){
    console.log(id)
    const order = await Order.findOne({where: {id, userId}})
    await order.update({status: "PAID"})
    if(payment()){
      await BasketProduct.destroy({where:{basketId:userId}});
      return true;
    }
    return order;
  }

  async updateStatus(status, id, userId) {
    const order = await Order.findOne({where: {id, userId}})
    return await order.update({status})
  }


  async status (productId){

  }
}

module.exports = new OrderService();
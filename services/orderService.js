
const {Product, ProductInfo, BasketProduct, Basket, Order, User, OrderProducts} = require('../models/models')
const ApiError = require('../error/ApiError')
const basketService = require('./basketService')


function payment() {// pass function for payment service
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
      await BasketProduct.destroy({where:{basketId:userId}});
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

  //todo ошибка при получении orderId больше последнего
  async payment (id, userId) {
    console.log(id)
    let order = await Order.findAll({where: {userId}})
    console.log("order.length------>", order.length)
    if(id<=order.length){
      order = await Order.findOne({where: {id, userId}})
      await order.update({status: "PAID"})
      if(payment()){
        return true;
      }
      return order;
    }
    return "incorect order id"
  }

  async updateStatus(status, id, userId) {
    const order = await Order.findOne({where: {id, userId}})
    return await order.update({status})
  }
  async status (productId){
  }
}

module.exports = new OrderService();
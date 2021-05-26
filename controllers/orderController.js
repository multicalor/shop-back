const {Product, ProductInfo, Order} = require('../models/models')
const OrderService = require('../services/orderService')
const ApiError = require('../error/ApiError')

class productController {
  async buy(req, res, next) {
    try {
      const {id} = req.user;
      let order = await OrderService.buy(id);
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }

  async getAll(req, res) {
    const { id } = req.user;

    console.log("req.user", id)

    let products = await OrderService.getAll(id);
    return res.json(products);
  }

  // //todo transfer to sevice
  // async getOne(req, res) {
  //   const {id} = req.params;
  //   console.log(id)
  //   const product = await OrderService.getOne(id);
  //   return res.json(product);
  // }

  //todo transfer to sevice
  async payment(req, res) {
    // console.log()
    const {id} = req.user;
    console.log(req.user)
    const {orderId} = req.body;
    console.log("orderId", orderId)
    const product = await OrderService.payment(orderId, id);
    return res.json(product);
  }

  async update(req, res) {
    // const {id} = req.params;
    const newProductData = req.body;

  }
  //todo transfer to sevice
  async getOne(req, res) {
    const {id} = req.params;
    const {user} = req;
    const product = await OrderService.getOne(id, user.id);
    return res.json(product);
  }

}


module.exports = new productController();
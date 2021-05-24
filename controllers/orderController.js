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
  //todo transfer to sevice
  async getOne(req, res) {
    const {id} = req.params;
    console.log(id)
    const product = await OrderService.getOne(id);
    return res.json(product);
  }


  async update(req, res) {
    // const {id} = req.params;
    const newProductData = req.body;

  }
  //todo transfer to sevice
  async status(req, res) {
    // const {id} = req.params;
    // const {id} = req.params;
    // const product ;
    // return res.json(product);
  }

}


module.exports = new productController();
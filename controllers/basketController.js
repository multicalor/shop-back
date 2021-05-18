const {Product, ProductInfo, User, BasketProduct, Basket} = require('../models/models')
const basketService = require('../services/basketService')
const ApiError = require('../error/ApiError')

class BasketController {
  async create(req, res) {
    console.log(req.body);
    console.log('user', req.user);
    const { productIds } = req.body;
    const { id } = req.user;
    basketService.create(productIds, id);
    // return res.json(basket);
  }

  async getAll(req, res) {
    return res.json();
  }

  async addOne(req, res, next) {
    console.log(req.body);
    const {productId, userId} = req.body;
    let basket;
    if (productId && userId){
      throw {status: 200, message: "incorrect product or user" }
    }
    if (productId && userId){
      basket = await basketService.create(productId, userId);
    }

    return res.json({id:basket.id, userId: basket.userId, productId: basket.productId });

  }
  //todo transfer to sevice
  async deleteOne(req, res) {
    return res.json();
  }

  async buy(req, res) {

  }
}


module.exports = new BasketController();
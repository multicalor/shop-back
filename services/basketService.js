const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, User, BasketProduct, Basket} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketService {
  async create(productIds, userId) {
    productIds = JSON.parse(productIds)
    const basket = await Basket.findOne({where: {userId}});
    let basketProducts = [];

      for (const productId of productIds) {
        basketProducts.push(await BasketProduct.create({productId, basketId:basket.id}))// = await BasketProduct.create({productId, userId})

      // } else {
      //     basketProducts = await BasketProduct.create({productIds, userId});
      // }

      // return basketProducts;
    }
  }
  async getAll(req, res) {

  }

  async addOne(req, res, next) {
    try {

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }
  //todo transfer to sevice
  async deleteOne(req, res) {

  }

  async buy(req, res) {

  }
}


module.exports = new BasketService();
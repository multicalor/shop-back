const {Product, ProductInfo, User, BasketProduct, Basket} = require('../models/models')
const BasketService = require('../services/basketService')
const ApiError = require('../error/ApiError')

class basketController {
  async create(req, res) {

    return res.json();
  }

  async getAll(req, res) {

    return res.json();
  }

  async add(req, res, next) {
    try {

      return res.json();
    } catch (e) {

      next(ApiError.badRequest(e.message));
    }

  }
  //todo transfer to sevice
  async delete(req, res) {
    return res.json();
  }

  async buy(req, res) {

  }
}


module.exports = new basketController();
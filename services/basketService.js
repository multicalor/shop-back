const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo} = require('../models/models')
const ProductService = require('../services/productService')
const ApiError = require('../error/ApiError')

class basketService {
  async create(req, res) {

  }

  async getAll(req, res) {

  }

  async add(req, res, next) {
    try {

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }
  //todo transfer to sevice
  async delete(req, res) {

  }

  async buy(req, res) {

  }
}


module.exports = new basketService();
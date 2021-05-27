const {Product, ProductInfo} = require('../models/models')
const ProductService = require('../services/productService')
const ApiError = require('../error/ApiError')

class productController {
  async create(req, res, next) {
    try {
      const productData = req.body;
      console.log(productData);
      // process.exit();

      let {img} = req.files;
      let product = await ProductService.create(productData, img);
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }

  async getAll(req, res) {
    let product = await ProductService.getAll(req.query);
    return res.json(product);
  }

  async getOne(req, res) {
    const {id} = req.params;
    console.log(id)
    const product = await ProductService.getOne(id);
    return res.json(product);
  }

  async addToBasket(req, res) {

  }

  async update(req, res) {
    // const {id} = req.params;
    const newProductData = req.body;

  }

}


module.exports = new productController();
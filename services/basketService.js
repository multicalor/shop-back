const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo} = require('../models/models')
const ProductService = require('../services/productService')
const ApiError = require('../error/ApiError')

class ProductService {
  async create(req, res, next) {
    try {
      const productData = req.body;
      productData.img = req.files;
      let product = await ProductService(productData);
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }
  //todo transfer to sevice
  async addProduct(id) {
    let {brandId, typeId, limit, page} = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let product;
    if(!brandId && !typeId) {
      product = await Product.findAndCountAll({limit, offset})
    }
    if(brandId && !typeId) {
      product = await Product.findAndCountAll({where:{brandId}, limit, offset})
    }
    if(!brandId && typeId) {
      product = await Product.findAndCountAll({where:{typeId}, limit, offset})
    }
    if(brandId && typeId) {
      product = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
    }
    return res.json(product)
  }
  //todo transfer to sevice
  async removeProduct(id) {
    const {id} = req.params;
    const product = await Product.findOne(
        {
          where: {id},
          include: [{model:ProductInfo, as: 'info'}]
        },
    )
    return res.json(product);
  }
  //todo transfer to sevice
  async addToBasketProducts(req, res) {
    // const {id} = req.params;
    // const {id} = req.params;
    // const product ;
    // return res.json(product);
  }
}


module.exports = new productController();
const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, BasketProduct, Basket} = require('../models/models')
const ApiError = require('../error/ApiError')

const jwt = require('jsonwebtoken')

class ProductService {
  //todo
  async buy(basketId, productIdList) {

  }
  //todo
  async getAll(productData) {
    let {brandId, typeId, limit, page} = productData;
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
    return product
  }
  //todo
  async getOne(productId) {

    const product = await Product.findOne(
        {
          where: {id:productId},
          include: [{model:ProductInfo, as: 'info'}]
        },
    )
    return product;
  }

  async update(productId) {

    const product = await Product.findOne(
        {
          where: {id:productId},
          include: [{model:ProductInfo, as: 'info'}]
        },
    )
    return product;
  }

  async addProductToBasket (productId){

  }
}

module.exports = new ProductService();
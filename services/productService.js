const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, BasketProduct, Basket} = require('../models/models')
const ApiError = require('../error/ApiError')

const jwt = require('jsonwebtoken')

class ProductService {
  //todo
  async create(productData, img) {
      let {name, price, brandId, typeId, info} = productData;
      let fileName = uuid.v4()+".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const product = await Product.create({name, price, brandId, typeId, img: fileName});

      if (info) {
        info = JSON.parse(info);

        info.forEach(i => {
              console.log(i.title)
              ProductInfo.create({
                title: i.title,
                description: i.description,
                productId: product.id
              })
            }
        )
      }
      return product;
  }
  //todo test limit end page
  async getAll(productData) {
    let {brandId, typeId, limit, page} = productData;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let product;
    if(!brandId && !typeId) {
      product = await Product.findAndCountAll({limit, offset,
        include: [{model:ProductInfo, as: 'info'}]})
    }
    if(brandId && !typeId) {
      product = await Product.findAndCountAll({where:{brandId}, limit, offset,
        include: [{model:ProductInfo, as: 'info'}]})
    }
    if(!brandId && typeId) {
      product = await Product.findAndCountAll({where:{typeId}, limit, offset,
        include: [{model:ProductInfo, as: 'info'}]})
    }
    if(brandId && typeId) {
      product = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset,
        include: [{model:ProductInfo, as: 'info'}]})
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
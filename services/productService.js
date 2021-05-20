const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo, BasketProduct, Basket, Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError')

const jwt = require('jsonwebtoken');

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
    limit = limit || 50;
    let offset = page * limit - limit, products, brand, type;

    if (!brandId && !typeId) {
      products = await Product.findAndCountAll({ //[{},{brandId}]------------------------------------------------------------
        limit, offset,
        include: [{model: ProductInfo, as: 'info'}, {model: Type }, {model: Brand}]//, {model: Type}as: 'type'

      })
    }
    if (brandId && !typeId) {
      products = await Product.findAndCountAll({
        where: {brandId}, limit, offset,
        include: [{model: ProductInfo, as: 'info'}]
      })
    }
    if (!brandId && typeId) {
      products = await Product.findAndCountAll({
        where: {typeId}, limit, offset,
        include: [{model: ProductInfo, as: 'info'}]
      })
    }
    if (brandId && typeId) {
      products = await Product.findAndCountAll({
        where: {typeId, brandId}, limit, offset,
        include: [{model: ProductInfo, as: 'info'}]
      })
      let brand = await Brand.findOne(
          {
            where: {id:product.dataValues.brandId},
          },
      );
      products.dataValues.brand = brand.name
    }

    let productsInfos = products.rows.map(product => {
      let { name, id, price, img, info, typeId, brandId, brand, type} = product.dataValues; //
      info = product.info.map( i => {
        const {description} = i.dataValues;
        return description;
      });
      return { name, id, price, img, info, typeId, brandId, brand: brand.name, type: type.name };
  })
    return productsInfos
  }
  //todo
  async getOne(productId) {

    const product = await Product.findOne(
        {
          where: {id:productId},
          include: [{model:ProductInfo, as: 'info'}, {model: Type }, {model: Brand}]//
        },
    )
    console.log(product)
    let { name, id, description, price, img, info, typeId, brandId, brand, type} = product.dataValues;

    info = info.map( i => {
      const {title, description} = i;
      return {title, description};
    });
    return { name, id, description, price, img, info, typeId, brandId, brand: brand.name, type: type.name };
  }
// todo update product
  async update(productId) {

    const product = await Product.update(
        {
          where: {id:productId},
          include: [{model:ProductInfo, as: 'info'}]
        },
    )
    console.log(product)

  }

  async addProductToBasket (productId){

  }
}

module.exports = new ProductService();
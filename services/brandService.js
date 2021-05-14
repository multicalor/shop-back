const {Brand} = require('../models/models');

class BrandService {
  async create(name) {
    const brand = await Brand.create({name})
    return brand;
  }

  async getAll() {
    const brands = await Brand.findAll();
    return brands
  }
  //todo Delete brand from ADMIN role
  // async delteOne(req, res){
  //
  // }
}

module.exports = new BrandService()
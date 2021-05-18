const {Brand} = require('../models/models');

class BrandService {
  async create(name) {
    const brand = await Brand.create({name})
    return brand;
  }

  async getAll() {
    const brands = await Brand.findAll();
    const brandsInfos = brands.map(brand => {
      return {"name":brand.name, "id": brand.id};
    })
    return brandsInfos
  }
  //todo Delete brand from ADMIN role
  // async delteOne(req, res){
  //
  // }
}

module.exports = new BrandService()
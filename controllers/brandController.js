const {Brand} = require('../models/models')
const brandService = require('../services/brandService')

class BrandController {
  async create(req, res) {
    const {name} = req.body;
    const brand = await brandService.create(name)
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await brandService.getAll();
    return res.json(brands)
  }
  //todo Delete brand from ADMIN role
  async delteOne(req, res){

  }
}

module.exports = new BrandController();
const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');
const typeService = require('../services/typeService')

class TypeController {
  async create(req, res) {
    const {name} = req.body;
    const type = await typeService.create(name);
    // const type = await Type.create({name})
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await typeService.getAll();
    // const types = await Type.findAll();
    return res.json(types)
  }
  //todo Delete type
  async delteOne(req, res){

  }
}

module.exports = new TypeController();
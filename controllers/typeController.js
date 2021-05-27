const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');
const typeService = require('../services/typeService')

class TypeController {
  async create(req, res) {
    const {name, parentId} = req.body;
    const type = await typeService.create(name, parentId);
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await typeService.getAll();
    return res.json(types)
  }

  async linkToCategories(req, res) {
    const {ParentTypeId, childId} = req.body;
    const types = await typeService.linkToCategories(ParentTypeId, childId);
    return res.json(types)
  }
  //todo Delete type
  async getCategory(req, res){
    const {ParentTypeId} = req.body;
    console.log("categoryId", ParentTypeId)
    const category = await typeService.getCategory(ParentTypeId);

    return res.json(category);
  }
}

module.exports = new TypeController();
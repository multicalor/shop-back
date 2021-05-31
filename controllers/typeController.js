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

  async getAllR(req, res) {
    const types = await typeService.getAllR();
    return res.json(types)
  }

  async linkToCategories(req, res) {
    const {ParentTypeId, childId} = req.body;
    const types = await typeService.linkToCategories(ParentTypeId, childId);
    return res.json(types)
  }
  //todo Delete type
  async getCategory(req, res){
    const {parentId} = req.params;
    // console.log("categoryId", parentId)
    const category = await typeService.getCategory(parentId);

    return res.json(category);
  }

  async getCatalog(req, res){
    const {id} = req.params;
    // console.log("categoryId", parentId)
    const catalog = await typeService.getCatalog(id);

    return res.json(catalog);
  }
}

module.exports = new TypeController();
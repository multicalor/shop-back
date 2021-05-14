const {Type} = require('../models/models');

class TypeService {
  async create(name) {
    const type = await Type.create({name})
    return type;
  }

  async getAll() {
    const types = await Type.findAll();
    console.log(types)
    return types;
  }
  //todo Delete brand from ADMIN role
  async delteOne(req, res){

  }
}

module.exports = new TypeService()
const {Type} = require('../models/models');

class TypeService {
  async create(name) {
    const type = await Type.create({name})
    return {"name":type.name, "id": type.id};
  }

  async getAll() {
    const types = await Type.findAll();
    console.log(types);
    const answer = types.map(type => {
      return {"name":type.name, "id": type.id};
    })
    return answer;
  }
  //todo Delete brand from ADMIN role
  async delteOne(req, res){

  }
}

module.exports = new TypeService()
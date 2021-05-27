const {Type, TypeSubType} = require('../models/models');

class TypeService {
  async create(name, parentId) {
    const type = await Type.create({name, parentId})
    return {"name": type.name, "id": type.id, parentId:type.parentId};
  }

  // async update(name, parentId) {
  //   const type = await Type.update({name, parentId})
  //   return {"name": type.name, "id": type.id, parentId:type.parentId};
  // }


  async getAll() {
    const types = await Type.findAll(
        {
          attributes:['id', 'name', 'parentId'],
        }
    );
    // console.log(types);
    // const typesInfo = types.map(type => {
    //   return {"name": type.name, "id": type.id};
    // })
    return types;
  }
  // async linkToCategories

  async linkToCategories(ParentTypeId, childId){
    const link = await TypeSubType.create({ParentTypeId, childId})
    console.log("link----->", link);
    return link;
  }
//+++++++++
  async getCategory(parentId) {
    let category = await Type.findAll(
        {

          where: {parentId},
          attributes:['id', 'name', 'parentId'],
          include:[{model:Type, as: 'children',
            attributes:['id', 'name', 'parentId']}]
        }
        );
  return category;
  }


  async getCatalog(id) {
  let catalog = await Type.findAll(
      {
        where: {id},
        attributes:['id', 'name', 'parentId'],
        include:[{model:Type, as: 'children', attributes:['id', 'name', 'parentId']}]
      }
  );
  return catalog;
}
}

module.exports = new TypeService()
const {Type, TypeSubType} = require('../models/models');


function makeTree(arr) {
  const tree = {};
  for (let i = 0; i < arr.length; i++) {
    const e = arr[i],
        child = arr.filter((el) => el.parentId == e.id),
        parent = arr.find((el) => el.id == e.parentId);
    e.child = child;
    if (!parent) {
      tree[i] = e;
    }
  }
  return tree[0];
}

async function rTree( parentId=null) {
  let types = await Type.findAll(
      {where: {parentId},
        attributes:['id', 'name', 'parentId'],
      }
  );
  if(types.length === 0){
    return []
  }else {
    return  types.map(async type => {
      let category = type.dataValues;
      category.child = await rTree(category.id)
      return category;
    })
  }
}

class TypeService {
  async create(name, parentId) {
    const type = await Type.create({name, parentId})
    return {"name": type.name, "id": type.id, parentId:type.parentId};
  }

  async getAll() {
    const types = await Type.findAll(
        {
          attributes:['id', 'name', 'parentId'],
        }
    );
    const typesInfo = types.map(type => {
            return {"name": type.name, "id": type.id, "parentId": type.parentId};
    })
    return makeTree(typesInfo);
  }

  async getAllR( parentId=null) {
      let types = await Type.findAll(
          {where: {parentId},
            attributes:['id', 'name', 'parentId'],
          }
      );

      if(types.length === 0){
        return []
      }else {
        let result = []
        for (let type of types ){
          let category = type.dataValues;
          category.child = await this.getAllR(category.id)
          result.push(category) ;
        }
        console.log(result)
        return result
      }
    }


  // async linkToCategories(ParentTypeId, childId){
  //   const link = await TypeSubType.create({ParentTypeId, childId})
  //   console.log("link----->", link);
  //   return link;
  // }

  async getCategory(parentId) {
    return  await Type.findAll(
        {

          where: {parentId},
          attributes:['id', 'name', 'parentId'],
          include:[{model:Type, as: 'children',
            attributes:['id', 'name', 'parentId']}]
        }
        );
  }


  async getCatalog(id) {
    return  await Type.findAll(
        {

          where: {id},
          attributes:['id', 'name', 'parentId'],
          include:[{model:Type, as: 'children',
            attributes:['id', 'name', 'parentId']}]
        }
    );
  }
}

module.exports = new TypeService()
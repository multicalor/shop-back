const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName:{type: DataTypes.STRING, allowNull: false},
  lastName:{type: DataTypes.STRING, allowNull: true},
  phone:{type: DataTypes.STRING, unique:true, allowNull: false},
  email:{type: DataTypes.STRING, unique:true},
  password:{type: DataTypes.STRING},
  role:{type: DataTypes.STRING, defaultValue:"USER"},
})

const Basket = sequelize.define('basket',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Order = sequelize.define('order',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  coast:{type: DataTypes.DECIMAL(10, 2) , allowNull:false},
  status:{type: DataTypes.STRING, defaultValue: "CONFIRMED" },
})

const BasketProduct = sequelize.define('basket_product',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  quantity:{type: DataTypes.INTEGER , allowNull:false},
})

const Product = sequelize.define('product',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name:{type: DataTypes.STRING, unique:true, allowNull:false},
  description:{type: DataTypes.TEXT,  allowNull:true},
  price:{type: DataTypes.DECIMAL(10, 2) , allowNull:false},
  rating:{type: DataTypes.INTEGER, defaultValue: 0},
  img:{type: DataTypes.STRING, allowNull:false},
})


const Type = sequelize.define('type',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name:{type: DataTypes.STRING, unique:true, allowNull:false},
})

const Brand = sequelize.define('brand',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name:{type: DataTypes.STRING, unique:true, allowNull:false},
})

const Rating = sequelize.define('rating',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate:{type: DataTypes.INTEGER, allowNull:false},
})

const ProductInfo = sequelize.define('product_info',{
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title:{type: DataTypes.STRING, allowNull:false},
  description:{type: DataTypes.STRING, allowNull:false},
})

const TypeBrand = sequelize.define('type_brand', {
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
//todo write relations
const TypeSubType = sequelize.define('type_sub_type', {
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
//todo write relations
const OrderProducts = sequelize.define('order_products', {
  id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  quantity:{type: DataTypes.INTEGER , allowNull:false},
  // coast:{type: DataTypes.DECIMAL(10, 2) , allowNull:false},
  // status:{type: DataTypes.INTEGER, defaultValue: 0},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProducts);
OrderProducts.belongsTo(Order);

Product.hasMany(OrderProducts);
OrderProducts.belongsTo(Product);

// Type.belongsToMany(Type, {through: TypeSubType})
// Type.belongsToMany(Type, {through: TypeSubType});

Type.hasMany(Type, { as: 'children', foreignKey: 'parentId' });//, through: TypeSubType
Type.belongsTo(Type, { as: 'parents', foreignKey: 'parentId' });//, through: TypeSubType


module.exports = {
  User, Basket, BasketProduct, Product, Type, Brand, Rating, ProductInfo, TypeBrand, Order, OrderProducts, TypeSubType
}

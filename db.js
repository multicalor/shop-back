const { Sequelize } = require('sequelize');
// require('sequelize-hierarchy')(Sequelize);
// const Sequelize = require('sequelize-hierarchy')();

module.exports = new Sequelize(
    process.env.DB_NAME, //Название базы
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect:'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    }
)
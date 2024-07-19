require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});
  
const User = require('./user')(sequelize, DataTypes);
const Message = require("./message")(sequelize, DataTypes);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync();

module.exports = { sequelize, User, Message };
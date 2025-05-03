const { Sequelize } = require("sequelize");
const config = require("../config/config").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
    port: config.port,
  }
);

const User = require("./user")(sequelize);
const Doctor = require("./doctor")(sequelize);
const Slot = require("./slot")(sequelize);

// Ассоциации
Doctor.hasMany(Slot, { foreignKey: "doctorId" });
Slot.belongsTo(Doctor, { foreignKey: "doctorId" });
User.hasMany(Slot, { foreignKey: "userId" });
Slot.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  models: {
    User,
    Doctor,
    Slot,
  },
};
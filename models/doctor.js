module.exports = (sequelize) => {
  const { DataTypes } = sequelize.Sequelize;
  return sequelize.define("Doctor", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    middleName: DataTypes.STRING,
    specialization: { type: DataTypes.STRING, allowNull: false },
  });
};
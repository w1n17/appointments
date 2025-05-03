module.exports = (sequelize) => {
  const { DataTypes } = sequelize.Sequelize;
  return sequelize.define("Slot", {
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    isBooked: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
};
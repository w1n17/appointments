module.exports = ({ models }) => {
  models.Doctor.hasMany(models.Slot, { foreignKey: "doctorId" });
  models.Slot.belongsTo(models.Doctor, { foreignKey: "doctorId" });
  models.User.hasMany(models.Slot, { foreignKey: "userId" });
  models.Slot.belongsTo(models.User, { foreignKey: "userId" });
};

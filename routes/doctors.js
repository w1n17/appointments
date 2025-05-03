const router = require("express").Router();
const { models } = require("../models");

router.get("/", async (req, res) => {
  const doctors = await models.Doctor.findAll({
    include: [{
      model: models.Slot,
      where: { isBooked: false },
      attributes: ["id", "startTime"]
    }],
    attributes: ["id", "firstName", "lastName", "middleName", "specialization"]
  });
  res.json(doctors);
});

module.exports = router;
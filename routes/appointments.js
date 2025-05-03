const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const { models } = require("../models");

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const slot = await models.Slot.findByPk(req.body.slotId);
  if (!slot || slot.isBooked) return res.status(400).send("Slot is occupied");

  slot.isBooked = true;
  slot.userId = req.user.id;
  await slot.save();
  res.json(slot);
});

router.get("/", async (req, res) => {
  const appointments = await models.Slot.findAll({
    where: { userId: req.user.id },
    include: [{
      model: models.Doctor,
      attributes: ["firstName", "lastName", "middleName", "specialization"]
    }],
    attributes: ["id", "startTime"]
  });
  res.json(appointments);
});

module.exports = router;
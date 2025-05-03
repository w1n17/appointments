const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { models } = require("../models");

router.post("/login", async (req, res) => {
  const { email, password, name, phone } = req.body;
  let user = await models.User.findOne({ where: { email } });

  if (!user) {
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }
    user = await models.User.create({
      email,
      password: await bcrypt.hash(password, 10),
      name,
      phone,
    });
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
require("dotenv").config();
const express = require("express");
const { sequelize, models } = require("./models");

const app = express();
app.use(express.json());

// Инициализация БД
sequelize.sync({ force: true }).then(async () => {
  // Тестовые данные
  const doctors = await Promise.all([
    models.Doctor.create({
      firstName: "Иван",
      lastName: "Петров",
      middleName: "Сергеевич",
      specialization: "Терапевт"
    }),
    models.Doctor.create({
      firstName: "Анна",
      lastName: "Сидорова",
      specialization: "Хирург"
    })
  ]);

  // Генерация слотов
  for (const doctor of doctors) {
    const start = new Date().setHours(10, 0, 0, 0);
    for (let i = 0; i < 20; i++) {
      await models.Slot.create({
        startTime: new Date(start + i * 30 * 60000),
        endTime: new Date(start + (i + 1) * 30 * 60000),
        doctorId: doctor.id
      });
    }
  }

  console.log("Database initialized");
  app.listen(3000, () => console.log("Server started on port 3000"));
});

// Маршруты
app.use("/auth", require("./routes/auth"));
app.use("/doctors", require("./routes/doctors"));
app.use("/appointments", require("./routes/appointments"));
// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
const twilio = require("twilio");
const connectDB = require("./db/connection");
const CarSchema = require("./db/schema");

connectDB();
const client = new twilio(process.env.accountSid, process.env.authToken);
app.use(bodyParser.json());

app.post("/send-message/:carId", async (req, res) => {
  const { carId } = req.params;
  const { message } = req.body;

  const Car = await CarSchema.findOne({ carId });

  if (Car) {
    console.log("yes in ",Car)
    client.messages
      .create({
        body: message,
        from: "+12515720345", // Twilio number
        to: "+91"+Car.phone,
      })
      .then(() => res.status(200).send("Message sent to car owner"))
      .catch((err) => res.status(500).send(`Failed to send message ${err}`));
  } else {
    res.status(404).send("Car not found");
  }
});

app.post("/save-to-db", async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const newCar = new CarSchema({
      carId: data.carId,
      phone: data.phone,
    });
    await newCar.save();
    res.status(201).json({ msg: "Car registered", newCar });
  } catch (error) {
    return res.status(400).json({ msg: "Not able to save" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

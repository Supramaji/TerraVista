const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  url: { type: String, required: true },
  serviceName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  provider: { type: String, required: true },
  duration: { type: String, required: true },
});

const Service = model("Service", serviceSchema);

module.exports = Service;
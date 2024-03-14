const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  is_active: { type: Boolean, default: false },
  mailing_language: { type: String, enum: ['en', 'uk'], default: 'en', maxlength: 2},
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model('Event', EventSchema);
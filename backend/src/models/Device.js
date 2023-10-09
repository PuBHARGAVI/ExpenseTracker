const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: String,
  tokens: [String],
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device
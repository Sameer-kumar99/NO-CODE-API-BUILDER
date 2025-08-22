const mongoose = require('mongoose');

const EndpointSchema = new mongoose.Schema({
  method: String,
  path: String,
  schema: Object,
  mockConfig: Object
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  endpoints: [EndpointSchema],
  mockEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('Project', ProjectSchema);

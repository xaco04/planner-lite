const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, min: 1, max: 5, default: 3 },
  status: { type: String, enum: ['pending','in_progress','done'], default: 'pending' },
  dueDate: { type: Date },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' } // Relación con Project
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);

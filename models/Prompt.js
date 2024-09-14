const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  prompt: String,
  answer: String,
  is_ai: Boolean,
  created_by: String
}, { collection: 'prompts' });

module.exports = mongoose.model('Prompt', PromptSchema);

const express = require('express');
const router = express.Router();
const Prompt = require('../models/Prompt');

async function getRandomPrompt() {
  const count = await Prompt.countDocuments();
  const random = Math.floor(Math.random() * count);
  return Prompt.findOne().skip(random);
}

router.get('/', async (req, res) => {
  try {
    const prompt = await getRandomPrompt();
    
    if (!prompt) {
      return res.status(404).send('No prompts found');
    }

    res.render('game', { 
      user: req.user,
      prompt: prompt.prompt,
      answer: prompt.answer,
      isAI: prompt.is_ai
    });
  } catch (err) {
    console.error('Error fetching prompt:', err);
    res.status(500).send('Error fetching prompt');
  }
});

router.get('/next', async (req, res) => {
  try {
    const prompt = await getRandomPrompt();
    
    if (!prompt) {
      return res.status(404).json({ error: 'No prompts found' });
    }

    res.json({
      prompt: prompt.prompt,
      answer: prompt.answer,
      isAI: prompt.is_ai
    });
  } catch (err) {
    console.error('Error fetching next prompt:', err);
    res.status(500).json({ error: 'Error fetching next prompt' });
  }
});

router.post('/guess', (req, res) => {
  const { guess, isAI } = req.body;
  const correct = (guess === 'ai' && isAI === 'true') || (guess === 'human' && isAI === 'false');
  
  res.json({ correct });
});

module.exports = router;

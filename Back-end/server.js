const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.get('/questions', async (req, res) => {
  const response = await fetch('https://api.sampleapis.com/futurama/questions');
  const json = await response.json();
  res.json(json);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

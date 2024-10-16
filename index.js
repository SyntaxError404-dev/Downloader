const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

app.get('/pin', async (req, res) => {
  try {
    const { title, search } = req.query;

    if (!title || !search) {
      return res.status(400).json({ error: 'Both title and search query are required' });
    }

    const response = await axios({
      method: 'get',
      url: `https://smfahim.xyz/pin?title=${encodeURIComponent(title)}&search=${encodeURIComponent(search)}`,
      responseType: 'json'
    });

    res.json(response.data);

  } catch (error) {
    console.error('Error fetching Pinterest images:', error);
    res.status(500).json({ error: 'Error fetching Pinterest images' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

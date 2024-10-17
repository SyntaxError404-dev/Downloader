const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

app.get('/lyrics', async (req, res) => {
  try {
    const { songName } = req.query;

    if (!songName) {
      return res.status(400).json({ error: 'Song name is required' });
    }

    const apiResponse = await axios.get(`https://lyrist.vercel.app/api/${encodeURIComponent(songName)}`);
    const data = apiResponse.data;

    if (data.lyrics) {
      const title = data.title;
      const artist = data.artist;
      const lyrics = data.lyrics;

      return res.status(200).json({
        title,
        artist,
        lyrics
      });
    } else {
      return res.status(404).json({ error: 'Lyrics not found' });
    }

  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

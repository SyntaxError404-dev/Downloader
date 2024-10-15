const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

app.get('/download', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await axios({
      method: 'get',
      url: `https://smfahim.xyz/alldl?url=${encodeURIComponent(url)}`,
      responseType: 'json'
    });

    if (response.data && response.data.downloadUrl) {
      const videoResponse = await axios({
        method: 'get',
        url: response.data.downloadUrl,
        responseType: 'arraybuffer'
      });

      res.set('Content-Type', 'video/mp4');
      res.send(Buffer.from(videoResponse.data, 'binary'));
    } else {
      res.status(400).json({ error: 'Download link not found' });
    }

  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: 'Error downloading video' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

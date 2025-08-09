const express = require('express');
const tiktokdl = require('@faouzkk/tiktok-dl');
const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 3527;
const cors = require('cors');
const axios = require('axios'); // Alternative to fetch

app.use(cors());

// Ganti endpoint dari /tiktok/:link ke:
app.get('/tiktok', async (req, res) => {
  const { url } = req.query; // Gunakan query parameter
  
  if (!url) {
    return res.status(400).json({ 
      status: "Error",
      message: "Parameter 'url' diperlukan" 
    });
  }

  try {
    const result = await tiktokdl(url);
    res.json({ 
      status: "Success",
      data: result 
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Gagal mengunduh TikTok",
      error: error.message
    });
  }
});
app.get('/', (req, res) => {
  res.send('TikTok Downloader API is running!');
});
async function showStartupMessage() {
    try {
        const response = await axios.get('https://httpbin.org/ip');
        console.log(`Server running on: http://localhost:${port}`);
        console.log(`Access from external: http://${response.data.origin}:${port}`);
    } catch (e) {
        console.log(`Server started on port ${port}`);
    }
}

app.listen(port, () => {
    showStartupMessage();
});

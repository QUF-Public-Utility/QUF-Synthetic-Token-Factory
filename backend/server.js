const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Synthetic Token Factory API');
});

app.post('/create-token', async (req, res) => {
  const { name, symbol, totalSupply } = req.body;

  try {
    // Here you would interact with your smart contract to create the token
    // This is just a placeholder and will not actually create a token
    const response = await axios.post('http://localhost:8545', {
      name,
      symbol,
      totalSupply
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error creating token' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

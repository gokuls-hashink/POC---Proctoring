import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const HMS_TOKEN_ENDPOINT = 'https://api.100ms.live/v2/room-tokens';
const HMS_MANAGEMENT_TOKEN = process.env.HMS_MANAGEMENT_TOKEN;
const ROOM_ID = process.env.ROOM_ID;

app.post('/get-token', async (req, res) => {
  const { user_id, role } = req.body;

  try {
    const response = await axios.post(
      HMS_TOKEN_ENDPOINT,
      {
        user_id,
        role,
        room_id: ROOM_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${HMS_MANAGEMENT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ token: response.data.token });
  } catch (err) {
    res.status(500).json({ error: 'Token generation failed', message: err.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

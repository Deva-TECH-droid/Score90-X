import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import worldCupRoutes from './modules/worldcup.routes';

dotenv.config();

const app = express();

/* -------------------- Security -------------------- */

// Secure HTTP headers
app.use(helmet());

// Compress all JSON responses
app.use(compression());

// Allow frontend requests
app.use(cors());

// Parse JSON
app.use(express.json());

/* -------------------- Rate Limiter -------------------- */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per IP
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

app.use(limiter);

/* -------------------- Routes -------------------- */

app.use('/api/worldcup', worldCupRoutes);

app.get('/', (_, res) => {
  res.send('Score90X Backend Running 🚀');
});

/* -------------------- Start Server -------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
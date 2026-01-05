const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors()); // You can restrict origins later
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ministries', require('./routes/ministries'));
app.use('/api/media', require('./routes/media'));
app.use('/api/payments', require('./routes/payments'));

/* ---------- HEALTH CHECK ---------- */
app.get('/', (req, res) => {
  res.json({ status: 'Believer’s Gallery API is running' });
});

/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

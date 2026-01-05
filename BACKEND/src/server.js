
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/ministries', require('./routes/ministries'));
app.use('/api/media', require('./routes/media'));
app.use('/api/payments', require('./routes/payments'));

app.get('/', (req, res) => res.json({status:'Believer’s Gallery API'}));

app.listen(process.env.PORT || 5000);

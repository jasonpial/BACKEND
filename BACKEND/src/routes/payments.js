
const router = require('express').Router();
const axios = require('axios');
const auth = require('../middleware/auth');

router.post('/initialize', auth, async (req, res) => {
  const response = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    {
      email: req.body.email,
      amount: req.body.amount * 100
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  );
  res.json(response.data);
});

module.exports = router;

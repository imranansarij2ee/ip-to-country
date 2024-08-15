const express = require('express');
const { getCountryByIp } = require('../services/ipService');

const router = express.Router();

router.get('/ip-to-country', async (req, res) => {
    const ipAddress = req.query.ip;

    if (!ipAddress) {
        return res.status(400).json({ error: 'IP address is required' });
    }

    try {
        const country = await getCountryByIp(ipAddress);
        res.json({ country });
    } catch (error) {
        res.status(503).json({ error: error.message });
    }
});

module.exports = router;
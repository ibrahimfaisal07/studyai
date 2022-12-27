// Imports
const express = require('express');
const path = require('path');
const { createAccount, authenticate } = require('../controllers/mongoDbController');

// Get router
const router = express.Router();

// Create account
router.post('/create-account', async (req, res) => {
    const userData = req.body;

    const result = await createAccount(userData);

    if (result['err']) {
        return res.send({success: false, error: result['error']});
    }

    res.send({ success: true, uid: result._id });
});

// Authenticate
router.post('/auth', async (req, res) => {
    const { username, pwd } = req.body

    const authResult = await authenticate(username, pwd);

    if (authResult['error']) {
        return res.json({ success: false });
    }

    req.session.username = authResult.username;
    req.session.uid = authResult._id;

    res.json({ success: true, username: authResult.username });
});

// Export
module.exports = router;
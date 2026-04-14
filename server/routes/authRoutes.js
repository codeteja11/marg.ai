const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to get user from correct DB
async function findUser(email) {
    if (global.dbMode === 'fallback') {
        return await global.mockDB.users.findOne({ email });
    }
    return await User.findOne({ email });
}

// Helper to save user to correct DB
async function saveUser(userData) {
    if (global.dbMode === 'fallback') {
        const newUser = await global.mockDB.users.insert(userData);
        return { id: newUser._id, ...newUser };
    }
    const user = new User(userData);
    await user.save();
    return user;
}

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await findUser(email);
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedEmoji = await bcrypt.hash(password, salt);

        // Save
        const newUser = await saveUser({ name, email, password: hashedEmoji });

        // Return JWT
        const payload = { user: { id: newUser.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await findUser(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Return JWT
        const id = user.id || user._id;
        const payload = { user: { id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, user: { id, name: user.name, email: user.email } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

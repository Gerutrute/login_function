const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email,
        ]);

        if (user.rows.length > 0) {
            return res.status(401).json('User already exists!');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, bcryptPassword]
        );

        const token = jwt.sign({ user_id: newUser.rows[0].user_id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email,
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json('Password or Email is incorrect');
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        );

        if (!validPassword) {
            return res.status(401).json('Password or Email is incorrect');
        }

        const token = jwt.sign({ user_id: user.rows[0].user_id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Verify Route (Protected)
app.get('/verify', async (req, res) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(403).json("Not Authorized");

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload.user;
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(403).json("Not Authorized");
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

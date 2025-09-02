const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// POST /api/users/register @@ register new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists'})
        }

        user = new User({ username, email, password })
        await user.save()

        res.status(201).json({ message: 'User registered successfully' })
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server error')
        }
    })
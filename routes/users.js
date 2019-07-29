const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
    '/',
    //
    [
        //must include a name
        check('name', 'Please include a name')
            .not()
            .isEmpty(),
        //must inclue a valid email
        check('email', 'Please include a valid email.').isEmail(),
        //password must be 6 or more characteds
        check(
            'password',
            'Please enter a password with 6 or more characters.'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            //find if user already exists by email
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists.' });
            }

            //create a new instance of a user
            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            //assigning a new hashed version of password
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.state(500).json('Server error');
        }
    }
);

module.exports = router;

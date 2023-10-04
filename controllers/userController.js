const { User } = require('../models');
const bcrypt = require('bcrypt');

const userController = {
    register: async (req, res) => {
        try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        req.session.user_id = newUser.id;

        res.status(201).json(newUser);
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register a new user.' });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
    
            const user = await User.findOne({
            where: { username },
            });
    
            if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials.' });
            }
    
            req.session.user_id = user.id;
    
            res.status(200).json({ message: 'Login successful.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to log in.' });
        }
        },

    getProfile: async (req, res) => {
        try {
            if (!req.session.user_id) {
            return res.status(401).json({ error: 'Not logged in.' });
            }
    
            const user = await User.findByPk(req.session.user_id, {
            attributes: ['username', 'email'],
            });
    
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch user profile.' });
        }
        },

    logout: (req, res) => {
        try {
            req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to log out.' });
            }
            res.status(204).end();
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to log out.' });
        }
        },
    };

module.exports = userController;

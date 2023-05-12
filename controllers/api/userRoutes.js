const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email,
            userName: req.body.email.split('@')[0],
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You did bruv! You have officially assimilated!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
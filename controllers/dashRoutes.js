const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const authorized = require('../utils/authorized');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            limit: 10,
            include: [{
                    model: User,
                    attributes: ['userName'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['userName'],
                    },
           }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
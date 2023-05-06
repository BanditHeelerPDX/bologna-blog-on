const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const authorized = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            limit: 10,
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single post
router.get('/post/:id', authorized, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,

    }
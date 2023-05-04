const authorized = require("./utils/authorized");
const express = require("express");
const router = express.Router();

router.get('*', authorized, (req, res) => {
    const href = res.locals.loggedIn ? '/dashboard' : '/login';
    res.render('404', { href });
});

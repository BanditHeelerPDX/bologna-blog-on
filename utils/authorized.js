const authorized = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    next();
  };

  module.exports = authorized;
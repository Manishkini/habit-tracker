const User = require('../models/user');

module.exports.home = (req, res) => {
  if (req.cookies && req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err, user) => {
      if (err) {
        console.log('Error while finding user****', err);
        res.clearCookie('user_id');
        return res.redirect('/auth/sign-in');
      }
      if (user) {
        return res.render('home', {
          title: 'Habit Tracker | Home page',
          user: user,
          layout: 'layout',
        });
      }
      console.log('User Not Found', err);
      res.clearCookie('user_id');
      return res.redirect('/auth/sign-in');
    });
  } else {
    res.clearCookie('user_id');
    return res.redirect('/auth/sign-in');
  }
};

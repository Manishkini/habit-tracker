const User = require('../models/user');

module.exports.create = (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      if (err) {
        console.log('Error while finding user****', err);
        return res.redirect('back');
      }
      if (user) {
        console.log('Username already present');
        return res.redirect('back');
      }
      User.create(
        {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
        },
        (err) => {
          if (err) {
            console.log('Error while creating user****', err);
            return res.redirect('back');
          }
          res.redirect('/auth/sign-in');
        }
      );
    }
  );
};

module.exports.createSession = (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      if (err) {
        console.log('Error while finding user****', err);
        return res.redirect('back');
      }
      if (user) {
        if (user.password !== req.body.password) {
          console.log('password not matched');
          return res.redirect('back');
        }
        res.cookie('user_id', user.id);
        return res.redirect('/');
      } else {
        console.log('User not found');
        return res.redirect('back');
      }
    }
  );
};

module.exports.endSession = (req, res) => {
  res.clearCookie('user_id');
  return res.redirect('/auth/sign-in');
};

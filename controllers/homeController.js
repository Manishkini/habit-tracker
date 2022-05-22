const User = require('../models/user');
const Habit = require('../models/habit');

module.exports.home = async (req, res) => {
  try {
    if (req.cookies && req.cookies.user_id) {
      const foundUser = await User.findById(req.cookies.user_id);
      if (foundUser) {
        const habits = await Habit.find({
          user: req.cookies.user_id,
        });
        // console.log('habits', habits);
        if (habits && habits.length) {
          return res.render('home', {
            title: 'Habit Tracker | Home page',
            user: foundUser,
            habits: habits,
            layout: 'layout',
          });
        } else {
          return res.render('home', {
            title: 'Habit Tracker | Home page',
            user: foundUser,
            habits: [],
            layout: 'layout',
          });
        }
      } else {
        console.log('User Not Found');
        res.clearCookie('user_id');
        return res.redirect('/auth/sign-in');
      }
    } else {
      res.clearCookie('user_id');
      return res.redirect('/auth/sign-in');
    }
  } catch (err) {
    console.log('Something Went Wrong', err);
    return;
  }
};

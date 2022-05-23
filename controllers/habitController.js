const User = require('../models/user');
const Habit = require('../models/habit');
const HabitDetails = require('../models/habit_details');
const moment = require('moment');

module.exports.creationForm = (req, res) => {
  if (req.cookies && req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err, user) => {
      if (err) {
        console.log('Error while finding user****', err);
        res.clearCookie('user_id');
        return res.redirect('/auth/sign-in');
      }
      if (user) {
        return res.render('habit-creation-form', {
          title: 'Habit Tracker | Habit Creation page',
          user: user,
          layout: 'layout',
        });
      }
      console.log('User Not Found', err);
      res.clearCookie('user_id');
      return res.redirect('/auth/sign-in');
    });
  } else {
    return res.render('sign-in', {
      title: 'Habit Tracker | Sign In page',
      layout: 'auth-layout',
    });
  }
};

module.exports.create = async (req, res) => {
  try {
    if (req.cookies && req.cookies.user_id) {
      const foundUser = await User.findById(req.cookies.user_id);
      if (foundUser) {
        const newHabit = await Habit.create({
          title: req.body.title,
          user: req.cookies.user_id,
        });
        if (newHabit && newHabit.id) {
          const newHabitDetails = await HabitDetails.create({
            habit: newHabit._id,
            user: req.cookies.user_id,
            date: newHabit.start_date,
          });
          if (newHabitDetails && newHabitDetails.id) {
            newHabit.habit_details.push(newHabitDetails._id);
            newHabit.save();
            return res.redirect('/');
          }
        }
      } else {
        console.log('User Not Found', err);
        res.clearCookie('user_id');
        return res.redirect('/auth/sign-in');
      }
    } else {
      return res.render('sign-in', {
        title: 'Habit Tracker | Sign In page',
        layout: 'auth-layout',
      });
    }
  } catch (err) {
    console.log('Something Went Wrong', err);
    return;
  }
};

module.exports.detailedView = async (req, res) => {
  try {
    if (req.cookies && req.cookies.user_id) {
      const foundUser = await User.findById(req.cookies.user_id);
      if (foundUser) {
        const foundHabit = await Habit.findById(req.params.id)
          .populate({ path: 'habit_details' })
          .exec();
        if (foundHabit) {
          return res.render('habit-details', {
            title: 'Habit Tracker | Habit Detail page',
            user: foundUser,
            habit: foundHabit,
            moment: moment,
            layout: 'layout',
          });
        }
        return;
      } else {
        console.log('User Not Found');
        res.clearCookie('user_id');
        return res.redirect('/auth/sign-in');
      }
    } else {
      return res.render('sign-in', {
        title: 'Habit Tracker | Sign In page',
        layout: 'auth-layout',
      });
    }
  } catch (err) {
    console.log('Something Went Wrong', err);
    return;
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    if (req.cookies && req.cookies.user_id) {
      const foundUser = await User.findById(req.cookies.user_id);
      if (foundUser) {
        const status =
          req.body.status === 'none'
            ? 'done'
            : req.body.status === 'done'
            ? 'notDone'
            : 'none';
        const foundHabit = await Habit.findById(req.body.habitId)
          .populate({ path: 'habit_details' })
          .exec();
        if (foundHabit) {
          let foundHabitDetails = req.body.habitDetailsId
            ? await HabitDetails.findById(req.body.habitDetailsId)
            : null;
          if (foundHabitDetails) {
            foundHabitDetails.status = status;
            await foundHabitDetails.save();
          } else {
            foundHabitDetails = await HabitDetails.create({
              habit: foundHabit._id,
              user: req.cookies.user_id,
              date: moment(req.body.currDate, 'DD-MM-YYYY').format(
                'YYYY-MM-DD'
              ),
              status: 'done',
            });
            if (foundHabitDetails && foundHabitDetails.id) {
              foundHabit.habit_details.push(foundHabitDetails._id);
              await foundHabit.save();
            }
          }
          await foundHabit.populate('habit_details');
          return res.send(200, {
            data: {
              massage: 'status changes successfully!',
              habits: foundHabit,
            },
          });
        } else {
          console.log('Habit Not Found');
          return res.send(500, {
            data: {
              massage: 'Habit not found',
            },
          });
        }
      } else {
        console.log('User Not Found');
        res.clearCookie('user_id');
        return res.redirect('/auth/sign-in');
      }
    } else {
      return res.render('sign-in', {
        title: 'Habit Tracker | Sign In page',
        layout: 'auth-layout',
      });
    }
  } catch (err) {
    console.log('Something Went Wrong', err);
    return;
  }
};

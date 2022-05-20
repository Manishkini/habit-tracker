module.exports.home = (req, res) => {
  res.render('home', {
    title: 'Habit Tracker | Home page',
  });
};

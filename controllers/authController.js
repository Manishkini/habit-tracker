module.exports.signIn = (req, res) => {
  if (req.cookies && req.cookies.user_id) {
    return res.redirect('/');
  }
  return res.render('sign-in', {
    title: 'Habit Tracker | Sign In page',
    layout: 'auth-layout',
  });
};

module.exports.signUp = (req, res) => {
  if (req.cookies && req.cookies.user_id) {
    return res.redirect('/');
  }
  return res.render('sign-up', {
    title: 'Habit Tracker | Sign In page',
    layout: 'auth-layout',
  });
};

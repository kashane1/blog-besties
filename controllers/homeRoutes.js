const router = require('express').Router();
const { Submission, User } = require('../models');
const withAuth = require('../utils/auth');

// start of the homepage route, to render all submissions
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const submissionData = await Submission.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const submissions = submissionData.map((submission) => submission.get({ plain: true }));

    // render the data into the homepage.handlebars
    res.render('homepage', { 
      submissions, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// start of the route to view 1 submission on a new page
router.get('/submissions/:id', async (req, res) => {
  try {
    const submissionData = await Submission.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const submissions = submissionData.get({ plain: true });

    res.render('submission', {
      ...submissions,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Submission }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;

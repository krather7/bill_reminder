const router = require('express').Router();
const { Bill, User } = require('../models');
const withAuth = require('../utils/auth');
const sendEmail =  require('./api/send-email');

router.get('/', async (req, res) => {
  try {
    sendEmail();
    console.log('Sent email!')
    // Get all projects and JOIN with user data
    const billData = await Bill.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const bills = billData.map((bill) => bill.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      bills, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bill/:id', async (req, res) => {
  try {
    const billData = await bill.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const bill = billData.get({ plain: true });

    res.render('bill', {
      ...bill,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bill }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
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
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

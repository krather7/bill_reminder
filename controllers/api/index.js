const router = require('express').Router();
const userRoutes = require('./userRoutes');
const billRoutes = require('./billRoutes');

router.use('/users', userRoutes);
router.use('/projects', billRoutes);

module.exports = router;

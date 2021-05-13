const router = require('express').Router();
const { Bill, User } = require('../../models');
const withAuth = require('../../utils/auth');

//==========================================
// GET all bills
router.get('/', async (req, res) => {
  try {
    const billData = await Bill.findAll(
      {include: [{ model: User }],
      });
    res.status(200).json(billData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//==========================================
// GET a single bill
router.get('/:id', async (req, res) => {
  try {
    const billData = await Bill.findByPk(req.params.id,{
      include: [{ model: User }],
    });
    if (!billData) {
      res.status(404).json({ message: 'No user bill with this id!' });
      return;
    }

    res.status(200).json(billData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//==========================================

router.post('/', withAuth, async (req, res) => {
  try {
    const newBill = await Bill.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBill);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const billData = await Bill.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!billData) {
      res.status(404).json({ message: 'No bill found with this id!' });
      return;
    }

    res.status(200).json(billData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

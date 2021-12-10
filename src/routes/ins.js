const { Router } = require('express');
const router = Router();

const Ins = require('../controllers/ins');

router.post('/', Ins.addIns);
router.get('/', Ins.getAllIns);

module.exports = router;
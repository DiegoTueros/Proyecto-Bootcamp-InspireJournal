const { Router } = require('express');
const router = Router();

const Favorite = require('../controllers/favorite');

router.get('/', Favorite.getAllInspirationFavorite);
module.exports = router;
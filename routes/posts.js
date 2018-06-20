const express       = require('express');
const jwtauth       = require('../jwt-auth');
const router        = express.Router();
const controller    = require('../controllers/posts');


router.get('', jwtauth, (req, res, next) => {
   res.status(200).send();
});
router.get('/user/:id', jwtauth, controller.getByUserId);
router.post('', jwtauth, controller.newPost);


module.exports = router;
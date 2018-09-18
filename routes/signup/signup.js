const express = require('express');
var router = express.Router();

router.get('/signup', (req, res) => {
    res.render('../public/signup.ejs');
});

module.exports = router;
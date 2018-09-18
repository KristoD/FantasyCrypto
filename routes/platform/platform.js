const express = require('express');
var router = express.Router();
var User = require('../../models/user-model');
var data = require('../coinPrices');

router.get('/platform', (req, res) => {
    if(req.session.userid) {
        User.findById(req.session.userid, (err, user) => {
            if(err) throw err;
            if(user) {
                res.render('../public/platform', {user: user, data: data});
            } else {
                req.session.login = "Your session has ended. Please login again";
                res.redirect('/signup');
            }
        });
    } else {
        req.session.login = "Your session has ended. Please login again";
        res.redirect('/signup');
    }
});

module.exports = router;
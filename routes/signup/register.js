const express = require('express');
var router = express.Router();
var User = require('../../models/user-model');

router.post('/register', (req, res) => {
    if(req.method == "POST") {
        if(req.body.password !== req.body.confirm_password) {
            req.session.register = "Passwords must match";
            res.redirect('/signup');
            return;
        }

        User.findOne({email: req.body.email}, (err,user) => {
            if(err) throw err;

            if(user) {
                req.session.register = "Email already exists";
                res.redirect('/signup');
            } else {
                var user = new User({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password});
                user.save();
                req.session.register = "";
                req.session.userid = user._id;
                setTimeout(function() {
                    res.redirect('/platform');
                }, 1000);
            }
        });
    } else {
        res.redirect('/signup');
    }
});

module.exports = router;
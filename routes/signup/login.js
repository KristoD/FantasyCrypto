const express = require('express');
var router = express.Router();
var User = require('../../models/user-model');

router.post('/login', (req, res) => {
    if(req.method == "POST") {
        User.findOne({email: req.body.email}, (err, user) => {
            if(err) throw err;

            if(user) {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if(err) throw err;
    
                    if(isMatch == false) {
                        req.session.login = "Email or password incorrect";
                        res.locals.login = req.session.login;
                        res.redirect('/signup');
                        return;
                    }
    
                    if(isMatch == true) {
                        req.session.login = "";
                        req.session.userid = user._id;
                        res.redirect('/platform');
                    }
                });
            } else {
                req.session.login = "Email or password incorrect";
                res.redirect('/signup');
            }
        });
    } else {
        res.redirect('/signup');
    }
});

module.exports = router;
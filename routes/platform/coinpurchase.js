const express = require('express');
var router = express.Router();
var User = require('../../models/user-model');

router.post('/coinpurchase', (req, res) => {
    if(req.session.userid) {
        User.findOne({_id: req.session.userid}, (err, user) => {
            if(err) throw err;
            if(user) {
                var total = req.body.amount * req.body.coindropdown;
                if(total > user.usd) {
                    req.session.purchaseError = "Not enough USD for this purchase";
                    return res.redirect('/platform');
                }
                if(req.body.coin == "Bitcoin") {
                    user.coin.btc.push({amt: req.body.amount, price: req.body.coindropdown, total: total});
                } else if(req.body.coin == "Ethereum") {
                    user.coin.eth.push({amt: req.body.amount, price: req.body.coindropdown, total: total});
                } else if(req.body.coin == "Ethereum Classic") {
                    user.coin.etc.push({amt: req.body.amount, price: req.body.coindropdown, total: total});
                } else if(req.body.coin == "Bitcoin Cash") {
                    user.coin.bch.push({amt: req.body.amount, price: req.body.coindropdown, total: total});
                } else if(req.body.coin == "Litecoin") {
                    user.coin.ltc.push({amt: req.body.amount, price: req.body.coindropdown, total: total});
                }
                user.usd -= total;
                user.save();
                req.session.purchaseError = "";
                res.redirect('/platform');
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
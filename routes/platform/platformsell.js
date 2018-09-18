const express = require('express');
var router = express.Router();
// var request = require('request');
var data = require('../coinPrices');
var User = require('../../models/user-model');

router.get('/platform/sell/:coin/:id', (req, res) => {
    if(req.session.userid) {
        User.findById(req.session.userid, (err, user) => {
            if(err) throw err;

            if(user) {
                var coin = req.params.coin.toUpperCase();
                var transaction;
                var json;
                if(coin == "BTC") {
                    transaction = user.coin.btc.id(req.params.id);
                    json = data.sell.btc;
                } else if(coin == "ETH") {
                    transaction = user.coin.eth.id(req.params.id);
                    json = data.sell.eth;
                } else if(coin == "ETC") {
                    transaction = user.coin.etc.id(req.params.id);
                    json = data.sell.etc;
                } else if(coin == "BCH") {
                    transaction = user.coin.bch.id(req.params.id);
                    json = data.sell.bch;
                } else if(coin == "LTC") {
                    transaction = user.coin.ltc.id(req.params.id);
                    json = data.sell.ltc;
                }
                res.render('../public/platformsell', {user: user, trans: transaction, coin: coin, data: json});
            } else {
                req.session.login = "Your seession has ended. Please log back in";
                res.redirect('/signup');
            }
        });
    } else {
        req.session.login = "Your session has ended. Please log back in";
        res.redirect('/signup');
    }
});

module.exports = router;
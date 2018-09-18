const express = require('express');
var router = express.Router();
var User = require('../../models/user-model');

router.post('/sellcoin/:id/:coin', (req, res) => {
    if(req.session.userid) {
        User.findById(req.session.userid, (err, user) => {
            if(err) throw err;
            if(user) {
                var coin = req.params.coin;
                var amount = req.body.amount;
                var price = req.body.price;
                var transaction;
                var sell;
                var destroy = false;
                if(coin == "BTC") {
                    transaction = user.coin.btc.id(req.params.id);
                    sell = user.sold.btc;
                } else if(coin == "ETH") {
                    transaction = user.coin.eth.id(req.params.id);
                    sell = user.sold.eth;
                } else if(coin == "BCH") {
                    transaction = user.coin.bch.id(req.params.id);
                    sell = user.sold.bch;
                } else if(coin == "LTC") {
                    transaction = user.coin.ltc.id(req.params.id);
                    sell = user.sold.ltc;
                } else if(coin == "ETC") {
                    transaction = user.coin.etc.id(req.params.id);
                    sell = user.sold.etc;
                }
                if(amount > transaction.amt) {
                    req.session.sellError = "You cannot sell more coins than what you have";
                    res.redirect('/platform/sell/' + coin.toLowerCase() + '/' + transaction._id);
                    return;
                }
                if(transaction.amt == amount) {
                    destroy = true;
                }
                var total = price * amount;
                var purchasePrice = transaction.price;
                user.usd += total;
                sell.push({amt: amount, purchasePrice: purchasePrice,
                price: price, total: total});
                if(destroy == true) {
                    transaction.remove();
                } else {
                    transaction.amt -= amount;
                    transaction.total -= price * amount;
                    transaction.save();
                }
                user.save();
                res.redirect('/platform')
            } else {
                req.session.login = "Session has expired. Please login again";
                res.redirect('/signup');
            }
        });
    } else {
        req.session.login = "Session has expired. Please login again";
        res.redirect('/signup');
    }
});

module.exports = router;
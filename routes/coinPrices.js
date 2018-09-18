const Client = require('coinbase').Client;
var client = new Client({'apiKey': 'API KEY',
                        'apiSecret': 'API SECRET'});

var data = {
    buy: {},
    sell: {}
};

// Buy Prices

client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
    if(err) throw err;
    console.log(price)
    data.buy.btc = price.data;
});

client.getBuyPrice({'currencyPair': 'ETH-USD'}, function(err, price) {
    if(err) throw err;
    data.buy.eth = price.data;
});

client.getBuyPrice({'currencyPair': 'ETC-USD'}, function(err, price) {
    if(err) throw err;
    data.buy.etc = price.data;
});

client.getBuyPrice({'currencyPair': 'BCH-USD'}, function(err, price) {
    if(err) throw err;
    data.buy.bch = price.data;
});

client.getBuyPrice({'currencyPair': 'LTC-USD'}, function(err, price) {
    if(err) throw err;
    data.buy.ltc = price.data;
});

// Sell Prices

client.getSellPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
    if(err) throw err;
    data.sell.btc = price.data;
});

client.getSellPrice({'currencyPair': 'ETH-USD'}, function(err, price) {
    if(err) throw err;
    data.sell.eth = price.data;
});

client.getSellPrice({'currencyPair': 'ETC-USD'}, function(err, price) {
    if(err) throw err;
    data.sell.etc = price.data;
});

client.getSellPrice({'currencyPair': 'BCH-USD'}, function(err, price) {
    if(err) throw err;
    data.sell.bch = price.data;
});

client.getSellPrice({'currencyPair': 'LTC-USD'}, function(err, price) {
    if(err) throw err;
    data.sell.ltc = price.data;
});

module.exports = data;
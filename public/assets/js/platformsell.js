$(document).ready(function() {
    $('#coin-input').on('input', function() {
        var amt = $(this).val();
        var coinValue = parseFloat($('#coin-current').text());
        var result = Number($(this).val() * coinValue);
        var purchasedCoin = parseFloat($('#coin-price').text());
        var profit = result - (purchasedCoin * Number($(this).val()));
        if(coinValue >= purchasedCoin) {
            $('#coin-cost').css('color', 'green');
            $('#total-profit').css('color', 'green');
            $('#total-profit').html("Return: +$" + profit.toFixed(2));
        } else {
            $('#coin-cost').css('color', 'red');
            $('#total-profit').css('color', 'red');
            $('#total-profit').html("Return: -$" + Math.abs(profit).toFixed(2));
        }
        $('#coin-cost').html("$" + result.toFixed(2));
        if(amt == 0) {
            $('.coin-amt').text("0");
        } else {
            $('.coin-amt').text(amt);
        }
    });
});
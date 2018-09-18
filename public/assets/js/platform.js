$(document).ready(function() {
    $('#coin-input').on('input', function() {
        var amt = $('#coin-input').val();
        var coinCost = parseFloat($('#coin-price').text());
        var result = Number($(this).val()) * coinCost;
        result = +result.toFixed(3);
        $('#coin-cost').html("$" + result);
        if(amt == 0) {
            $('.coin-amt').text("0");
        } else {
            $('.coin-amt').text(amt);
        }

    });
    $("select[name='coindropdown']").on('change', function() {
        if($("select[name='coindropdown'] option").is(':selected')) {
            var coin = $(this).val();
            $('#coin-price').html(coin);
            var name = $("select[name='coindropdown'] option:selected").text();
            $('#coin-hidden').val(name);
            if(name == "Bitcoin") {
                $('.coin-name').html("BTC");
            } else if(name == "Ethereum") {
                $('.coin-name').html("ETH");
            } else if(name == "Ethereum Classic") {
                $('.coin-name').html("ETC")
            } else if(name == "Bitcoin Cash") {
                $('.coin-name').html("BCH");
            } else if(name == "Litecoin") {
                $('.coin-name').html("LTC");
            }
            var cost = getCost();
        }
    });

    function getCost() {
        var coinCost = parseFloat($('#coin-price').text());
        var result = Number($('#coin-input').val()) * coinCost;
        result = +result.toFixed(3);
        $('#coin-cost').html("Cost: $" + result);
    }
});
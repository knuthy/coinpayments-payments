const querystring = require('querystring');
const request = require('request');
const urlencodedParser = require('body-parser').urlencoded({ extended: false });
const crypto = require('crypto');
module.exports = coinPayments;

function coinPayments(options, callback) {
    if(options.public_key == undefined) {
        callback("Please provide a public key.");
        return;
    } else if(options.private_key == undefined) {
        callback("Please provide a private key.");
        return;
    }

    this.data = {
        public_key: options.public_key
        , private_key: options.private_key
    }

    callback(null, "Configured successfully")
}

coinPayments.prototype.getCallbackAddress = function(currency, callback) {
    if(!currency) {
        callback("node-coinpayments: Please provide a currency");
        return;
    }
	var data = {
		version: 1,
		key: this.data.public_key,
		cmd: 'get_callback_address',
        currency: currency
	};
	
	var formData = querystring.stringify(data);
	var contentLength = formData.length;

	const hash = crypto.createHmac('sha512', this.data.private_key).update(formData).digest('hex');

	request({
		headers: {
			'Content-Length': contentLength,
			'Content-Type': 'application/x-www-form-urlencoded',
			'HMAC': hash
		},
		uri: 'https://www.coinpayments.net/api.php',
		body: formData,
		method: 'POST'
	}, function (err, res2, body) {
		if(err) {
			callback(err)
		} else {
            
            if(JSON.parse(body).error !== "ok") {
                callback(JSON.parse(body).error)
            } else {
                callback(null, JSON.parse(body).result);
            }
		}
	});
}

coinPayments.prototype.createTransaction = function(options, callback) {
    if(options.amount == undefined) {
        callback("Please provide a public key.");
        return;
    } else if(options.currency_send == undefined) {
        callback("Please provide a private key.");
        return;
    } else if(options.currency_receive == undefined) {
        callback("Please provide an IPN route.");
        return;
    } else if(options.buyer_email == undefined) {
        callback("Please provide an IPN route.");
        return;
    }

	var data = {
		version: 1,
		key: this.data.public_key,
		cmd: 'create_transaction',
		amount: options.amount,
		currency1: options.currency_receive,
		currency2: options.currency_send,
		buyer_email: options.buyer_email
	};
	
	var formData = querystring.stringify(data);
	var contentLength = formData.length;

	const hash = crypto.createHmac('sha512', this.data.private_key).update(formData).digest('hex');

	request({
		headers: {
			'Content-Length': contentLength,
			'Content-Type': 'application/x-www-form-urlencoded',
			'HMAC': hash
		},
		uri: 'https://www.coinpayments.net/api.php',
		body: formData,
		method: 'POST'
	}, function (err, res2, body) {
		if(err) {
			callback(err)
		} else {
            
            if(JSON.parse(body).error !== "ok") {
                callback(JSON.parse(body).error)
            } else {
                callback(null, JSON.parse(body).result);
            }
		}
	});
}
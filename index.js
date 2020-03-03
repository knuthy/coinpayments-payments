const querystring = require('querystring');
const request = require('request');
const crypto = require('crypto');

module.exports = coinPayments;

/**
 * Initialize module
 * @param {Object} options {private_key: "", public_key: ""}
 * @param {Function} callback Callback (err, result)
 */
function coinPayments(options, callback) {
    if(!options.public_key ) return callback('Please provide a public key.');
    if(!options.private_key) return callback('Please provide a private key.');

    this.data = {
        public_key: options.public_key,
        private_key: options.private_key
    }

    return callback(null, 'Configured successfully')
}


/**
 * Create a callback/deposit address
 * @param {String} currency Specify currency type.
 * @param {Function} callback Callback (err, result)
 */
coinPayments.prototype.getCallbackAddress = (currency, callback) => {
    if(!currency) return callback('node-coinpayments: Please provide a currency');

	var formData = querystring.stringify({
		version: 1,
		key: this.data.public_key,
		cmd: 'get_callback_address',
        currency: currency
	});

	const hash = crypto.createHmac('sha512', this.data.private_key).update(formData).digest('hex');

	request({
		uri: 'https://www.coinpayments.net/api.php',
		method: 'POST',
		headers: {
			'Content-Length': formData.length,
			'Content-Type': 'application/x-www-form-urlencoded',
			'HMAC': hash
		},
		body: formData
	}, (err, res, body) => {
		if(err) return callback(err);

        if(JSON.parse(body).error !== 'ok') return callback(JSON.parse(body).error);
        
    	return callback(null, JSON.parse(body).result);
	});
}

/**
 * Create a transaction
 * @param {Object} options {amount: integer, currency_receive: "USD", currency_send: "LTCT", buyer_email: ""}
 * @param {Function} callback Callback (err, result)
 */
coinPayments.prototype.createTransaction = (options, callback) => {
    if(!options.amount) return callback('Please provide a public key.');
    if(!options.currency_send) return callback('Please provide a private key.');
    if(!options.currency_receive) return callback('Please provide an IPN route.');
    if(!options.buyer_email) return callback('Please provide an IPN route.');
	
	var formData = querystring.stringify({
		version: 1,
		key: this.data.public_key,
		cmd: 'create_transaction',
		amount: options.amount,
		currency1: options.currency_receive,
		currency2: options.currency_send,
		buyer_email: options.buyer_email
	});

	const hash = crypto.createHmac('sha512', this.data.private_key).update(formData).digest('hex');

	request({
		uri: 'https://www.coinpayments.net/api.php',
		method: 'POST',
		headers: {
			'Content-Length': formData.length,
			'Content-Type': 'application/x-www-form-urlencoded',
			'HMAC': hash
		},
		body: formData
	}, (err, res, body) => {
		if(err) return callback(err);

		if(JSON.parse(body).error !== 'ok') return callback(JSON.parse(body).error);
		
		return callback(null, JSON.parse(body).result);
		
	});
}
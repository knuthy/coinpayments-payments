<h1 align="center">Coinpayments-payments</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/knuthy/coinpayments-payments#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/knuthy/coinpayments-payments/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/knuthy/coinpayments-payments/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/knuthy/coinpayments-payments" />
  </a>
  <a href="https://twitter.com/knuthdk" target="_blank">
    <img alt="Twitter: knuthdk" src="https://img.shields.io/twitter/follow/knuthdk.svg?style=social" />
  </a>
</p>

> NPM module for acquiring payments from the CoinPayments API without form authentication hassle.

## Install

```sh
npm install coinpayments-payments
```

## Requirements
This package builds upon the fact that a correct pair of private and public keys are provided. You can generate these [Here](https://www.coinpayments.net/acct-api-keys)

## Usage
How to initialize the module with the correct data.

```javascript
const coinPayments = require('coinpayments-payments');

const payment_settings = {
	private_key: ""
	, public_key: ""
};

const payments = new coinPayments(payment_settings, (err, result) => {
	if(err) throw err;
	console.log(result); 
	// Configured successfully
});
```

## Create a transaction
The syntax of creating a transaction.
Please note, that the amount is defined in currency_receive (currency1). Remember to specify both the real currency of the transaction, and the currency that will be required to be used. 
Use the LiteCoin Tesnet (LTCT) for sandbox testing. 
I suggest doing this by running [Electrum LTC](https://electrum-ltc.org/) with:
> electrum --testnet

```javascript
payments.createTransaction({
	amount: 12, // DEFINED IN CURRENCY_RECEIVE
	currency_receive: "USD",
	currency_send: "LTCT",
	buyer_email: ""
}, (err, result) => {
	if(err) throw err;
	console.log(result);
});
```

## Create a callback/deposit address
By specifying the sending currency, a unique deposit address will be returned to you.
```javascript
payments.getCallbackAddress("LTCT", (err, result) => {
	if(err) throw err;
	console.log(result);
});
```

## Author

**Knuthy**

* Twitter: [@knuthdk](https://twitter.com/knuthdk)
* Github: [@knuthy](https://github.com/knuthy)

## License

Copyright © 2020 [Knuthy](https://github.com/knuthy).<br />
This project is [MIT](https://github.com/knuthy/coinpayments-payments/blob/master/LICENSE) licensed.
